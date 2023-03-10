import { EntityRepository, In, Repository } from "typeorm";
import Product from '../entities/Product';

interface IFindProducts {
    id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({
            where: {
                name,
            }
        });

        return product;
    }

    public async findByAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id);

        const exixtsProducts = await this.find({
            where: {
                id: In(productsIds),
            },
        });

        return exixtsProducts;
    }
}
