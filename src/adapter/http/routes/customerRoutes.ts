import { CustomerApiController } from '../controllers/CustomerApiController';
import { Router } from "express";
import HttpUtils from '../HttpUtils';
import auth from "../../auth/authMiddleware";


const customerRoutes = HttpUtils.asyncRouterHandler(Router());

customerRoutes.get('/customer', new CustomerApiController().list);
customerRoutes.get('/customer/:cpf', new CustomerApiController().getCustomerByCPF);
customerRoutes.post('/customer', new CustomerApiController().create);
customerRoutes.put('/customer/forget', auth, new CustomerApiController().forget);

export default customerRoutes;