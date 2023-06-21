import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './models/notifications.entity';
import { NotificationSubscriber } from './events/notifications.suscribers';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationSubscriber],
})
export class NotificationsModule {}
