import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/users.entity';
import { User } from '../models/users.interface';

import { InjectRepository } from '@nestjs/typeorm';
import { Observable, Subject, from, map, switchMap, tap } from 'rxjs';
import { NotificationEntity } from 'src/notifications/models/notifications.entity';
import { Notification } from 'src/notifications/models/notifications.interface';

@Injectable()
export class UsersService {
  private userModifiedSubject = new Subject<User>();

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  userModified(): Observable<User> {
    return this.userModifiedSubject.asObservable();
  }

  createUser(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  updateUser(id: number, user: Partial<User>): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.getUserById(id)),
      tap((user) => this.userModifiedSubject.next(user)),
      switchMap((user) =>
        this.createNotification(`Utilisateur ${user.lastname} modifie`, user),
      ),
    );
  }

  private getUserById(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({ id }));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  private createNotification(
    message: string,
    user: User,
  ): Observable<UpdateResult> {
    const notification: Notification = {
      message,
      user,
    };

    return from(this.notificationRepository.save(notification)).pipe(
      map(() => {
        const rawResult = {} as UpdateResult;
        rawResult.affected = 1;
        return rawResult;
      }),
    );
  }
}
