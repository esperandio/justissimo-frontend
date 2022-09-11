import api from './api';

class UserService {
  getProfile(user_id) {
    return api.get(`user/${user_id}`);
  }
}

export default new UserService();