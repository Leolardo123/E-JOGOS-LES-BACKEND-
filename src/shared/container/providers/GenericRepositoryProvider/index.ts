import Domain from '@modules/models/Domain';
import { container } from 'tsyringe';
import GenericRepositoryProvider from './implementations/GenericRepositoryProvider';
import { IGenericRepositoryProvider } from './models/IGenericRepositoryProvider';

container.registerSingleton<IGenericRepositoryProvider<Domain>>(
    'UUIDGenericRepositoryProvider',
    GenericRepositoryProvider,
);
