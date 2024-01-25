export class Customer {
	readonly id?: number;
	readonly name: string;
	readonly cpf: string;
	readonly email: string;

	constructor(id: number | undefined, name: string, cpf: string, email: string) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
	}
}