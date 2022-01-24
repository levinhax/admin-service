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
// import { Observable, of } from 'rxjs';
// import { CreateUserDto, UpdateUserDto, ListAllEntities } from './user.dto';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.interface';
import { QueryOptionsDto } from '../dto';
import { Response } from '../utils/types';

// @Controller('/customers/user') // 路径前缀 customers 组合生成路由映射
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // findAll(@Query() query: ListAllEntities): Observable<User[]> {
  //   console.log(`This action returns all user (pageIndex: ${query.pageIndex}, pageSize: ${query.pageSize})`);
  //   return of(this.userService.findAll() || []);
  // }
  async findAll(@Query() query: QueryOptionsDto): Promise<
    Response<{
      total: number;
      results: User[];
    }>
  > {
    const res = await this.userService.findAll(query);
    return {
      code: 1,
      data: res,
      message: '查询用户成功',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns user #${id}`;
  }

  @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<Response> {
    const emailExists = await this.userService.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new UnprocessableEntityException();
    }
    await this.userService.create(createUserDto);
    return {
      code: 1,
      message: '用户新增成功',
    };
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
