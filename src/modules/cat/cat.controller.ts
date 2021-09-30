import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cat.services';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: any): Promise<any> {
    console.log(createCatDto);
    this.catsService.create();
  }

}
