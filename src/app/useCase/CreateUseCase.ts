import { Customer } from "@entities/Customer";
import ICustomerRepository from "@ports/ICustomerRepository";
import AbstractUseCase from "./AbstractUseCase";
import FindByCPFUseCase from "./FindByCPFUseCase";
import schema from "./../validation/createUser";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: ICustomerRepository) {
		super(repository);
	}

	public async execute(customer: Customer): Promise<Customer | null> {
		await this.validateFields(customer);

		if (this.hasErrors()) {
			return null;
		}

		return await this.repository.save(customer);
	}

	private async validateFields(customer: Customer): Promise<void> {
		this.validateSchema(schema, customer);
		await this.validateCPFInUse(customer);
	}

	private async validateCPFInUse(customer: Customer): Promise<void> {
		if (customer.cpf) {
			const findByCPFUseCase = new FindByCPFUseCase(this.repository);
			const existingCustomer = await findByCPFUseCase.execute(customer.cpf);

			if (existingCustomer) {
				this.setError({ message: 'CPF informed is already registered in our system' });
			}
		}
	}
}