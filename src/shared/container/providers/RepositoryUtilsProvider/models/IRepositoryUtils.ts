// * TODO: Pensar em nomes melhores para as interfaces
// ? Repositório também é passado para ser possível testar uma transação

interface IRepository {
  save(entity: any): Promise<any>;
}

interface IEntity {
  entity: Record<any, any>;
  repository: IRepository;
}

export interface ITransaction {
  data: IEntity[];
}

interface IRepositoryUtils {
  transaction(data: ITransaction): Promise<void>;
}

export default IRepositoryUtils;
