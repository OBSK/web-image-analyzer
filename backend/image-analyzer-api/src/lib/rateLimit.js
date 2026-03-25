const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

/*
 * Servicio que controla la cantidad de solicitudes que puede hacer el cliente usando Upstash Redis.
 */

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

const perMinuteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
  prefix: "ratelimit:min"
});

const perHourLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  analytics: true,
  prefix: "ratelimit:hour"
});

async function checkRateLimit(identifier) {
  const minute = await perMinuteLimiter.limit(identifier);
  if (!minute.success) {
    return {
      allowed: false,
      statusCode: 429,
      message: "Límite excedido: máximo 2 solicitudes por minuto."
    };
  }

  const hour = await perHourLimiter.limit(identifier);
  if (!hour.success) {
    return {
      allowed: false,
      statusCode: 429,
      message: "Límite excedido: máximo 20 solicitudes por hora."
    };
  }

  return { allowed: true };
}

module.exports = { checkRateLimit };