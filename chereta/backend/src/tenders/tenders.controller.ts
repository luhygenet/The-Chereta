import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { TendersService } from './tenders.service';
import { CreateTenderDto } from './dto/create-tender.dto';
import { AuthenticatedRequest } from '../auth/authenticated-request.interface';

import { Tender, TenderDocument } from './schemas/tender.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createTenderDto: CreateTenderDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    console.log(userId)
    return this.tendersService.create(createTenderDto, userId);
  }
  @Get()
  findAll() {
    console.log("eshi exi")
    return this.tendersService.findAll();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findByUser(@Req() req: AuthenticatedRequest) {

    const userId = req.user.userId
    console.log(req.user)
    console.log("eshiiii ezi")
    console.log(userId)
    return this.tendersService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderDto: Partial<Tender>) {
    return this.tendersService.update(id, updateTenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendersService.remove(id);
  }
}
