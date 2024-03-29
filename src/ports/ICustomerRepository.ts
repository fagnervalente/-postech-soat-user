import { Customer } from "@entities/Customer";

export default interface ICustomerRepository {
	save(customer: Customer): Promise<Customer>;
	findByCPF(cpf: string): Promise<Customer | null>;
	findById(id: number): Promise<Customer | null>;
	list(): Promise<Customer[] | null>;
}