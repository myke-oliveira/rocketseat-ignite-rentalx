import { join } from "path";
import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
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

    if (user.avatar) {
      await deleteFile(join("tmp", "avatar", user.avatar));
    }

    user.avatar = avatarFilePath;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
