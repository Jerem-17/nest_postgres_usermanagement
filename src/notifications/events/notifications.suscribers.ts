import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../services/notifications.service';
import { User } from 'src/users/models/users.interface';

@Injectable()
export class NotificationSubscriber {
  constructor(private notificationService: NotificationsService) {}

  @OnEvent('user.created')
  handleUserCreatedEvent(payload: User) {
    console.log('Nouvel utilisateur créé :', payload);
    this.notificationService.createNotification(
      `Nouvel utilisateur  ${payload.lastname} créé`,
      payload,
    );
  }

  @OnEvent('user.updated')
  handleUserUpdatedEvent(payload: User) {
    console.log('Utilisateur modifié :', payload);
    this.notificationService.createNotification(
      `Utilisateur ${payload.lastname} modifié`,
      payload,
    );
  }

  @OnEvent('user.deleted')
  handleUserDeletedEvent(payload: User) {
    console.log('Utilisateur supprimé  :', payload);
    this.notificationService.createNotification(
      `Utilisateur  ${payload.lastname} supprimé`,
      payload,
    );
  }
}
