import { test, expect } from 'vitest';
import { Customer } from '../../../src/domain/entities/Customer';

test("Creating Customer entity", () => {
    const createdCustomer = new Customer(1, "Customer 1", "33333333333", "example@gmail.com");
    expect(createdCustomer.id).equals(1);
    expect(createdCustomer.name).equals("Customer 1");
    expect(createdCustomer.cpf).equals("33333333333");
    expect(createdCustomer.email).equals("example@gmail.com");
})