import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '../models/notifications.entity';
import { Notification } from '../models/notifications.interface';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  getNotification(): Observable<Notification[]> {
    return from(this.notificationRepository.find());
  }
}
