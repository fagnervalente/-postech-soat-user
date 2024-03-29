import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class CustomerModel {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({ type: 'text', unique: true, nullable: false })
	cpf: string;

	@Column({ type: 'text', nullable: false })
	email: string;

	@Column({ type: 'text', nullable: true })
	address?: string;

	@Column({ type: 'text', nullable: true })
	phone?: string;

	constructor(id: number | undefined, name: string, cpf: string, email: string, address: string | undefined, phone: string | undefined) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}
}