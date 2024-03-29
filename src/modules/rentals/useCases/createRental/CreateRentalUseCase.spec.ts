import dayjs from "dayjs";

import { RentalsRepository } from "@modules/rentals/repositories/in-memory/RentalsRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DateProvider;

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeAll(() => {
    rentalsRepository = new RentalsRepository();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12121212",
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "12341234",
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "43214321",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "234",
        car_id: "12121212",
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        user_id: "432",
        car_id: "12121212",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "456",
        car_id: "987",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
