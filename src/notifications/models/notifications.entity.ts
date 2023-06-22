import { UserEntity } from 'src/users/models/users.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: 0 })
  hour: number;

  @Column({ default: 0 })
  minute: number;

  @ManyToMany(() => UserEntity, (user) => user.notifications)
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
