import { CarsRepository } from "@modules/cars/repositories/in-memory/CarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by name", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    await carsRepository.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car1" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by brand", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    await carsRepository.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "another_Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car_brand" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by category", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    await carsRepository.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "another_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
