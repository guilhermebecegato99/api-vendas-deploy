import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersReposiroty";

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.FindById(id);

        if (!order) {
            throw new AppError('Order not found!');
        }

        return order;
    }
}

export default ShowOrderService;
