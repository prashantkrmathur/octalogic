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
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      console.log('createUserDto', createUserDto);
      const user = this.userRepository.create(createUserDto);
      console.log(user);

      return {
        statuscode: 201,
        message: 'User created successfully',
        user: user,
      };
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
    console.log('here');

    const user = await this.userRepository.findOne({ where: { email: email } });
    console.log("user", user);

    return user;
   } catch (error) {
    console.log("error while fetching user", error);
    return error;
   }
  }

  async findUserByMobile(mobile) {
    const user = await this.userRepository.findOne({
      where: { mobile },
    });
    return user;
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return users
    } catch (error) {
      
    }
  }
}
