/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['pdf-parse'],
    },
    outputFileTracingExcludes: {
        '*': [
            'node_modules/pdf-parse/test/data/**',
            'node_modules/pdf-parse/test/pdf/**'
        ]
    }
};

export default nextConfig;
