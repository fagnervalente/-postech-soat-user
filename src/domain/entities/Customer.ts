export class Customer {
	readonly id?: number;
	readonly name: string;
	readonly cpf: string;
	readonly email: string;
	readonly address?: string;
	readonly phone?: string;

	constructor(id: number | undefined, name: string, cpf: string, email: string, address: string | undefined, phone: string | undefined) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}
}