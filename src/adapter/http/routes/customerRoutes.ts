import { CustomerApiController } from '../controllers/CustomerApiController';
import { Router } from "express";
import HttpUtils from '../HttpUtils';

const customerRoutes = HttpUtils.asyncRouterHandler(Router());

customerRoutes.get('/customer', new CustomerApiController().list);
customerRoutes.get('/customer/:cpf', new CustomerApiController().getCustomerByCPF);
customerRoutes.post('/customer', new CustomerApiController().create);
customerRoutes.delete('/customer/:id', new CustomerApiController().delete);

export default customerRoutes;