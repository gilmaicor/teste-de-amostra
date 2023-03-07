import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateToxicologicalSampleDto } from './dto/create-toxicological-sample.dto';
import { Result } from './entities/result.entity';
import { ToxicologicalSample } from './entities/toxicological-sample.entity';
import { PassingScoreModel } from './models/passingScore.model';

@Injectable()
export class ToxicologicalSampleService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ToxicologicalSample)
    private toxicologicalSampleRepository: Repository<ToxicologicalSample>,
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  async create(createToxicologicalSampleDto: CreateToxicologicalSampleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const toxicologicalSampleQuery = this.toxicologicalSampleRepository
        .createQueryBuilder()
        .insert()
        .into(ToxicologicalSample)
        .values(createToxicologicalSampleDto)
        .returning(['id', 'sampleCode'])
        .getQueryAndParameters();

      const toxicologicalSample = await queryRunner.manager.query(
        toxicologicalSampleQuery[0] as string,
        toxicologicalSampleQuery[1],
      );

      const passingScoreModel = new PassingScoreModel({
        toxicologicalSample: { id: toxicologicalSample[0].id },
        ...createToxicologicalSampleDto,
      });

      const resultQuery = this.resultRepository
        .createQueryBuilder()
        .insert()
        .into(Result)
        .values(passingScoreModel)
        .returning('id')
        .getQueryAndParameters();

      await queryRunner.manager.query(resultQuery[0] as string, resultQuery[1]);

      await queryRunner.commitTransaction();

      const result = await this.findOne(toxicologicalSample[0].sample_code);

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        err.constraint
          ? 'Código de amostra já existe'
          : 'Problema ao criar exame toxicológico',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const results = await this.resultRepository.find({
      relations: ['toxicologicalSample'],
      loadEagerRelations: true,
    });

    const mappedResult = results.map((result) => {
      return {
        sampleCode: result.toxicologicalSample.sampleCode,
        cocaine: {
          value: result.toxicologicalSample.cocaine,
          result: result.cocaine,
        },
        benzoylecgonine: {
          value: result.toxicologicalSample.benzoylecgonine,
        },
        cocaethylene: {
          value: result.toxicologicalSample.cocaethylene,
        },
        norcocaine: {
          value: result.toxicologicalSample.norcocaine,
        },
        amphetamine: {
          value: result.toxicologicalSample.cocaine,
          result: result.cocaine,
        },
        methamphetamine: {
          value: result.toxicologicalSample.methamphetamine,
          result: result.methamphetamine,
        },
        mda: {
          value: result.toxicologicalSample.mda,
          result: result.mda,
        },
        mdma: {
          value: result.toxicologicalSample.mdma,
          result: result.mdma,
        },
        thc: {
          value: result.toxicologicalSample.thc,
          result: result.thc,
        },
        morphine: {
          value: result.toxicologicalSample.morphine,
          result: result.morphine,
        },
        codeine: {
          value: result.toxicologicalSample.codeine,
          result: result.codeine,
        },
        heroin: {
          value: result.toxicologicalSample.heroin,
          result: result.heroin,
        },
      };
    });

    return mappedResult;
  }

  async findOne(sampleCode: string) {
    const result = await this.resultRepository
      .createQueryBuilder('result')
      .innerJoinAndSelect('result.toxicologicalSample', 'ts')
      .where('ts.sample_code = :sampleCode', { sampleCode })
      .getOne();

    if (!result) {
      throw new NotFoundException('Resultado não encontrado');
    }

    return {
      sampleCode: result.toxicologicalSample.sampleCode,
      cocaine: {
        value: result.toxicologicalSample.cocaine,
        result: result.cocaine,
      },
      benzoylecgonine: {
        value: result.toxicologicalSample.benzoylecgonine,
      },
      cocaethylene: {
        value: result.toxicologicalSample.cocaethylene,
      },
      norcocaine: {
        value: result.toxicologicalSample.norcocaine,
      },
      amphetamine: {
        value: result.toxicologicalSample.cocaine,
        result: result.cocaine,
      },
      methamphetamine: {
        value: result.toxicologicalSample.methamphetamine,
        result: result.methamphetamine,
      },
      mda: {
        value: result.toxicologicalSample.mda,
        result: result.mda,
      },
      mdma: {
        value: result.toxicologicalSample.mdma,
        result: result.mdma,
      },
      thc: {
        value: result.toxicologicalSample.thc,
        result: result.thc,
      },
      morphine: {
        value: result.toxicologicalSample.morphine,
        result: result.morphine,
      },
      codeine: {
        value: result.toxicologicalSample.codeine,
        result: result.codeine,
      },
      heroin: {
        value: result.toxicologicalSample.heroin,
        result: result.heroin,
      },
    };
  }
}
