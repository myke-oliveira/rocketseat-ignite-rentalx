import { AppError } from "@errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../repositories/in-memory/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepository: ICategoriesRepository;

describe("Create category", () => {
  beforeAll(() => {
    categoryRepository = new CategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoryRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with a name that already exists", async () => {
    const category = {
      name: "Category Test 2",
      description: "Category description test 2",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    try {
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
    }
  });
});
