export const ServerConfig = {
    port: 3000,
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