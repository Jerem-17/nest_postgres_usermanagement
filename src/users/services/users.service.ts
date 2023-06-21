import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/users.entity';
import { User } from '../models/users.interface';

import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: User): Observable<User> {
    this.eventEmitter.emit('user.created', user);

    return from(this.userRepository.save(user));
  }

  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findOneUser(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({ id }));
  }

  updateUser(id: number, user: Partial<User>): Observable<UpdateResult> {
    this.eventEmitter.emit('user.updated', user);
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    const user = this.userRepository.findOneBy({ id });
    this.eventEmitter.emit('user.deleted', user);
    return from(this.userRepository.delete(id));
  }
}
