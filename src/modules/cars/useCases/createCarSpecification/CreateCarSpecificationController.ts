import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { specifications_ids } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_ids,
    });

    return response.json(car).status(201);
  }
}

export { CreateCarSpecificationController };
