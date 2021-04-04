import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export default (): ImportCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const importCategoryUseCase = new ImportCategoriesUseCase(
    categoriesRepository
  );

  const importCategoryController = new ImportCategoriesController(
    importCategoryUseCase
  );

  return importCategoryController;
};
