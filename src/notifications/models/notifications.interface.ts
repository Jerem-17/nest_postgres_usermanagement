import { User } from 'src/users/models/users.interface';

export interface Notification {
  id?: number;
  message: string;
  hour: number;
  minute: number;
  user?: User;
  createdAt?: Date;
}
