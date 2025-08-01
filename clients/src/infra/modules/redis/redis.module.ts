import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheAdapter } from '@domain/adapters/redis.adapter';
import { RedisCacheIntegration } from '@infra/integrations/cache/redis/redis.integration';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        ttl: 180,
      }),
    }),
  ],
  providers: [
    {
      provide: CacheAdapter,
      useClass: RedisCacheIntegration,
    },
  ],
  exports: [CacheAdapter],
})
export class RedisCacheModule {}
