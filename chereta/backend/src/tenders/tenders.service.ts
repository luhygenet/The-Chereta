import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tender, TenderDocument } from './schemas/tender.schema';
import { CreateTenderDto } from './dto/create-tender.dto';

@Injectable()
export class TendersService {
  constructor(@InjectModel(Tender.name) private tenderModel: Model<TenderDocument>) {}

  async create(createTenderDto: CreateTenderDto, createdBy: string): Promise<Tender> {
    const createdTender = new this.tenderModel({
      ...createTenderDto,
      createdBy: createdBy,
    });
    return createdTender.save();
  }

  async findAll(): Promise<Tender[]> {
    console.log("exi dersual")
    return this.tenderModel.find().exec();
  }

  async findByUser(userId: string): Promise<Tender[]> {
    console.log("hererererere")
    const s = this.tenderModel.find({ createdBy: userId }).exec()
    console.log(s);

    return this.tenderModel.find({ createdBy: userId }).exec();
  }

  async findById(id: string): Promise<Tender> {
    console.log("findbyID")
    return this.tenderModel.findById(id).exec();
  }

  async update(id: string, updateTenderDto: Partial<Tender>): Promise<Tender> {
    return this.tenderModel.findByIdAndUpdate(id, updateTenderDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Tender> {
    return this.tenderModel.findByIdAndDelete(id).exec();
  }
}