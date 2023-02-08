import verify from "../utils/jwt"
import { context } from "../types/context.type"
import { HttpException } from "../exception/HttpException"
import { Response, NextFunction } from "express"
import { RequestWithUser } from "../interfaces/auth.interface"
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config"


const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const client = context;
        const accessToken = req.headers.authorization;
        if (!accessToken) throw new HttpException(400, "Not found access token")

        const { id, name, role } = verify(accessToken)
        // check user exist in DB
        const user = await client.prisma.user.findFirst({where: {id, name, role}})
        if (!user) throw new HttpException(401, "You have not permission...")

        req.user = user
        next()
    } catch (error) {
       next(error)
    }
}

export default authMiddleware
