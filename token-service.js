import jwt from "jsonwebtoken";
// import key from "../config.js"
import key from "./config.js";
import Token from './models/Token.js'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })
        return {
            accessToken,
            refreshToken
        }

    }
    async saveToken(refreshToken, id) {
        const tokenData = await Token.findOne({ username: id })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ _id: id, refreshToken })
        return token
    }
}

export default new TokenService()