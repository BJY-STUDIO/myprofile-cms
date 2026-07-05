export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.path === '/graphql') {
      ctx.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net apollo-server-landing-page.cdn.apollographql.com; connect-src 'self' https:; img-src 'self' data: blob: apollo-server-landing-page.cdn.apollographql.com; media-src 'self' data: blob: apollo-server-landing-page.cdn.apollographql.com; frame-src sandbox.embed.apollographql.com; manifest-src apollo-server-landing-page.cdn.apollographql.com; style-src 'self' 'unsafe-inline' apollo-server-landing-page.cdn.apollographql.com;"
      );
    }
    await next();
  };
};
