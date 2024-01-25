import { Customer } from "@entities/Customer";
import ICustomerRepository from "@ports/ICustomerRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class ListUseCase extends AbstractUseCase {

	constructor(readonly repository: ICustomerRepository) {
		super(repository);
	}

	async execute(): Promise<Customer[] | null> {
		return await this.repository.list();
	}
}