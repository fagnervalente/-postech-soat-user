import ICustomerRepository from "../../src/ports/ICustomerRepository";
import { CustomerModel as Customer } from "../../src/adapter/database/models/CustomerModel";
import CustomerDatabaseRepository from "../../src/adapter/database/repository/CustomerDatabaseRepository";

export default class CustomerInMemoryRepository implements ICustomerRepository {
	public customers: Customer[] = [];

	public async list(): Promise<Customer[] | null> {
		return this.customers;
	}

	public async save(customer: Customer): Promise<Customer> {
		const created = { ...customer, id: Math.floor(Math.random() * Date.now()) };
		this.customers.push(created);

		return created;
	}

	public async findByCPF(cpf: string): Promise<Customer | null> {
		const customer = this.customers.find((customer) => customer.cpf == cpf) ?? null;
		if (customer) {
			return customer;
		}

		return null;
	}

	public async delete(id: number): Promise<void> {
		this.customers = this.customers.filter((customer) => {
			return customer.id != id;
		});
	}
}