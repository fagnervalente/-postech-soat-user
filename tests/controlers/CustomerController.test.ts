import { describe, it, expect, beforeEach } from 'vitest';
import { CustomerController } from '../../src/controllers/CustomerController';
import MockCustomerRepository from '../mocks/MockCustomerRepository';

describe("CustomerController", () => {

    let customerController: CustomerController;
    const mockCustomerRepository = new MockCustomerRepository();

    const customerOne = {
        name: "example",
        cpf: "11111111111",
        email: "example@test.com"
    }

    beforeEach(() => {
        customerController = new CustomerController(mockCustomerRepository)
    });

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
        it("Must return null", async () => {
            const result = await customerController.list();
            expect(result).toBeNull();
        })
    })

    describe("getCustomerByCPF", () => {
        it("Should return an error", async () => {
            await expect(() => customerController.getCustomerByCPF('')).rejects.toThrowError();
        })
    })
})