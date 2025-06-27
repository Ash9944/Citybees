import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './service-requesters/user.module';
import { BookingsModule } from './bookings/bookings.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';
import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { MessagingModule } from './messaging/messaging.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: "citybees_ash",
       entities: [__dirname + '/**/*.entity.{ts,js}'], // ✅ FIXED
      synchronize: true,
    }),
    UsersModule,
    BookingsModule,
    ServiceProvidersModule,
    AdminModule,
    CommonModule,
    AuthModule,
    MessagingModule,
    RedisCacheModule,
  ],
})

export class AppModule {}
