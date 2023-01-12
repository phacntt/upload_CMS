import { Role } from "@prisma/client"
import { HttpException } from "../exception/HttpException"
import jwt from 'jsonwebtoken'

type TToken = {
    id: number
    name: string
    role: Role
}

const verify = (jwtToken: string | undefined) => {
    // getting a token from authorization header
    if (!jwtToken) throw new HttpException(401,"Not authen!...")

    let accessToken = jwtToken.split("Bearer ")[1] || jwtToken.split("=")[1]
    if (!accessToken) accessToken = jwtToken
    if (!accessToken) new HttpException(401,"You need to perform Token!...")

    const decoded = <TToken>jwt.verify(accessToken, `${process.env.SECRET_KEY}`)
    if (!decoded) new HttpException(401,"JWT is invalid!...")
    return decoded
    
}

export default verify