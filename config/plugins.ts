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

});
