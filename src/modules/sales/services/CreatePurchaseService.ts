import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import Purchase from '../models/Purchase';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Cart from '../models/Cart';
import { CartStatusEnum } from '../models/enum/CartStatus';
import { PurchaseStatusEnum } from '../models/enum/PurchaseStatus';

interface IRequest {
    cart_id: string,
    user_id: string,
}

interface IResponse {
    purchase: Purchase,
}

@injectable()
class CreatePurchaseService {
    constructor(
        @inject('PurchasesRepository')
        private purchasesRepository: IDomainRepository<Purchase>,

        @inject('CartsRepository')
        private cartsRepository: IDomainRepository<Cart>,

        @inject('IRepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ) { }

    public async execute({
        cart_id,
        user_id,
    }: IRequest): Promise<IResponse | undefined> {
        const transaction: ITransaction = { data: [] };


        const cartExists = await this.cartsRepository.findOne({
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

        const purchase = this.purchasesRepository.create({
            cart_id,
            payment_id: 'test',
            status_id: PurchaseStatusEnum.PENDING,
            person_id: cartExists.person.id,
            total_price: cartExists.total_price,
        });

        cartExists.status_id = CartStatusEnum.CART_STATUS_CLOSED;

        transaction.data.push(
            {
                repository: this.purchasesRepository,
                entity: purchase,
            },
            {
                repository: this.cartsRepository,
                entity: cartExists,
            }
        );

        await this.repositoryUtils.transaction(transaction);

        return
    }
}

export default CreatePurchaseService;
