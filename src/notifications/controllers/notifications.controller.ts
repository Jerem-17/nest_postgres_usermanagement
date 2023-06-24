import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Notification } from '../models/notifications.interface';
import { Observable } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';
import { DeleteResult } from 'typeorm';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}
  @Get()
  findAll(): Observable<Notification[]> {
    return this.notificationService.getNotification();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.notificationService.deleteNotification(id);
  }
}
