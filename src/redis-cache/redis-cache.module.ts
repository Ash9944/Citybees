import { Module } from '@nestjs/common';
import Redis from 'ioredis';

const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    // move credentials to env
    const client = new Redis({
      host: 'redis-16393.c326.us-east-1-3.ec2.redns.redis-cloud.com', 
      port: 16393,
      username: 'default',
      password: 'rYNXJQ4i485yUkNIAgfxaQFaF7W8Sux3',
    });

    client.on('connect', () => console.log('Redis connected'));
    client.on('error', (err) => {
      console.error('Redis error', err)
      process.exit(1);
    });

    return client;
  },
};

@Module({
  providers: [RedisProvider],
  exports: ['REDIS_CLIENT'],
})
export class RedisCacheModule { }
