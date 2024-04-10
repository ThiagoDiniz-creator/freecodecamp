/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["sqlite3", "sequelize"]
    }
}

module.exports = nextConfig
