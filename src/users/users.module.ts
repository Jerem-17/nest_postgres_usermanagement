import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/users.entity';
import { NotificationEntity } from 'src/notifications/models/notifications.entity';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, NotificationsService],
  controllers: [UsersController],
})
export class UsersModule {}
