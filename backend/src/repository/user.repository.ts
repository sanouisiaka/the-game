import { IUserRepository } from '../app/ports/user.repository.interface';
import { PrismaService } from '../config/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '../app/domain/user/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  getUser(email: string): Promise<User | null> {
    return this.prisma.user
      .findUnique({ where: { email } })
      .then((userDb) => (userDb ? User.build(userDb.id, userDb.email, userDb.firstname, userDb.lastname) : null));
  }

  createUser(user: User): Promise<User> {
    const userDb = { email: user._email, firstname: user._firstname, lastname: user._lastname };
    return this.prisma.user.create({ data: userDb }).then((userDb) => User.build(userDb.id, userDb.email, userDb.firstname, userDb.lastname));
  }
}
