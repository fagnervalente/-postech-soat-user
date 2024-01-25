import CreateUseCase from "../app/useCase/CreateUseCase";
import FindByCPFUseCase from "../app/useCase/FindByCPFUseCase";
import DeleteUseCase from "../app/useCase/DeleteUseCase";
import ListUseCase from "../app/useCase/ListUseCase";
import { Customer } from "@entities/Customer";
import CustomerRepository from "@ports/ICustomerRepository";
import IError from "src/domain/error/IError";

export class CustomerController {
	private repository;

	constructor(repository: CustomerRepository) {
		this.repository = repository;
	}

	async create(name: string, cpf: string, email: string): Promise<Customer | null | IError[]> {
		const createUseCase = new CreateUseCase(this.repository);
		const created = await createUseCase.execute({ name, cpf, email });

		if (createUseCase.hasErrors()) {
			throw createUseCase.getErrors();
		}

		return created;
	}

	async list(): Promise<Customer[] | null> {
		const listUseCase = new ListUseCase(this.repository);
		const customers = await listUseCase.execute();

		if (listUseCase.hasErrors()) {
			return Promise.reject(listUseCase.getErrors());
		}

		return Promise.resolve(customers);
	}

	async getCustomerByCPF(cpf: string): Promise<Customer | null> {
		const findByCPFUseCase = new FindByCPFUseCase(this.repository);
		const customer = await findByCPFUseCase.execute(cpf);

		if (findByCPFUseCase.hasErrors()) {
			return Promise.reject(findByCPFUseCase.getErrors());
		}

		return Promise.resolve(customer);
	}

	async delete(id: number): Promise<void> {
		const deleteUseCase = new DeleteUseCase(this.repository);
		await deleteUseCase.execute(id);

		if (deleteUseCase.hasErrors()) {
			return Promise.reject(deleteUseCase.getErrors());
		}

		return Promise.resolve();
	}
}