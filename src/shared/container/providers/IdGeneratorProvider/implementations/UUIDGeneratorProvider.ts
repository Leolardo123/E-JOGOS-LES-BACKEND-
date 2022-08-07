import { v4 } from 'uuid';
import IIdGeneratorProvider from '../models/IIdGeneratorProvider';

class UUIDGeneratorProvider implements IIdGeneratorProvider {
  generate(): string {
    return v4();
  }
}

export default UUIDGeneratorProvider;
