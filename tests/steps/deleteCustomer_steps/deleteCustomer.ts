import { Given, Then } from "@cucumber/cucumber";
import CustomerInMemoryRepository from "../../utils/repositoryInMemory/CustomerInMemoryRepository";
import DeleteUseCase from '../../../src/app/useCase/DeleteUseCase';
import { Customer } from "../../../src/domain/entities/Customer";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import assert from "assert";

const mockedCustomer: Customer = {
  name: 'Henrique',
  cpf: '51650096291',
  email: 'henrique@test.com'
};

const customerRepository = new CustomerInMemoryRepository();
const deleteUseCase = new DeleteUseCase(customerRepository);

Given('inicio a remocao de um usuário passando o id {int}', async function (int) {
  const createUseCase = new CreateUseCase(customerRepository);
  await createUseCase.execute(mockedCustomer);
  this.result = await deleteUseCase.execute(int);
});

Then('o resultado da remocao deve ser de sucesso', function () {
  return assert.deepStrictEqual(deleteUseCase.hasErrors(), false);
});

Then('não deve retornar nada', function () {
  return assert.deepStrictEqual(this.result, undefined);
});

Given('inicio a remocao de um usuário passando um id nulo', async function () {
  this.result = await deleteUseCase.execute(null);
});

Then('o resultado da remocao deve ser de erro', function () {
  return assert.deepStrictEqual(deleteUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string}', function (string) {
  return assert.deepStrictEqual(deleteUseCase.getErrors()[0].message, string);
});