// import { Controller, HttpCode, Header, Get, Post } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './user.dto';

// @Controller('/customers/user') // 路径前缀 customers 组合生成路由映射
@Controller('user')
export class UserController {
  @Get()
  // async findAll(): Promise<any[]> {
  //   return [];
  // }
  findAll(@Query() query: ListAllEntities): Observable<any[]> {
    console.log(`This action returns all user (pageIndex: ${query.pageIndex}, pageSize: ${query.pageSize})`);
    return of([]);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns user #${id}`;
  }

  @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log('createCatDto: ', createCatDto);
    return 'This action adds a new user';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('updateCatDto: ', updateCatDto);
    return `This action updates user #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes user #${id}`;
  }
}
