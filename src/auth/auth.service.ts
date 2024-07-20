import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { from } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository : Repository<UserEntity>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, mobile, password, profilePic } =
        registerUserDto;

      let findUser;
      
      if (email.length > 0) {
        console.log("inside check email");
        
        findUser = await this.userRepository.find(
          {
            where: { email: email }
          }
        )
        console.log('findUser', findUser);

      }

      if (findUser.length) {
        return { statusCode: 400, meassage: 'Already a registered user.' };
      }
  

      const hashedPassword = await this.hashPassword(password);

      const mobileNumber = Number(mobile)
      if (!findUser.length ){
        console.log('register', registerUserDto);
        await this.userRepository.save({
          firstName,
          lastName,
          email,
          mobile:mobileNumber,
          password: hashedPassword,
          profilePic,
        });
      }
      return { stausCode: 201, meassage: 'User created Sucessfully.' };
    } catch (error) {
      console.log('error in creating user ', error);
      return {
        status: 400,
        message: 'Error in creating the user',
        error: error,
      };
    }
  }

  async loginUser(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return { status: 400, message: 'User not found' };
      }
      const isPasswordMatch = await this.comparePasswords(
        password,
        user.password,
      );
      if (!isPasswordMatch) {
        return { status: 400, message: 'Invalid password' };
      }
      const token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });
      return { status: 200, message: 'Login success', token: token };
    } catch (error) {
      console.log('error while login the user', error);

      return {
        status: 400,
        message: 'Error in creating the user',
        error: error,
      };
    }
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

  async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    const encpass = await bcrypt.compare(password, storedPasswordHash);
    return encpass;
  }

  // hashPassword
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 14);
  }
}
