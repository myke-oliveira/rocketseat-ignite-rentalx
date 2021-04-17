import faker from "faker/locale/pt_BR";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepository } from "../../repositories/in-memory/UserRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepository: IUsersRepository;

describe("Authenticate User", () => {
  beforeAll(() => {
    userRepository = new UserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "1234",
      driver_licence: faker.datatype.number().toString(),
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "1234",
      driver_licence: faker.datatype.number().toString(),
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1235",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
