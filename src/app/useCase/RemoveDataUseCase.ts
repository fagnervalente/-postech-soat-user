import { Customer } from "@entities/Customer";
import ICustomerRepository from "@ports/ICustomerRepository";
import AbstractUseCase from "./AbstractUseCase";
import FindByCPFUseCase from "./FindByCPFUseCase";
import schema from "./../validation/forgetCustomer";
import { RemoveDataDto } from "../dto/RemoveDataDto";

export default class RemoveDataUseCase extends AbstractUseCase {

	constructor(readonly repository: ICustomerRepository) {
		super(repository);
	}

	public async execute(removeDataDto: RemoveDataDto): Promise<Customer | null> {
		await this.validateFields(removeDataDto);
		const customer = await this.getCustomerById(removeDataDto.id);

		if (this.hasErrors()) {
			return null;
		}

		const newCustomerData = {...customer};
		if(removeDataDto.name) newCustomerData.name = "REMOVED_DATA";
		if(removeDataDto.cpf) newCustomerData.cpf = "REMOVED_DATA";
		if(removeDataDto.email) newCustomerData.email = "REMOVED_DATA";
		if(removeDataDto.address) newCustomerData.address = "REMOVED_DATA";
		if(removeDataDto.phone) newCustomerData.phone = "REMOVED_DATA";

		return await this.repository.save(newCustomerData as Customer);
	}

	private async validateFields(removeDataDto: RemoveDataDto): Promise<void> {
		this.validateSchema(schema, removeDataDto);
        this.hasDataToErase(removeDataDto);
	}

	private hasDataToErase (removeDataDto: RemoveDataDto): void{
		if ( !Object.values({...removeDataDto, id: undefined}).some(value => value) ) {
			this.setError({ message: 'The request did not specify any data removal.' });
		}
	}

    private async getCustomerById(id: number): Promise<Customer | null> {
		const customer = await this.repository.findById(id);

		if (customer === null) {
			this.setError({ message: 'Customer not found' });
		}

        return customer;
	}
}