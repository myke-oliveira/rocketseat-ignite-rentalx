import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<Omit<User, "password">> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);

    delete user.password;

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepository };
