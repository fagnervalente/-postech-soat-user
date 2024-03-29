import RemoveDataUseCase from "../app/useCase/RemoveDataUseCase";
import CreateUseCase from "../app/useCase/CreateUseCase";
import FindByCPFUseCase from "../app/useCase/FindByCPFUseCase";
import ListUseCase from "../app/useCase/ListUseCase";
import { Customer } from "@entities/Customer";
import CustomerRepository from "@ports/ICustomerRepository";
import IError from "src/domain/error/IError";

export class CustomerController {
	private repository;

	constructor(repository: CustomerRepository) {
		this.repository = repository;
	}

	async create(name: string, cpf: string, email: string, address?: string, phone?: string): Promise<Customer | null | IError[]> {
		const createUseCase = new CreateUseCase(this.repository);
		const created = await createUseCase.execute({ name, cpf, email, address, phone });

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

	async forget(id: number, name: boolean, cpf: boolean, email: boolean, address: boolean, phone: boolean){
		const removeDataUseCase = new RemoveDataUseCase(this.repository);
		const updated = await removeDataUseCase.execute({id, name, cpf, email, address, phone});

		if (removeDataUseCase.hasErrors()) {
			throw removeDataUseCase.getErrors();
		}

		return updated;
	}
}