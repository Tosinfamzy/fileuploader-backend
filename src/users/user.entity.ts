import { UploadedFile } from 'src/upload/uploaded-file.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true }) //temporarily allow null password
  password: string;

  @OneToMany(() => UploadedFile, (uploadedFile) => uploadedFile.user)
  uploadedFiles: UploadedFile[];
}
