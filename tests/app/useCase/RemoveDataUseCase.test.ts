import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import RemoveDataUseCase from '../../../src/app/useCase/RemoveDataUseCase';
import { Customer } from '../../../src/domain/entities/Customer';
import CustomerInMemoryRepository from '../../mocks/CustomerInMemoryRepository';
import { RemoveDataDto } from '../../../src/app/dto/RemoveDataDto';

describe("RemoveDataUseCase", () => {

    let customerInMemoryRepository = new CustomerInMemoryRepository();

    let removeDataUseCase : RemoveDataUseCase;

    let customer: Customer

    beforeEach(async ()=>{
        customer = await customerInMemoryRepository.save({
            name: "example",
            cpf: "11111111111",
            email: "example@test.com",
            address: 'Rua 3, N 4, Centro, Goiânia-GO',
            phone: '+5562123456789'
        });

        removeDataUseCase = new RemoveDataUseCase(customerInMemoryRepository);
    })

    it("On create get the repository", () => {
        expect(removeDataUseCase.repository).equal(customerInMemoryRepository);
    })

    it("Properly remove data with existing id and valid parameters", async () => {
        //arange
        const removeDto = new RemoveDataDto(Number(customer.id), true, true, true, true, true);

        const executeSpy = vi.spyOn(removeDataUseCase, 'execute');
        const validateFieldsSpy = vi.spyOn(removeDataUseCase as any, 'validateFields');
        const saveSpy = vi.spyOn(customerInMemoryRepository, 'save');

        //act
        const anonimyzed = await removeDataUseCase.execute(removeDto);
        
        //assert
        expect(executeSpy).toHaveBeenCalled();
        expect(validateFieldsSpy).toHaveBeenCalledOnce();
        expect(saveSpy).toHaveBeenCalledOnce();
        
        expect(anonimyzed.name).not.toBe(customer.name);
        expect(anonimyzed.cpf).not.toBe(customer.cpf);
        expect(anonimyzed.email).not.toBe(customer.email);
        expect(anonimyzed.address).not.toBe(customer.address);
        expect(anonimyzed.phone).not.toBe(customer.phone);

    })


    it("Should remove just name", async () => {
        //arange
        const removeDtoRemoveName = new RemoveDataDto(Number(customer.id), true, false, false, false, false);

        //act
        const anonimyzed = await removeDataUseCase.execute(removeDtoRemoveName);
        
        //assert
        expect(anonimyzed.name).not.toBe(customer.name);
        expect(anonimyzed.cpf).toBe(customer.cpf);
        expect(anonimyzed.email).toBe(customer.email);
        expect(anonimyzed.address).toBe(customer.address);
        expect(anonimyzed.phone).toBe(customer.phone);

    })

    it("Should remove just cpf", async () => {
        //arange
        const removeDtoRemoveCpf = new RemoveDataDto(Number(customer.id), false, true, false, false, false);

        //act
        const anonimyzed = await removeDataUseCase.execute(removeDtoRemoveCpf);
        
        //assert
        expect(anonimyzed.name).toBe(customer.name);
        expect(anonimyzed.cpf).not.toBe(customer.cpf);
        expect(anonimyzed.email).toBe(customer.email);
        expect(anonimyzed.address).toBe(customer.address);
        expect(anonimyzed.phone).toBe(customer.phone);

    })

    it("Return erros if customer id not exists", async () => {
        const removeDto = {
            id: 0,
            name: true,
            cpf: true,
            email: true,
            address: true,
            phone: true
        } as RemoveDataDto

        await removeDataUseCase.execute(removeDto);

        expect(removeDataUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros with invalid dto", async () => {
        const removeDto = {
            id: customer.id,
            name: true,
            cpf: true,
            email: true,
            address: true,
            phone: '' as any
        } as RemoveDataDto

        await removeDataUseCase.execute(removeDto);

        expect(removeDataUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if nothing requested to remove", async () => {
        const removeDto = {
            id: customer.id,
            name: false,
            cpf: false,
            email: false,
            address: false,
            phone: false
        } as RemoveDataDto

        await removeDataUseCase.execute(removeDto);

        expect(removeDataUseCase.hasErrors()).toBeTruthy();
    });
})