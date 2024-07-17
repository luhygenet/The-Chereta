import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid } from './schema/bid.schema'; // Adjust as per your schema

@Controller('tenders/:tenderId/bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  async create(@Param('tenderId') tenderId: string, @Body() createBidDto: CreateBidDto): Promise<Bid> {
    const createdBid = await this.bidsService.create(tenderId, createBidDto);
    return createdBid;
  }
  @Get()
  async findAllByTenderId(@Param('tender') tender: string) {
    return this.bidsService.findAllByTenderId(tender);
  }

  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidsService.update(id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(id);
  }
}