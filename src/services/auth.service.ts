import { Prisma, User } from "@prisma/client";
import { HttpException } from "../exception/HttpException";
import { context } from "../types/context.type";
import { compare, hash } from 'bcrypt';
import { isEmpty } from "../utils/isEmpty";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { sign } from "jsonwebtoken";
import { REFRESHTOKENSIZE, SECRET_KEY } from "../config";
import RandToken from 'rand-token'
import verify from "../utils/jwt";

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
        const tokenData = await this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, tokenData };
    }

    public async refreshToken(accessToken: string, refreshToken: string) {
        const decodeToken = verify(accessToken);
        if (!decodeToken) throw new HttpException(400, "Access token invalid!!!");

        const user = await this.clients.prisma.user.findUnique({where: {id: decodeToken.id}});

        if (!user) throw new HttpException(400, "Not found user");

        if (user.refreshToken != refreshToken) throw new HttpException(400, "Refresh token invalid!!");
        
        const dataStoredInToken: DataStoredInToken = decodeToken
        const secretKey: string = SECRET_KEY!;
        const expiresRefreshIn: string = "30d";

        const _refreshToken = "Bearer " + sign({ hash: RandToken.generate(Number(REFRESHTOKENSIZE)) }, secretKey, {expiresIn: expiresRefreshIn})
        if (!_refreshToken) throw new HttpException(400, "Create access token failed, please do it again!!");
        
        const _accessToken = "Bearer " + sign(dataStoredInToken, secretKey);
        const updateRefreshToken = await this.clients.prisma.user.update({where: {id: decodeToken.id}, data: {refreshToken: _refreshToken}});

        if (!updateRefreshToken) throw new HttpException(400, "Create refresh token failed, please do it again!!");

        if (!_accessToken) throw new HttpException(400, "Create access token failed, please do it again!!");

        return {_accessToken, _refreshToken};
        
    }

    public logoutUser(userData: User) {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    }

    public async createToken(user: any): Promise<TokenData> {
        const dataStoredInToken: DataStoredInToken = { id: user.id, name: user.name, role: user.role };
        const secretKey: string = SECRET_KEY!;
        const expiresIn: number = 60 * 60;
        const expiresRefreshIn: string = '30d';
        let _refreshToken = sign({hash: RandToken.generate(Number(REFRESHTOKENSIZE))}, secretKey, {expiresIn: expiresRefreshIn})
        if (!user.refreshToken) {
            await this.clients.prisma.user.update({where: {id: dataStoredInToken.id}, data: {refreshToken: _refreshToken}})
        } else {
            _refreshToken = user.refreshToken
        }

        return { expiresIn, accessToken: 'Bearer ' + sign(dataStoredInToken, secretKey, { expiresIn }), refreshToken: _refreshToken, user: dataStoredInToken };
    }
    
    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.accessToken}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService