import IRepositoryUtils, { ITransaction } from '../models/IRepositoryUtils';

class FakeRepositoryUtils implements IRepositoryUtils {
  public async transaction({ data }: ITransaction): Promise<void> {
    data.forEach(async ({ entity, repository }) => {
      await repository.save(entity);
    });
  }
}

export default FakeRepositoryUtils;
