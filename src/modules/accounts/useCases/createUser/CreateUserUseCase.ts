import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<Omit<User, "password">> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
