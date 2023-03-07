import { PartialType } from '@nestjs/mapped-types';
import { CreateToxicologicalSampleDto } from './create-toxicological-sample.dto';

export class UpdateToxicologicalSampleDto extends PartialType(
  CreateToxicologicalSampleDto,
) {}
