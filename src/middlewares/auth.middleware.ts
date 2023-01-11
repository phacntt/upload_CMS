import jwt from "jsonwebtoken"
import { catchErr } from "../utils/handleError"
import verify from "../utils/jwt"
import { context } from "../types/context.type"
import { HttpException } from "../exception/HttpException"
import { Response, NextFunction, Request } from "express"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = context
        // getting a token from authorization header
        const { id, name, role } = verify(req.headers.authorization)
        // check user exist in DB
        if (role !== 'Admin') throw new HttpException(401, "You have not permission...")
        const user = await client.prisma.user.findFirst({where: {id, name, role}})
        if (!user) throw new HttpException(401, "You have not permission...")

        req.user.id = user.id
        next()
    } catch (error: any) {
       next(new HttpException(401, 'Something went wrong!'))
    }
}

export default authMiddleware
