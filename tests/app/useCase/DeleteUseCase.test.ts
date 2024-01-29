import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import DeleteUseCase from '../../../src/app/useCase/DeleteUseCase';
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

describe("DeleteUseCase", () => {

    let mockedCustomerRepository = new MockCustomerRepository();

    let deleteUseCase : DeleteUseCase;

    beforeEach(()=>{
        deleteUseCase = new DeleteUseCase(mockedCustomerRepository);
    })

    it("On create get the repository", () => {
        expect(deleteUseCase.repository).equal(mockedCustomerRepository);
    })

    it("Properly delete with valid Customer object", async () => {
        //arange
        const deleteSpy = vi.spyOn(mockedCustomerRepository, 'delete');

        deleteUseCase.execute(1);

        expect(deleteSpy).toHaveBeenCalledOnce();
    })

    it("Return error if id is null", async () => {
        //arange
        const deleteSpy = vi.spyOn(mockedCustomerRepository, 'delete');

        deleteUseCase.execute(null);

        expect(deleteUseCase.hasErrors()).toBeTruthy();
        expect(deleteSpy).not.toHaveBeenCalledOnce();
    })
})