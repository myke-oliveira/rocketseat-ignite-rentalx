interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class CreateSpecificationService {
  execute({ name, description }: ICreateSpecificationDTO): void {

  }
}

export { CreateSpecificationService }