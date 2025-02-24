import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(usename: string): Promise<any> {
    return this.userModel.find({username: usename})
  }

  async validate(username: string, password: string): Promise<User> {
    return this.userModel.findOne({username: username, password: password})
  }
}
