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
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
