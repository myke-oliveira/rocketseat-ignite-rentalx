import { Router } from "express";

import { ensureAuthencicated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthencicated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
