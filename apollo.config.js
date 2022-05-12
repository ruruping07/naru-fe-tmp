module.exports = {
  client: {
    includes: ['./pages/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'naru-backend',
      url: 'http://localhost:4000/graphql',
    },
    node: {
      fs: 'empty',
      net: 'empty',
    },
  },
};
