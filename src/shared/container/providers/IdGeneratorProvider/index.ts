import { container } from 'tsyringe';

import IIdGeneratorProvider from './models/IIdGeneratorProvider';
import UUIDGeneratorProvider from './implementations/UUIDGeneratorProvider';

container.registerSingleton<IIdGeneratorProvider>(
  'IdGeneratorProvider',
  UUIDGeneratorProvider,
);
