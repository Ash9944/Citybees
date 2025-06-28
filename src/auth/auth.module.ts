
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "CITYBEES-ASH", // move to env
      signOptions: { expiresIn: '1d' },
    }),
    RedisCacheModule
  ]
})
export class AuthModule { }
