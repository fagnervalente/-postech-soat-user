import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import FindByCPFUseCase from '../../../src/app/useCase/FindByCPFUseCase';
import ICustomerRepository from '../../../src/ports/ICustomerRepository';
import { Customer } from '../../../src/domain/entities/Customer';

const existingCustomerCPF = '11111111111';

const existingCustomer = {
    id: 1,
    name: "test",
    cpf: existingCustomerCPF,
    email: "example@example.com"
}

class MockCustomerRepository implements ICustomerRepository {
    save(customer: Customer): Promise<Customer> {
        return Promise.resolve(customer);
    }
    findByCPF(cpf: string): Promise<any> {
        if (cpf == existingCustomerCPF) return Promise.resolve(existingCustomer);
        return Promise.resolve(null);
    }
    delete(id: number): Promise<void> {
        return Promise.resolve();
    }
    list(): Promise<Customer[] | null> {
        return Promise.resolve(null);
    }
}

describe("DeleteUseCase", () => {

    let mockedCustomerRepository = new MockCustomerRepository();
    let findByCPFUseCase : FindByCPFUseCase;

    beforeEach(()=>{
        findByCPFUseCase = new FindByCPFUseCase(mockedCustomerRepository);
    })

    it("Find by cpf if cpf is passed", () => {
        const findByCPFSpy = vi.spyOn(mockedCustomerRepository, 'findByCPF');
        findByCPFUseCase.execute(existingCustomerCPF);
        expect(findByCPFSpy).toHaveBeenCalledOnce();
    })

    it("Return error in case customer doesn't exist", () => {
        const findByCPFSpy = vi.spyOn(mockedCustomerRepository, 'findByCPF');
        findByCPFUseCase.execute('33333333333');
        expect(findByCPFSpy).toHaveBeenCalledOnce();
        expect(findByCPFUseCase.hasErrors).toBeTruthy();
    })

});