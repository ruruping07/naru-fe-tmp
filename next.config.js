/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_SERVER: process.env.GRAPHQL_SERVER,
    GRAPHQL_SOCKET_URL: process.env.GRAPHQL_SOCKET_URL,
  },
}

module.exports = nextConfig
