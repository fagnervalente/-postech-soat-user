import { beforeEach, describe, expect, vi, it } from 'vitest';
import ListUseCase from '../../../src/app/useCase/ListUseCase';
import CustomerInMemoryRepository from '../../mocks/CustomerInMemoryRepository';

describe('ListUseCase', () => {
    let customerInMemoryRepository = new CustomerInMemoryRepository();

    let listUseCase : ListUseCase;

    beforeEach(()=>{
        listUseCase = new ListUseCase(customerInMemoryRepository);
    })

    it("List should be called", () => {
        const listSpy = vi.spyOn(customerInMemoryRepository, 'list');
        listUseCase.execute();
        expect(listSpy).toHaveBeenCalledOnce();
    })
})