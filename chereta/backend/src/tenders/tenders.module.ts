
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';
import { Tender, TenderSchema } from './schemas/tender.schema';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tender.name, schema: TenderSchema }]),
    AuthModule, // Include AuthModule in imports
  ],
  providers: [TendersService],
  controllers: [TendersController],
})
export class TendersModule {}
