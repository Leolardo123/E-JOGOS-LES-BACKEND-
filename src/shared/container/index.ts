import { container } from 'tsyringe';

import './providers';

import '@modules/users/providers';
import './providers';
import AddressesRepository from '@modules/Repositories/Addresses/AddressesRepository';
import IAddressesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesRepository';
import IUsersRepository from '@modules/Repositories/Users/interfaces/IUsersRepository';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import PlacesTypesRepository from '@modules/Repositories/Addresses/AddressesPlacesTypesRepository';
import IPlacesTypesRepository from '@modules/Repositories/Addresses/interfaces/IPlacesTypesRepository';
import IAddressesTypesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesTypesRepository';
import AddressesTypesRepository from '@modules/Repositories/Addresses/AddressesTypesRepository';
import PersonsRepository from '@modules/Repositories/Users/PersonsRepository';
import IPersonsRepository from '@modules/Repositories/Users/interfaces/IPersonsRepository';
import IPhonesRepository from '@modules/Repositories/Users/interfaces/IPhonesRepository';
import PhonesRepository from '@modules/Repositories/Users/PhonesRepository';

container.registerSingleton<IAddressesRepository>(
    'AddressesRepository',
    AddressesRepository,
);

container.registerSingleton<IAddressesTypesRepository>(
    'AddressesTypesRepository',
    AddressesTypesRepository,
);

container.registerSingleton<IPersonsRepository>(
    'PersonsRepository',
    PersonsRepository,
);

container.registerSingleton<IPlacesTypesRepository>(
    'PlacesTypesRepository',
    PlacesTypesRepository,
);

container.registerSingleton<IPhonesRepository>(
    'PhonesRepository',
    PhonesRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);