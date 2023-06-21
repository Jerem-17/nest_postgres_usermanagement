import { Injectable } from '@nestjs/common';
import { Notification } from '../models/notifications.interface';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    };

    return from(this.notificationRepository.save(notification));
  }

  getNotification(): Observable<Notification[]> {
    return from(this.notificationRepository.find());
  }
}
