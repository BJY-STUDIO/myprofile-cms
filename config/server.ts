export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cors: {
    origin: [
      'http://localhost:5179',
      'http://localhost:1337',
      'https://myprofile-2qp.pages.dev',
      // Render 部署后添加实际域名，或通过环境变量 EXTRA_CORS_ORIGINS 传入
      ...env.array('EXTRA_CORS_ORIGINS', []),
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: true,
  },
});