import { Controller, Post, UseGuards, Request, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    response.cookie('jwt', await this.authService.login(req.user), { httpOnly: true });
    return { message: 'success' };
  }

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    response.cookie('jwt', await this.authService.register(createUserDto), {
      httpOnly: true,
    });
    return { message: 'success' };
  }
}
