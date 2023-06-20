import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersService } from './users/services/users.service';
import { NotificationsService } from './notifications/services/notifications.service';
import { UsersController } from './users/controllers/users.controller';
import { NotificationsController } from './notifications/controllers/notifications.controller';
import { UserEntity } from './users/models/users.entity';
import { NotificationEntity } from './notifications/models/notifications.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      // entities: [UserEntity, NotificationEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
