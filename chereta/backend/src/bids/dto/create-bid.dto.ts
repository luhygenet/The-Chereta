import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsString()
  participantName: string;

  @IsNotEmpty()
  @IsEmail()
  participantEmail: string;

  @IsNotEmpty()
  @IsString()
  biddingDocument: string;
}
