import { Customer } from "@entities/Customer";

export default interface ICustomerRepository {
	save(customer: Customer): Promise<Customer>;
	findByCPF(cpf: string): Promise<Customer | null>;
	delete(id: number): Promise<void>;
	list(): Promise<Customer[] | null>;
}