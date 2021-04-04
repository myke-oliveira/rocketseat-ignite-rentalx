import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_licence,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
