import 'dotenv/config'

export const ServerConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    cors: {
        origin: [
            "http://localhost:4200"
        ],
        credentials: true
    },
    cookie: {
        expiresIn: 24 * 60 * 60 * 1000,
        tokenSecret: process.env.TOKENSECRET,
        tokenKey: 'accesstoken'
    }
};