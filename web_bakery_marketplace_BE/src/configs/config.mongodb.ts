const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 2024,
  },
  db: {
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: process.env.DEV_DB_PORT || '27017',
    name: process.env.DEV_DB_NAME || 'bakery_marketplace_dev',
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRO_DB_HOST || '127.0.0.1',
    port: process.env.PRO_DB_PORT || '27017',
    name: process.env.PRO_DB_NAME || 'bakery_marketplace_pro',
  },
};
const config = { dev, pro } as { [key: string]: any };
const env = process.env.NODE_ENV || 'dev';
export default config[env];
