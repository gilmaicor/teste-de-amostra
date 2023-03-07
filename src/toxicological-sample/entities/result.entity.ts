import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ToxicologicalSample } from './toxicological-sample.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ToxicologicalSample)
  @JoinColumn({ name: 'toxicological_sample' })
  toxicologicalSample: ToxicologicalSample;

  @Column()
  cocaine: boolean;

  @Column()
  amphetamine: boolean;

  @Column()
  methamphetamine: boolean;

  @Column()
  mda: boolean;

  @Column()
  mdma: boolean;

  @Column()
  thc: boolean;

  @Column()
  morphine: boolean;

  @Column()
  codeine: boolean;

  @Column()
  heroin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
