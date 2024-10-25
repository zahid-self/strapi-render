    // strapi-api/config/database.js
  module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST','dpg-csdo6frqf0us7396tc10-a.singapore-postgres.render.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME','strapi_exp'),
        user: env('DATABASE_USERNAME','admin'),
        password: env('DATABASE_PASSWORD','BKc7grzGht35TbBEp9k90V4hRtgBVauu'),
        schema: env('DATABASE_SCHEMA', 'public'), // Not required
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      debug: false,
  },
});
