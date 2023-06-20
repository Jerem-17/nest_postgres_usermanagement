import { Controller, Get } from '@nestjs/common';
import { Notification } from '../models/notifications.interface';
import { Observable } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}
  @Get()
  findAll(): Observable<Notification[]> {
    return this.notificationService.getNotification();
  }
}
