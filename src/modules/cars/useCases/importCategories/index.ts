import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const importCategoryUseCase = new ImportCategoriesUseCase();
const importCategoryController = new ImportCategoriesController(
  importCategoryUseCase
);

export { importCategoryController };
