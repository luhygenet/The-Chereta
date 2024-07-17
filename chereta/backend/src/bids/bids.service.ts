import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bid } from './schema/bid.schema';
import { Model } from 'mongoose';

@Injectable()
export class BidsService {
  constructor(@InjectModel(Bid.name) private readonly bidModel: Model<Bid>) {}

  async create(tenderId: string, createBidDto: CreateBidDto): Promise<Bid> {
    const createdBid = new this.bidModel({
      ...createBidDto,
      tender: tenderId,
    });
    return createdBid.save();
  }
  async findAllByTenderId(tender: string): Promise<Bid[]> {
    return this.bidModel.find({ tender }).exec();
  }

  async findAll(): Promise<Bid[]> {
    return this.bidModel.find().exec();
  }

  async findOne(id: string): Promise<Bid> {
    const bid = await this.bidModel.findById(id).exec();
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    return bid;
  }

  async update(id: string, updateBidDto: UpdateBidDto): Promise<Bid> {
    const updatedBid = await this.bidModel.findByIdAndUpdate(id, updateBidDto, { new: true }).exec();
    if (!updatedBid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    return updatedBid;
  }

  async remove(id: string): Promise<Bid> {
    const deletedBid = await this.bidModel.findByIdAndDelete(id).exec();
    if (!deletedBid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    return deletedBid;
  }
}