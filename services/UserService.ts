import { User } from '@/types/user';
import { BaseService } from './BaseService';

class UserService extends BaseService {
  protected resource() {
    return 'user';
  }

  getUser = async (id: string | number) => await this.get<User>(id);

  save = async (user: User) => await this.create<User>(user);
}

export default new UserService();
