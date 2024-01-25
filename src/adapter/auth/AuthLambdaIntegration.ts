import { Customer } from "@entities/Customer";

const fetch = require("node-fetch");

declare type CustomerAuthInfo = {
	id: string,
	name: string
}

export default class AuthLambdaIntegration {
	static mapCustomerToAuthInfo(customer: Customer): CustomerAuthInfo {
		return { id: customer.cpf, name: customer.name } as CustomerAuthInfo;
	}

	async putClient(customer: Customer): Promise<any> {
		try {
			const customerInfo = AuthLambdaIntegration.mapCustomerToAuthInfo(customer);
			const url = process.env.AUTH_PUT_CLIENT;

			const response = await fetch(url, { method: 'POST', body: JSON.stringify(customerInfo) });

			if (!response.ok) {
				console.log(`Erro ao enviar dados do cliente: ${response.statusText}`);
				return null;
			}

			const payment = await response.json();
			return payment;

		} catch (error) {
			console.log(`Erro ao enviar dados do cliente`, error);
			return null;
		}
	}
}