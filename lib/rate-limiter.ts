import { redis } from './redis';
import { Ratelimit } from '@upstash/ratelimit';

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '10 s'),
  prefix: '@upstash/ratelimit'
});
