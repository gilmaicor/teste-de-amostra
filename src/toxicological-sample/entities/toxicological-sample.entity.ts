import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('toxicological_samples')
@Unique('my_unique_constraint', ['sampleCode'])
export class ToxicologicalSample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sample_code', unique: true, length: 8 })
  sampleCode: string;

  @Column({ type: 'decimal' })
  cocaine: number;

  @Column({ type: 'decimal' })
  amphetamine: number;

  @Column({ type: 'decimal' })
  methamphetamine: number;

  @Column({ type: 'decimal' })
  mda: number;

  @Column({ type: 'decimal' })
  mdma: number;

  @Column({ type: 'decimal' })
  thc: number;

  @Column({ type: 'decimal' })
  morphine: number;

  @Column({ type: 'decimal' })
  codeine: number;

  @Column({ type: 'decimal' })
  heroin: number;

  @Column({ type: 'decimal' })
  benzoylecgonine: number;

  @Column({ type: 'decimal' })
  cocaethylene: number;

  @Column({ type: 'decimal' })
  norcocaine: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
