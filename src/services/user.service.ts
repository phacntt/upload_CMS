import { HttpException } from "../exception/HttpException";
import { isEmpty } from "../utils/isEmpty";
import { context } from "../types/context.type";
import { Prisma } from "@prisma/client";

class UserService {
  public clients = context
  public async getUsers() {
    const users = await this.clients.prisma.user.findMany();
    if (!users) throw new HttpException(409, "You're not user");
    return users;
  }

  public async findUserById(userId: number) {
    if (isEmpty(userId)) throw new HttpException(409, "You not permision");

    const findUser = await this.clients.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async findUserByEmail(email: string) {
    if (isEmpty(email))
      throw new HttpException(
        409,
        "You're email not found!! Please check again"
      );

    const findUser = await this.clients.prisma.user.findUnique({ where: { email } });

    return findUser;
  }

  public async createUser(userData: Prisma.UserCreateInput) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    
    const createUserData = await this.clients.prisma.user.create({ data: userData });

    return createUserData;
  }
}

export default UserService;
