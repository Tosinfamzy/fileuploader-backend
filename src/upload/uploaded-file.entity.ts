import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity('uploaded_files') // Table name is 'uploaded_files'
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  // Many files can be uploaded by one user
  @ManyToOne(() => User, (user) => user.uploadedFiles, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
