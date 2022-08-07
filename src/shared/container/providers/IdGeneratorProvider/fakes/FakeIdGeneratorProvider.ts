import IIdGeneratorProvider from '../models/IIdGeneratorProvider';

class FakeIdGeneratorProvider implements IIdGeneratorProvider {
  generate(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z0-9]+/g, '');
  }
}

export default FakeIdGeneratorProvider;
