const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['buildersleague.payloadcms.app'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
