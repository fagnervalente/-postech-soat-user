import { AppDataSource } from "../data-source";
import ICustomerRepository from "@ports/ICustomerRepository";
import { Customer } from "@entities/Customer";
import { CustomerModel } from "../models/CustomerModel";

export default class CustomerDatabaseRepository implements ICustomerRepository {

	customerRepository = AppDataSource.getRepository(CustomerModel);

	async list(): Promise<Customer[] | null> {
		const customers = await this.customerRepository.find();

		if (customers) {
			return customers.map((model: CustomerModel) => {
				return CustomerDatabaseRepository.mapDataModelToEntity(model);
			});
		}

		return null;
	}

	async save(customer: Customer): Promise<Customer> {
		const newCustomer = this.customerRepository.create(CustomerDatabaseRepository.mapDataEntityToModel(customer));
		const created = await this.customerRepository.save(newCustomer);

		return CustomerDatabaseRepository.mapDataModelToEntity(created);
	}

	async findByCPF(cpf: string): Promise<Customer | null> {
		const result = await this.customerRepository.findOneBy({ cpf });

		if (result) {
			return CustomerDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}
	
	async findById(id: number): Promise<Customer | null> {
		const result = await this.customerRepository.findOneBy({ id });

		if (result) {
			return CustomerDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}

	static mapDataModelToEntity(model: CustomerModel): Customer {
		return new Customer(
			model.id,
			model.name,
			model.cpf,
			model.email,
			model.address,
			model.phone
		);
	}

	static mapDataEntityToModel(entity: Customer): CustomerModel {
		return new CustomerModel(
			entity.id,
			entity.name,
			entity.cpf,
			entity.email,
			entity.address,
			entity.phone
		);
	}
}