import { CarsRepository } from "@modules/cars/repositories/in-memory/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/in-memory/SpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    specificationsRepository = new SpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-3213",
      fine_amount: 10,
      brand: "Car brand",
      category_id: "Category id",
    });

    const specification = await specificationsRepository.create({
      name: "test",
      description: "test description",
    });
    const specifications_ids = [specification.id];

    const specificatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });

    // console.log(specificatedCar);

    expect(specificatedCar).toHaveProperty("specifications");
    expect(Array.isArray(specificatedCar.specifications)).toBeTruthy();
    expect(specificatedCar.specifications.length).toBe(1);
  });

  it("should be able to add a new specification to the car", async () => {
    const car_id = "1234";
    const specifications_ids = ["5678"];
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
