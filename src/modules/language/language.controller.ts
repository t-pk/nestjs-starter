import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Model } from 'sequelize/types';
import { LanguageService } from './language.service';
import { UpsertLanguage } from './language.dto';

import {
  ResponseOK,
  getRoute,
  ParameterDecorator,
} from '../../shared/utils/reponse';
import { QueryLanguage } from './language.dto/get';
import { Pagination } from '../../shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Languages')
@Controller('languages')
@ApiBearerAuth()
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a listing of all languages.' })
  async findLanguages(
    @Request() req: Readonly<ParameterDecorator>,
    @Query() query: QueryLanguage
  ): Promise<Pagination<Model>> {
    const route = getRoute(req);
    query.route = route;
    return await this.languageService.findLanguages(query);
  }

  @Post()
  @ApiOperation({ summary: 'Upsert languages.' })
  // @ApiBody({ type: [UpsertLanguage] }) --> params array;
  async upsertLanguage(
    @Body() body: UpsertLanguage
  ): Promise<ResponseOK | unknown> {
    return await this.languageService.upsertLanguage(body);
  }

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove language.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async removeLanguage(@Param('id') id: string): Promise<ResponseOK> {
    return await this.languageService.removeLanguage(id);
  }
}
