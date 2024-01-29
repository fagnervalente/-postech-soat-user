import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import ListUseCase from '../../../src/app/useCase/ListUseCase';
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

describe('ListUseCase', () => {
    let mockedCustomerRepository = new MockCustomerRepository();

    let listUseCase : ListUseCase;

    beforeEach(()=>{
        listUseCase = new ListUseCase(mockedCustomerRepository);
    })

    it("List should be called", () => {
        const listSpy = vi.spyOn(mockedCustomerRepository, 'list');
        listUseCase.execute();
        expect(listSpy).toHaveBeenCalledOnce();
    })
})