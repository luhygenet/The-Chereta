import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const { password, ...rest } = updateUserDto;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.userModel.findByIdAndUpdate(id, { ...rest, password: hashedPassword }, { new: true }).exec();
    } else {
      return this.userModel.findByIdAndUpdate(id, rest, { new: true }).exec();
    }
  }

  async remove(id: string): Promise<User | undefined> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

}