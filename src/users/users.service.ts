import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
  ) { }
  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return user;
    } catch (error) {
      console.log('error in creating user ', error);
      return {
        status: 400,
        message: 'Error in creating the user',
        error: error,
      };
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      console.log("error while fetching user", error);
      return error;
    }
  }

  async findUserByMobile(mobile) {
    try {
      const user = await this.userRepository.findOne({
        where: { mobile },
      });
      return user;
    } catch (error) {
      console.log("error while fetching user by mobile no", error);
      return error;
    }
  }

  async getUserProfile(request) {
    try {
      console.log("request", request.user);
      const user = await this.getUserById(request.user.sub)
      return { statuscode: 200, user: user };
    } catch (error) {
      console.log("error while getting profile", error);
      return error;
    }
  }

  async getUserById(id) {
    try {
      return this.userRepository.findOne({
        where: { id: id },
      })
    } catch (error) {

    }
  }

}
