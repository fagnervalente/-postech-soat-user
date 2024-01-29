import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import CreateUseCase from '../../../src/app/useCase/CreateUseCase';
import ICustomerRepository from '../../../src/ports/ICustomerRepository';
import { Customer } from '../../../src/domain/entities/Customer';

class MockCustomerRepository implements ICustomerRepository {
    save(customer: Customer): Promise<Customer> {
        return Promise.resolve(customer);
    }
    findByCPF(cpf: string): Promise<any> {
        return Promise.resolve();
    }
    delete(id: number): Promise<void> {
        return Promise.resolve();
    }
    list(): Promise<Customer[] | null> {
        return Promise.resolve(null);
    }
}

describe("CreateUseCase", () => {

    let mockedCustomerRepository = new MockCustomerRepository();

    let createUseCase : CreateUseCase;

    beforeEach(()=>{
        createUseCase = new CreateUseCase(mockedCustomerRepository);
    })

    it("On create get the repository", () => {
        expect(createUseCase.repository).equal(mockedCustomerRepository);
    })

    it("Properly save with valid Customer object", async () => {
        //arange
        const bodyCustomer = {
            name: "Customer test",
            cpf: "33333333333",
            email: "example@teste.com"
        }

        const executeSpy = vi.spyOn(createUseCase, 'execute');
        const validateFieldsSpy = vi.spyOn(createUseCase as any, 'validateFields');
        createUseCase.execute(bodyCustomer);
        
        //assert
        expect(createUseCase.hasErrors()).toBeFalsy();
        expect(executeSpy).toHaveBeenCalled();
        expect(validateFieldsSpy).toHaveBeenCalledOnce();

    })

    it("Return erros if customer is missing cpf", () => {
        const customer = {
            name: "example",
            email: "example@teste.com"
        }

        createUseCase.execute(customer);

        expect(createUseCase.hasErrors()).toBeTruthy();
    })

    it("Return erros if customer is missing name", () => {
        const customer = {
            cpf: "33333333333",
            email: "example@teste.com"
        }
        const saveSpy = vi.spyOn(createUseCase.repository, 'save');

        createUseCase.execute(customer);

        expect(createUseCase.hasErrors()).toBeTruthy();
        expect(saveSpy).not.toBeCalled();
    })

    it("Return erros if customer already exists", () => {
        const customer = {
            name: "example",
            cpf: "11111111111",
            email: "example@teste.com"
        }
        const saveSpy = vi.spyOn(createUseCase.repository, 'save');

        createUseCase.execute(customer);

        expect(saveSpy).not.toBeCalled();
    })
})