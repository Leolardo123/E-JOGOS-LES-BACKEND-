import { container } from 'tsyringe';

import IRepositoryUtils from './models/IRepositoryUtils';

import RepositoryUtils from './implementations/RepositoryUtils';

container.register<IRepositoryUtils>('RepositoryUtils', RepositoryUtils);
