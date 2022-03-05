import { inject, injectable } from "tsyringe";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<CarImage[]> {
    const carsImages = images_names.map(async (image_name) =>
      this.carsImagesRepository.create(car_id, image_name)
    );
    return Promise.all(carsImages);
  }
}
export { UploadCarImagesUseCase };
