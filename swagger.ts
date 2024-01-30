const swaggerAutoGen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/adapter/http/routes/*.{ts,js}'];

const doc = {
	info: {
		version: "1.0.0",
		title: "Microserviço - User",
		description: "Documentação sobre os endpoints fornecidos pela API."
	},
	host: "localhost:3000",
	basePath: "/",
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			"name": "Customer",
			"description": "Endpoints"
		}
	],
	definitions: {
		Customer: {
			id: 1,
			name: "Anderson",
			cpf: "12345678912",
			email: "anderson@gmail.com",
			orders: []
		},
		CreateCustomer: {
			$name: "Anderson",
			$cpf: "12345678912",
			$email: "anderson@gmail.com"
		},
		ListCustomers: [
			{
				$ref: "#/definitions/Customer"
			}
		]
	}
}


swaggerAutoGen(outputFile, endpointsFiles, doc);