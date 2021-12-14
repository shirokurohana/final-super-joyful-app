// 12/13/2021: All thanks to Mika Di Lello from the CS 55.13 class

const config = {
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
            fs: false,
            http: false,
            stream: false,
            https: false,
            net: 'empty'
        }
    }

    return config;
}
}

// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)