import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const userAlreadyHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userAlreadyHasOpenRental) {
      throw new AppError("There is an rental in progress for this user!");
    }

    const minimumHour = 24;

    const compareInHours = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compareInHours < minimumHour) {
      throw new AppError("Invalid return time!");
    }
    return this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
  }
}
export { CreateRentalUseCase };
