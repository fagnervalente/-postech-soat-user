export class RemoveDataDto {
    readonly id: number;
	readonly name: boolean;
	readonly cpf: boolean;
	readonly email: boolean;
	readonly address: boolean;
	readonly phone: boolean;

	constructor(id: number, name: boolean, cpf: boolean, email: boolean, address: boolean, phone: boolean) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}
}