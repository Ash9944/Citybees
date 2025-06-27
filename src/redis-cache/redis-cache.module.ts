import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60 * 5, // 5 minutes
        }),
      }),
      isGlobal: true,
    }),
  ]
})
export class RedisCacheModule { }
