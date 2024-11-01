// src/users/users.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string): Promise<User> {

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ 
      where: { email } 
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Create user
    const user = this.usersRepository.create({
      email
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email']
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      select: ['id', 'email']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}