import ICustomerRepository from '../../src/ports/ICustomerRepository';
import { Customer } from '../../src/domain/entities/Customer';

export default class MockCustomerRepository implements ICustomerRepository {
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