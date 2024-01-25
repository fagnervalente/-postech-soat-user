import { Customer } from "@entities/Customer";
import ICustomerRepository from "@ports/ICustomerRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class FindByCPFUseCase extends AbstractUseCase {

	constructor(readonly repository: ICustomerRepository) {
		super(repository);
	}

	async execute(cpf: string): Promise<Customer | null> {
		const customer = await this.repository.findByCPF(cpf);

		if (!customer) {
			this.setError({ message: 'Customer not found!' });
		}

		return customer;
	}
}