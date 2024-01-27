import { Given, Then } from '@cucumber/cucumber';
import { Customer } from '../../../src/domain/entities/Customer';
import CreateUseCase from '../../../src/app/useCase/CreateUseCase';
import CustomerInMemoryRepository from '../../utils/repositoryInMemory/CustomerInMemoryRepository';
import assert from 'assert';

const mockedCustomer: Customer = {
  name: 'Henrique',
  cpf: '51650096291',
  email: 'henrique@test.com'
};
let customerCreated: Customer | null;

const customerRepository = new CustomerInMemoryRepository();
const createUseCase = new CreateUseCase(customerRepository);

Given('inicio a criação de um usuário passando dados válidos', async function () {
  customerCreated = await createUseCase.execute(mockedCustomer);
});

Then('o resultado deve ser de sucesso', function () {
  return assert.deepStrictEqual(createUseCase.hasErrors(), false);
});

Then('deve retornar o usuário criado', async function () {
  return assert.deepStrictEqual(customerCreated!.cpf, mockedCustomer.cpf);
});

Given('inicio a criação de um usuário passando o cpf {string} já registrado', async function (string) {
  await createUseCase.execute(mockedCustomer);
  const existingCustomerCPF: Customer = {
    name: 'Eduardo',
    cpf: string,
    email: 'eduardo@test.com'
  };
  customerCreated = await createUseCase.execute(existingCustomerCPF);
});

Then('o resultado deve ser de erro', function () {
  return assert.deepStrictEqual(createUseCase.hasErrors(), true);
});

Then('não deve retornar nenhum usuário e a mensagem de erro {string}', function (string) {
  return customerCreated === null && assert.deepStrictEqual(createUseCase.getErrors()[0].message, string);
});