import jwt from "jsonwebtoken"
import { catchErr } from "../utils/handleError"
import verify from "../utils/jwt"
import { context } from "../types/context.type"
import { HttpException } from "../exception/HttpException"
import { Response, NextFunction, Request } from "express"
import { RequestWithUser } from "../interfaces/auth.interface"
import { Role } from "@prisma/client"

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const client = context
        // getting a token from authorization header
        const { id, name, role } = verify(req.headers.cookie)
        // check user exist in DB
        const user = await client.prisma.user.findFirst({where: {id, name, role}})
        if (!user) throw new HttpException(401, "You have not permission...")

        req.user = user
        next()
    } catch (error: any) {
       next(new HttpException(401, 'Something went wrong!: ' + error  ))
    }
}

export default authMiddleware
