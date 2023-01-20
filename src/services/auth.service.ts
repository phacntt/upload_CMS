import { Prisma, User } from "@prisma/client";
import { HttpException } from "../exception/HttpException";
import { context } from "../types/context.type";
import { compare, hash } from 'bcrypt';
import { isEmpty } from "../utils/isEmpty";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export type SignUpData = {
    email: string,
    password: string,
    name: string
};

type LoginData = SignUpData

class AuthService {
    public clients = context
    
    public async signUp(signUpData: SignUpData) {

        if (isEmpty(signUpData)) throw new HttpException(400, 'Data invalid')
        const existsUser = await this.clients.prisma.user.findFirst({where: {email: signUpData.email}})
        if (existsUser) throw new HttpException(400, 'Email have already used! Please check again....')
        const hashPassword = await hash(signUpData.password, 10)
        const users = await this.clients.prisma.user.create({data: {
            email: signUpData.email,
            password: hashPassword,
            name: signUpData.name
        }});
        return users;
    }

    public async loginUser(loginData: LoginData) {

        if (isEmpty(loginData)) throw new HttpException(400, 'Data invalid')
        const findUser = await this.clients.prisma.user.findFirst({where: {email: loginData.email}})
        if (!findUser) throw new HttpException(409, `The ${loginData.email} not found`);

        const isPasswordMatching: boolean = await compare(loginData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser };
    }

    public logoutUser(userData: User) {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user.id, name: user.name as string, role: user.role };
        const secretKey: string = SECRET_KEY!;
        const expiresIn: number = 60 * 60;
    
        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }
    
    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService