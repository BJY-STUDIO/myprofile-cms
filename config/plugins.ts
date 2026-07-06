export default ({ env }) => ({
  'color-picker': {
    enabled: true,
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 25,
      maxLimit: 100,
      landingPage: true,
      apolloServer: {
        introspection: true,
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        endpoint: env('R2_ENDPOINT'),
        region: env('R2_REGION', 'auto'),
        credentials: {
          accessKeyId: env('R2_ACCESS_KEY_ID'),
          secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
        },
        params: {
          Bucket: env('R2_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
