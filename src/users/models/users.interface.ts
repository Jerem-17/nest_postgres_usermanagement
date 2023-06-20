import { Notification } from 'src/notifications/models/notifications.interface';

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  age?: number;
  notifications?: Notification[];
  createdAt?: Date;
}
