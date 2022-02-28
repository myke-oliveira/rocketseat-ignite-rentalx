import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<Omit<User, "password">>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}

export { IUsersRepository };
