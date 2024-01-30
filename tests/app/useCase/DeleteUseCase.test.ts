import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import DeleteUseCase from '../../../src/app/useCase/DeleteUseCase';
import ICustomerRepository from '../../../src/ports/ICustomerRepository';
import { Customer } from '../../../src/domain/entities/Customer';
import CustomerInMemoryRepository from '../../mocks/CustomerInMemoryRepository';

describe("DeleteUseCase", () => {

    let customerInMemoryRepository = new CustomerInMemoryRepository();

    let deleteUseCase : DeleteUseCase;

    beforeEach(()=>{
        deleteUseCase = new DeleteUseCase(customerInMemoryRepository);
    })

    it("On create get the repository", () => {
        expect(deleteUseCase.repository).equal(customerInMemoryRepository);
    })

    it("Properly delete with valid Customer object", async () => {
        //arange
        const deleteSpy = vi.spyOn(customerInMemoryRepository, 'delete');

        deleteUseCase.execute(1);

        expect(deleteSpy).toHaveBeenCalledOnce();
    })

    it("Return error if id is null", async () => {
        //arange
        const deleteSpy = vi.spyOn(customerInMemoryRepository, 'delete');

        deleteUseCase.execute(null);

        expect(deleteUseCase.hasErrors()).toBeTruthy();
        expect(deleteSpy).not.toHaveBeenCalledOnce();
    })
})