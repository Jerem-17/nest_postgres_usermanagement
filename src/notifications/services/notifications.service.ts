import { Injectable } from '@nestjs/common';
import { Notification } from '../models/notifications.interface';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/users/models/users.interface';
import { NotificationEntity } from '../models/notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  createNotification(message: string, user: User): Observable<Notification> {
    const notification: Notification = {
      message,
      user,
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    };

    return from(this.notificationRepository.save(notification));
  }

  getNotification(): Observable<Notification[]> {
    return from(
      this.notificationRepository.find({
        order: {
          id: 'DESC',
        },
      }),
    );
  }

  deleteNotification(id: number): Observable<DeleteResult> {
    return from(this.notificationRepository.delete(id));
  }
}
