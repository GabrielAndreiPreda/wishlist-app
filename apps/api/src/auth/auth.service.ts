import { BadRequestException, Injectable, Response } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser(username: string, pass: string) {
    try {
      const userData = await this.usersService.findByUsername(username);

      if (!(await bcrypt.compare(pass, userData.password))) {
        throw Error;
      }
      const { password, ...user } = userData;
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
