import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt-auth/jwt.strategy';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    passportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log("configService.get<string>('JWT_SECRET_KEY')", configService.get<string>('JWT_SECRET_KEY'));
        
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '60s' }
        };
      },
      inject: [ConfigService],
    }),
],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, JwtService],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
