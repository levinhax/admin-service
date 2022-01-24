import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { UserEntity as User } from '../entities';
import { CreateUserDto } from './user.dto';
// import { UserModel } from '../models';
import { QueryOptionsDto } from '../dto';

@Injectable()
export class UserService {
  private saltRounds: number;
  private readonly users: User[] = [];
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectConfig() private readonly config: ConfigService,
  ) {
    this.saltRounds = config.get('app.salt_rounds', 10);
    console.log('saltRounds: ', this.saltRounds);
  }

  async create(user: CreateUserDto): Promise<User> {
    user.password = await this.getHash(user.password);
    const result = await this.userRepository.save(this.userRepository.create(user));

    delete result.password;
    return result;
  }

  // findAll(): User[] {
  //   return this.users;
  // }
  async findAll(query: QueryOptionsDto): Promise<{
    results: User[];
    total: number;
  }> {
    // SQL: select * from user limit skip,take
    const [results, total] = await this.userRepository.findAndCount({
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
    });
    return {
      results,
      total,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
