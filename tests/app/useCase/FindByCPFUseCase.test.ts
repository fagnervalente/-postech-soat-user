import { beforeEach, describe, expect, vi, it } from 'vitest';
import FindByCPFUseCase from '../../../src/app/useCase/FindByCPFUseCase';
import CustomerInMemoryRepository from '../../mocks/CustomerInMemoryRepository';

const existingCustomerCPF = '11111111111';


describe("DeleteUseCase", () => {

    let customerInMemoryRepository = new CustomerInMemoryRepository();
    let findByCPFUseCase : FindByCPFUseCase;

    beforeEach(()=>{
        findByCPFUseCase = new FindByCPFUseCase(customerInMemoryRepository);
    })

    it("Find by cpf if cpf is passed", () => {
        const findByCPFSpy = vi.spyOn(customerInMemoryRepository, 'findByCPF');
        findByCPFUseCase.execute(existingCustomerCPF);
        expect(findByCPFSpy).toHaveBeenCalledOnce();
    })

    it("Return error in case customer doesn't exist", () => {
        const findByCPFSpy = vi.spyOn(customerInMemoryRepository, 'findByCPF');
        findByCPFUseCase.execute('33333333333');
        expect(findByCPFSpy).toHaveBeenCalledOnce();
        expect(findByCPFUseCase.hasErrors).toBeTruthy();
    })

});