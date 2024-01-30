import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CustomerController } from '../../src/controllers/CustomerController';
import CustomerInMemoryRepository from '../mocks/CustomerInMemoryRepository';

describe("CustomerController", () => {

    let customerController: CustomerController;
    let customerInMemoryRepository: CustomerInMemoryRepository;

    const customerOne = {
        name: "example",
        cpf: "11111111111",
        email: "example@test.com"
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
            const created = await customerController.create(customerOne.name, customerOne.cpf, customerOne.email);
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
            const customer = await customerController.create('example', '33333333333', 'example1@test.com');
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
            const customer = await customerController.create('example', customerCPF, 'example1@test.com');
            const result = await customerController.getCustomerByCPF(customerCPF);
            expect(result).toMatchObject(customer);
        })
    })

    describe("delete", () => {
        it("Should delete the customer", async () => {
            const customer = await customerController.create('example', '66666666666', 'example1@test.com');
            await customerController.delete(customer.id as number);
            const list = await customerController.list();
            expect(list?.length).toBe(0);
        })

        it("Should not delete", async () => {
            await customerController.create('example2', '99999999999', 'example3@test.com');
            await customerController.delete(1234 as number);
            const list = await customerController.list();
            expect(list?.length).toBe(1);
        })

        
    })
})