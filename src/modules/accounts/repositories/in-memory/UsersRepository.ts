import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_licence,
    });

    this.users.push(user);
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