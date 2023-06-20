import { User } from 'src/users/models/users.interface';

export interface Notification {
  id?: number;
  message: string;
  user?: User;
  createdAt?: Date;
}
