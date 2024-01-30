import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import CreateUseCase from '../../../src/app/useCase/CreateUseCase';
import { Customer } from '../../../src/domain/entities/Customer';
import CustomerInMemoryRepository from '../../mocks/CustomerInMemoryRepository';

describe("CreateUseCase", () => {

    let customerInMemoryRepository = new CustomerInMemoryRepository();

    let createUseCase : CreateUseCase;

    const existingCustomerCPF = '33333333333';

    vi.mock('../../../src/app/useCase/FindByCPFUseCase', async () => {
        class FindByCPFUseCaseMock {
            execute(cpf: string) {
                const existingCustomerCPF = '33333333333';
                if (cpf === existingCustomerCPF) {
                    return {
                        name: "test",
                        cpf: existingCustomerCPF,
                        email: "example@test.com"
                    } as Customer;
                }
                return;
            }
        }
        return {
            default: FindByCPFUseCaseMock
        }
    });

    beforeEach(()=>{
        createUseCase = new CreateUseCase(customerInMemoryRepository);
    })

    it("On create get the repository", () => {
        expect(createUseCase.repository).equal(customerInMemoryRepository);
    })

    it("Properly save with valid Customer object", async () => {
        //arange
        const bodyCustomer = {
            name: "Customer test",
            cpf: "11111111111",
            email: "example@teste.com"
        }

        const executeSpy = vi.spyOn(createUseCase, 'execute');
        const validateFieldsSpy = vi.spyOn(createUseCase as any, 'validateFields');
        const saveSpy = vi.spyOn(customerInMemoryRepository, 'save');

        //act
        const createdCustomer = await createUseCase.execute(bodyCustomer);
        
        //assert
        expect(executeSpy).toHaveBeenCalled();
        expect(validateFieldsSpy).toHaveBeenCalledOnce();
        expect(saveSpy).toHaveBeenCalledOnce();
        expect(createdCustomer).toMatchObject(bodyCustomer);

    })

    it("Return erros if customer is missing cpf", async () => {
        const customer = {
            name: "example",
            email: "example@teste.com"
        }

        await createUseCase.execute(customer);

        expect(createUseCase.hasErrors()).toBeTruthy();
    })

    it("Return erros if customer is missing name", async () => {
        const customer = {
            cpf: "33333333333",
            email: "example@teste.com"
        }
        const saveSpy = vi.spyOn(createUseCase.repository, 'save');

        await createUseCase.execute(customer);

        expect(createUseCase.hasErrors()).toBeTruthy();
        expect(saveSpy).not.toBeCalled();
    })

    it("Return erros if customer already exists", async () => {
        //arange
        const customer = {
            name: "example",
            cpf: existingCustomerCPF,
            email: "example@teste.com"
        }
        const saveSpy = vi.spyOn(createUseCase.repository, 'save');

        //act
        await createUseCase.execute(customer);

        //assert
        expect(createUseCase.hasErrors()).toBeTruthy();
        expect(saveSpy).not.toBeCalled();
    })
})