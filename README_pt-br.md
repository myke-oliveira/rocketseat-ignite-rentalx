# Cadastro de Carro

## Requisitos Funcionais

 * Deve ser possível cadastrar um novo carro.

## Regras de Negócio

 * Não deve ser possível cadastrar um carro com uma placa já cadastrada.
 * Não deve ser possível alterar a placa de um carro já cadastrado.
 * O carro deve ser cadastrado com disponibilidade por padrão.
 * O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de Carros

## Requisitos Funcionais

 * Deve ser possível listar todos os carros disponíveis.
 * Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
 * Deve ser possível listar todos os carros disponíveis pelo nome da marca.
 * Deve ser possível listar todos os carros disponíveis pelo nome do carro.

## Regras de Negócio

 * O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no Carro

## Requisitos Funcionais

 * Deve ser possível cadastrar uma especificação para um carro.

## Regras de Negócio

 * Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
 * Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
 * O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do Carro

## Requisitos Funcionais

 * Deve ser possível cadastrar a imagem do carro.

## Requisito Não Funcional

 * Utilizar o multer para upload dos arquivos.

## Regras de negócio

 * O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
 * O usuário responsável pelo cadastro de ser um usuário administrador.

# Aluguel de Carro

## Requisitos Funcionais

 * Deve ser possível cadastrar um aluguel

## Regras de negócio

 * O aluguel deve ter duração mínima de 24 hora.
 * Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
 * Não deve ser possível cadastrar um novo aluguel para o mesmo carro.
