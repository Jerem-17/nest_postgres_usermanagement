import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/users.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userService.createUser(user);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number): Observable<User> {
    return this.userService.findOneUser(id);
  }

  @Get(':firstname/:lastname/:age')
  getId(
    @Param('firstname') firstname: string,
    @Param('lastname') lastname: string,
    @Param('age') age: number,
  ): Promise<number> {
    return this.userService.getUserId(firstname, lastname, age);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
