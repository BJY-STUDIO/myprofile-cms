export default ({ env }) => ({
  'color-picker': {
    enabled: true,
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 25,
      maxLimit: 100,
    },
  },
  documentation: {
    enabled: true,
    config: {
      openAPI: {
        info: {
          title: 'MyProfile CMS API',
          description: 'REST API documentation for the MyProfile blog CMS',
          version: '1.0.0',
        },
        x-strapi-config: {
          path: '/documentation',
          showGeneratedFiles: true,
        },
      },
    },
  },
});
