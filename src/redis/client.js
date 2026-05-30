require('dotenv').config();

const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL || REDIS_URL.includes('PENDIENTE')) {
  console.error('REDIS_URL no configurada');
  process.exit(1);
}

const opciones = {
  maxRetriesPerRequest: 3,

  retryStrategy: (times) => {
    if (times > 3) return null;

    return Math.min(times * 200, 1000);
  }
};

const pub = new Redis(REDIS_URL, opciones);

pub.on('connect', () => {
  console.log('Redis Pub conectado');
});

pub.on('error', (e) => {
  console.log('Redis error:', e.message);
});

const sub = new Redis(REDIS_URL, opciones);

module.exports = { pub, sub };