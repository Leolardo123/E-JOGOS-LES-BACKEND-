import Address from '@modules/addresses/models/Address';
import AddressType from '@modules/addresses/models/AddressType';
import PersonAddress from '@modules/addresses/models/PersonAddress';
import PlaceType from '@modules/addresses/models/PlaceType';
import AddressesRepository from '@modules/addresses/repositories/AddressRepository';
import AddressTypesRepository from '@modules/addresses/repositories/AddressTypesRepository';
import PersonAddressesRepository from '@modules/addresses/repositories/PersonAddressesRepository';
import PlaceTypesRepository from '@modules/addresses/repositories/PlaceTypesRepository';
import Brand from '@modules/cards/models/Brand';
import Card from '@modules/cards/models/Card';
import PersonCard from '@modules/cards/models/PersonCard';
import BrandsRepository from '@modules/cards/repositories/BrandsRepository';
import CardsRepository from '@modules/cards/repositories/CardsRepository';
import PersonCardsRepository from '@modules/cards/repositories/PersonCardsRepository';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import Product from '@modules/products/models/Product';
import ProductsRepository from '@modules/products/repositories/ProductsRepository';
import Cart from '@modules/sales/models/Cart';
import CartItem from '@modules/sales/models/CartItem';
import Coupom from '@modules/sales/models/Coupom';
import Purchase from '@modules/sales/models/Purchase';
import PurchaseCoupom from '@modules/sales/models/PurchaseCoupom';
import CartItemsRepository from '@modules/sales/repositories/CartItemsRepository';
import CartsRepository from '@modules/sales/repositories/CartsRepository';
import CouponsRepository from '@modules/sales/repositories/CouponsRepository';
import PurchaseCouponsRepository from '@modules/sales/repositories/PurchaseCouponsRepository';
import PurchasesRepository from '@modules/sales/repositories/PurchasesRepository';
import Gender from '@modules/users/models/Gender';
import Person from '@modules/users/models/Person';
import Phone from '@modules/users/models/Phone';
import { RefreshToken } from '@modules/users/models/RefreshToken';
import User from '@modules/users/models/User';
import GendersRepository from '@modules/users/repositories/GendersRepository';
import PersonsRepository from '@modules/users/repositories/PersonsRepository';
import PhonesRepository from '@modules/users/repositories/PhonesRepository';
import RefreshTokensRepository from '@modules/users/repositories/RefreshTokensRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IDomainRepository<Address>>(
    'AddressesRepository',
    AddressesRepository,
);

container.registerSingleton<IDomainRepository<AddressType>>(
    'AddressTypesRepository',
    AddressTypesRepository,
);

container.registerSingleton<IDomainRepository<PersonAddress>>(
    'PersonAddressesRepository',
    PersonAddressesRepository,
);

container.registerSingleton<IDomainRepository<PlaceType>>(
    'PlaceTypesRepository',
    PlaceTypesRepository,
);

container.registerSingleton<IDomainRepository<Person>>(
    'PersonsRepository',
    PersonsRepository,
);

container.registerSingleton<IDomainRepository<Brand>>(
    'BrandsRepository',
    BrandsRepository,
);

container.registerSingleton<IDomainRepository<Card>>(
    'CardsRepository',
    CardsRepository,
);

container.registerSingleton<IDomainRepository<PersonCard>>(
    'PersonCardsRepository',
    PersonCardsRepository,
);

container.registerSingleton<IDomainRepository<Product>>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<IDomainRepository<Cart>>(
    'CartsRepository',
    CartsRepository,
);

container.registerSingleton<IDomainRepository<CartItem>>(
    'CartItemsRepository',
    CartItemsRepository,
);

container.registerSingleton<IDomainRepository<Coupom>>(
    'CouponsRepository',
    CouponsRepository,
);

container.registerSingleton<IDomainRepository<Purchase>>(
    'PurchasesRepository',
    PurchasesRepository,
);

container.registerSingleton<IDomainRepository<PurchaseCoupom>>(
    'PurchaseCouponsRepository',
    PurchaseCouponsRepository,
);

container.registerSingleton<IDomainRepository<Gender>>(
    'GendersRepository',
    GendersRepository,
);

container.registerSingleton<IDomainRepository<Person>>(
    'PersonsRepository',
    PersonsRepository,
);

container.registerSingleton<IDomainRepository<Phone>>(
    'PhonesRepository',
    PhonesRepository,
);

container.registerSingleton<IDomainRepository<RefreshToken>>(
    'RefreshTokensRepository',
    RefreshTokensRepository,
);

container.registerSingleton<IDomainRepository<User>>(
    'UsersRepository',
    UsersRepository,
);