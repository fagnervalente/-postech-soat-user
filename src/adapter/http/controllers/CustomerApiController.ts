import { Request, Response } from "express";
import CustomerDatabaseRepository from "@database/repository/CustomerDatabaseRepository";
import { CustomerController } from "@controllers/CustomerController";
import AuthLambdaIntegration from "src/adapter/auth/AuthLambdaIntegration";
import { Customer } from "@entities/Customer";
import IAuthenticatedRequest from "@ports/auth/IAuthenticatedRequest";

const customerRepository = new CustomerDatabaseRepository();
const customerController = new CustomerController(customerRepository);

export class CustomerApiController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para criar um cliente.'
		/* #swagger.parameters['createCustomer'] = {
				in: 'body',
				description: 'Informações do usuário para cadastro.',
				required: true,
				schema: { $ref: "#/definitions/CreateCustomer" }
		} */
		const { name, cpf, email, address, phone } = req.body;

		try {
			const created = await customerController.create(name, cpf, email, address, phone);

			const authIntegration = new AuthLambdaIntegration();
			authIntegration.putClient(created as Customer);

			/* #swagger.responses[201] = {
				schema: { $ref: "#/definitions/Customer" },
				description: 'Cliente cadastrado'
			} */
			return res.status(201).json(created);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para listar os clientes.'

		try {
			const customers = await customerController.list();

			/* #swagger.responses[200] = {
				schema: { $ref: "#/definitions/ListCustomers" },
				description: 'Clientes encontrados'
			} */
			return res.status(200).json(customers);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	async getCustomerByCPF(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para obter um cliente pelo CPF.'
		/* #swagger.parameters['cpf'] = { in: 'path', description: 'CPF do cliente' } */
		const { cpf } = req.params;

		try {
			const customer = await customerController.getCustomerByCPF(cpf);

			/* #swagger.responses[200] = {
				schema: { $ref: "#/definitions/Customer" },
				description: 'Cliente encontrado'
			} */
			return res.status(200).json(customer);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	async forget(req: Request, res: Response){
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint remoção de dados de um cliente.'
		/* #swagger.parameters['forgetCustomer'] = {
				in: 'body',
				description: 'Campos que devem ser removidos do cadastro.',
				required: true,
				schema: { $ref: "#/definitions/ForgetCustomer" }
		} */
		const { name, cpf, email, address, phone } = req.body;
		const customerId: number = +(req as IAuthenticatedRequest).userInfo.id;

		try {
			const anonymizedCustomer = await customerController.forget(customerId, name, cpf, email, address, phone);

			const authIntegration = new AuthLambdaIntegration();
			authIntegration.putClient(anonymizedCustomer as Customer);

			/* #swagger.responses[200] = {
				description: 'Dados removidos'
			} */
			return res.status(200).json(anonymizedCustomer);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}