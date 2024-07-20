import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { from } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  async registerUser(registerUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, mobile, password, profilePic } =
        registerUserDto;

      let findUser;

      if (email.length > 0) {
        findUser = await this.userService.findUserByEmail(email);
      }
      if (mobile) {
        findUser = await this.userService.findUserByMobile(mobile);
      }

      console.log('existingUser', findUser);

      if (findUser) {
        return { statusCode: 400, meassage: 'Already a registered user.' };
      }

      const hashedPassword = await this.hashPassword(password);
      if (!findUser) {
        await this.userService.createUser({
          firstName,
          lastName,
          email,
          mobile,
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
      console.log('check password', password);

      const isPasswordMatch = await this.validatePassword(
        password,
        user.password,
      );
      if (!isPasswordMatch) {
        return { status: 400, message: 'Invalid password' };
      }
      const payload = { email: user.email, sub: user.id};
      const secretKey =  this.configService.get<string>('JWT_SECRET_KEY');
      const token = await this.jwtService.signAsync(payload,{
        secret : secretKey
      });
      return { status: 200, message: 'Login success', token: token };
    } catch (error) {
      console.log('error while login the user', error);
      return {
        status: 400,
        message: 'Error while fetching the user',
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
    if (!encpass) {
      throw new UnauthorizedException();
    }
    return encpass;
  }

  // hashPassword
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 14);
  }
}
