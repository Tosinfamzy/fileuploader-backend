import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Use PostgreSQL
      host: process.env.POSTGRES_HOST, // Your PostgreSQL host
      port: +process.env.POSTGRES_PORT, // Default PostgreSQL port
      username: process.env.POSTGRES_USER, // Replace with your PostgreSQL username
      password: process.env.POSTGRES_PASS, // Replace with your PostgreSQL password
      database: 'fileupload', // Replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable in production
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
