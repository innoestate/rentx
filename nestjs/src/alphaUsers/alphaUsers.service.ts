import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlphaUser } from './alphaUser.entity';

@Injectable()
export class AlphaUsersService {
  constructor(
    @InjectRepository(AlphaUser)
    private readonly alphaUserRepository: Repository<AlphaUser>,
  ) {}

  async addUser(email: string): Promise<AlphaUser> {
    const newUser = this.alphaUserRepository.create({ email });
    return this.alphaUserRepository.save(newUser);
  }
}
