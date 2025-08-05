import bcrypt from "bcryptjs";
import { generateToken, getVerifiedUsesFromToken } from "../utils/token.js";
import { setCookie } from "../utils/set-cookie.js";
import { ServerConfig } from "../config/server.config.js";
import { PrismaClient } from "../generated/prisma/client.js";


export const register = async (req, res) => {
    const { email, password } = req.body;
    const db = new PrismaClient();

    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
        },
    })

    if (user) {
        res.status(400).json({ message: "User exists!" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword
        },
    });

    const token = generateToken({
        email,
        id: newUser.id
    });

    res
        .status(200)
        .setHeader("Set-Cookie", setCookie(token))
        .setHeader("Access-Control-Allow-Credentials", "true")
        .json({
            message: "Register successs!",
            user: {
                email: newUser.email, id: newUser.id
            }
        });
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    const db = new PrismaClient();

    if (!email || !password) {
        res.status(401).json({ message: "Wrong credentials" });
        return;
    }

    const user = await db.user.findUnique({
        where: { email }
    })

    if (!user || !user.password) {
        res.status(401).json({ message: "No user", user });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
        const token = generateToken({
            email,
            id: user.id
        });
        res
            .status(200)
            .setHeader("Set-Cookie", setCookie(token))
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({
                message: "Login success",
                user: { email: user.email, id: user.id }
            });
        return;
    }

    res.status(401).json({ message: "Wrong credentials" })
};


export const status = async (req, res) => {
    const token = req.cookies[ServerConfig.cookie.tokenKey];
    const db = new PrismaClient();

    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const userFromToken = getVerifiedUsesFromToken(token);
    if (!userFromToken) {
        res.status(401).json({ message: "Token not valid" });
        return;
    }

    const user = await db.user.findUnique({
        where: { email: userFromToken.email }
    })

    if (!user) {
        res
            .clearCookie(ServerConfig.cookie.tokenKey)
            .status(401)
            .json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        message: "User is logged succefully",
        user: {
            email: user.email,
            id: user.id
        }
    });
};


export const logout = (req, res) => {
    return res.clearCookie(ServerConfig.cookie.tokenKey).json({
        message: "User is logged out"
    });
};