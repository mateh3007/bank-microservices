import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheAdapter } from '@domain/adapters/redis.adapter';

@Injectable()
export class RedisCacheIntegration implements CacheAdapter, OnModuleInit {
  private readonly logger = new Logger(RedisCacheIntegration.name);

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async onModuleInit() {
    try {
      const key = 'redis-health-check';
      await this.cache.set(key, 'ok', 5);
      const result = await this.cache.get<string>(key);

      if (result === 'ok') {
        this.logger.log('✅ Redis conectado com sucesso!');
      } else {
        this.logger.warn('⚠️ Redis respondeu, mas o valor não foi o esperado.');
      }
    } catch (error) {
      this.logger.error('❌ Falha ao conectar no Redis', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    return (await this.cache.get<T>(key)) ?? null;
  }

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    await this.cache.set(key, value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
