import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

export class CreateToxicologicalSampleDto {
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  sampleCode: string;

  @IsNumber()
  cocaine: number;

  @IsNumber()
  amphetamine: number;

  @IsNumber()
  methamphetamine: number;

  @IsNumber()
  mda: number;

  @IsNumber()
  mdma: number;

  @IsNumber()
  thc: number;

  @IsNumber()
  morphine: number;

  @IsNumber()
  codeine: number;

  @IsNumber()
  heroin: number;

  @IsNumber()
  benzoylecgonine: number;

  @IsNumber()
  cocaethylene: number;

  @IsNumber()
  norcocaine: number;
}
