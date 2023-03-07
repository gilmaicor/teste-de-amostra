import { Module } from '@nestjs/common';
import { ToxicologicalSampleService } from './toxicological-sample.service';
import { ToxicologicalSampleController } from './toxicological-sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToxicologicalSample } from './entities/toxicological-sample.entity';
import { Result } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToxicologicalSample, Result])],
  controllers: [ToxicologicalSampleController],
  providers: [ToxicologicalSampleService],
})
export class ToxicologicalSampleModule {}
