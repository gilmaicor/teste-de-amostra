import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ToxicologicalSampleService } from './toxicological-sample.service';
import { CreateToxicologicalSampleDto } from './dto/create-toxicological-sample.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('toxicological-sample')
export class ToxicologicalSampleController {
  constructor(
    private readonly toxicologicalSampleService: ToxicologicalSampleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createToxicologicalSampleDto: CreateToxicologicalSampleDto) {
    return this.toxicologicalSampleService.create(createToxicologicalSampleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.toxicologicalSampleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sampleCode')
  findOne(@Param('sampleCode') sampleCode: string) {
    return this.toxicologicalSampleService.findOne(sampleCode);
  }
}
