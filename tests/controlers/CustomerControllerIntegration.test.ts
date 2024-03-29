import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CustomerController } from '../../src/controllers/CustomerController';
import CustomerInMemoryRepository from '../mocks/CustomerInMemoryRepository';

describe("CustomerController", () => {

    let customerController: CustomerController;
    let customerInMemoryRepository: CustomerInMemoryRepository;

    const customerOne = {
        name: "example",
        cpf: "11111111111",
        email: "example@test.com",
        address: 'Rua 3, N 4, Centro, Goiânia-GO',
        phone: '+5562123456789'
    }

    beforeEach(() => {
        customerInMemoryRepository = new CustomerInMemoryRepository();
        customerController = new CustomerController(customerInMemoryRepository);
    });

    afterEach(() => {
        customerInMemoryRepository = new CustomerInMemoryRepository();
        customerController = new CustomerController(customerInMemoryRepository);
    })

    describe("constructor", () => {
        it("Set repository", () => {
            expect((customerController as any).repository).not.toBeUndefined();
        })
    })

    describe("create", () => {
        it("Should create customer", async () => {
            const created = await customerController.create(customerOne.name, customerOne.cpf, customerOne.email, customerOne.address, customerOne.phone);
            expect(created).toMatchObject(customerOne);
        })
        it("Should throw an error by using a wrong email", async () => {
            await expect(() => customerController.create('', '', '')).rejects.toThrowError();
        })
    })

    describe("list", () => {
        it("Must return empty list", async () => {
            const result = await customerController.list();
            expect(result).not.toBeNull();
            expect(result?.length).toBe(0);
        })

        it("Must return one item on list", async () => {
            const customer = await customerController.create('example', '33333333333', 'example1@test.com', 'Rua 3, N 4, Goiânia-GO', '+5562123456789');
            const result = await customerController.list();
            expect(result).not.toBeNull();
            expect(result?.length).toBe(1);
            expect(result).toContain(customer);
        })
    })

    describe("getCustomerByCPF", () => {
        it("Should return an error", async () => {
            const customerCPF = '11111111111';
            await expect(() => customerController.getCustomerByCPF('')).rejects.toThrowError();
            await expect(() => customerController.getCustomerByCPF(customerCPF)).rejects.toThrowError();
        })

        it("Should return the customer", async () => {
            const customerCPF = '22222222222';
            const customer = await customerController.create('example', customerCPF, 'example1@test.com', 'Rua 3, N 4, Goiânia-GO', '+5562123456789');
            const result = await customerController.getCustomerByCPF(customerCPF);
            expect(result).toMatchObject(customer);
        })
    })

    describe("forget", () => {
        it("Should return an error Customer not found", async () => {
            const customerId = 123;
            await expect(() => customerController.forget(customerId, true, true, true, true, true)).rejects.toThrowError();
        })

        it("Should return a validation error", async () => {
            const customerId = 123;
            await expect(() => customerController.forget(customerId, true, true, true, true, '' as any)).rejects.toThrowError();
        })

        it("Should return anonimyzed customer", async () => {
            const customer = await customerController.create(customerOne.name, customerOne.cpf, customerOne.email, customerOne.address, customerOne.phone);
            const customerId = customer.id;

            const anonimyzed = await customerController.forget(customerId, true, true, true, true, true);

            expect(anonimyzed.name).not.toBe(customer.name);
            expect(anonimyzed.cpf).not.toBe(customer.cpf);
            expect(anonimyzed.email).not.toBe(customer.email);
            expect(anonimyzed.address).not.toBe(customer.address);
            expect(anonimyzed.phone).not.toBe(customer.phone);
        })
    })

})