export default ({ env }) => {
  const sslEnabled = env.bool('DATABASE_SSL', false)

  // Neon 要求 SSL，且需要 rejectUnauthorized: false（或提供 CA）
  // 本地开发 SSL=false，不做任何 SSL 配置
  const sslConfig = sslEnabled
    ? { ssl: { rejectUnauthorized: false } }
    : {}

  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi2026'),
        ...sslConfig,
      },
      debug: false,
    },
  }
}