import { inject, injectable } from 'tsyringe';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Purchase, { PurchaseStatusEnum } from '@modules/models/Sales/Purchase';
import Cart, { CartStatusEnum } from '@modules/models/Sales/Cart';
import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';

interface IRequest {
    cart_id: string,
    user_id: string,
}

interface IResponse {
    purchase: Purchase,
}

@injectable()
class CreateProductService {
    constructor(
        @inject('IRepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ) { }

    public async execute({
        cart_id,
        user_id,
    }: IRequest): Promise<IResponse | undefined> {
        const transaction:ITransaction = { data: [] };
        const purchaseRepository = new GenericRepositoryProvider(Purchase);
        const cartRepository = new GenericRepositoryProvider(Cart);

        const cartExists = await cartRepository.findOne({
            where: {
                id: cart_id,
                person: {
                    user_id
                }
            },
            relations: ["person", "person.user"],
        });

        if (!cartExists) {
            throw new AppError('Carrinho não encontrado.');
        }

        if (cartExists.person.user_id !== user_id) {
            throw new AppError('Usuário não autorizado.');
        }

        if (cartExists.status_id !== CartStatusEnum.CART_STATUS_OPEN) {
            throw new AppError('Carrinho não está aberto, compra não autorizada.');
        }

        const purchase = purchaseRepository.create({
            cart_id,
            payment_id: 'test',
            status_id: PurchaseStatusEnum.PENDING,
            person_id: cartExists.person.id,
            total_price: cartExists.total_price,
        });

        cartExists.status_id = CartStatusEnum.CART_STATUS_CLOSED;

        transaction.data.push(
            {
                repository: purchaseRepository,
                entity: purchase,
            },
            {
                repository: cartRepository,
                entity: cartExists,
            }
        );

        await this.repositoryUtils.transaction(transaction);

        return
    }
}

export default CreateProductService;
