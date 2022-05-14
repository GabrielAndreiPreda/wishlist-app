import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UsersService {
  private saltOrRounds = 10;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
    const { password, ...user } = await this.usersRepository.save(createUserDto);
    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }
  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      username,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
