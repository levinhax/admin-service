// import { Controller, HttpCode, Header, Get, Post } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateUserDto, UpdateUserDto, ListAllEntities } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.interface';

// @Controller('/customers/user') // 路径前缀 customers 组合生成路由映射
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // async findAll(): Promise<any[]> {
  //   return [];
  // }
  findAll(@Query() query: ListAllEntities): Observable<User[]> {
    console.log(`This action returns all user (pageIndex: ${query.pageIndex}, pageSize: ${query.pageSize})`);
    return of(this.userService.findAll() || []);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns user #${id}`;
  }

  @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<void> {
    console.log('createUserDto: ', createUserDto);
    const emailExists = await this.userService.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new UnprocessableEntityException();
    }
    // return 'This action adds a new user';
    this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('updateUserDto: ', updateUserDto);
    return `This action updates user #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes user #${id}`;
  }
}
