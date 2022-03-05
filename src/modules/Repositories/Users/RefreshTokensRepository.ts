import { RefreshToken } from '@modules/models/User/RefreshToken';
import { EntityRepository, Repository } from 'typeorm';
import { IRefreshTokensRepository } from './interfaces/IRefreshTokensRepository';

@EntityRepository(RefreshToken)
class RefreshTokensRepository extends Repository<RefreshToken> implements IRefreshTokensRepository {

}

export { RefreshTokensRepository };
