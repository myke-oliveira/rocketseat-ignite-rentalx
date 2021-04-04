import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFilePath: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFilePath }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    user.avatar = avatarFilePath;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
