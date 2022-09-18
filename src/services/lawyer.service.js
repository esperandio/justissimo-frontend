import api from './api';

class LawyerService {
  getLawyer(lawyer_id) {
    return api.get(`lawyers/${lawyer_id}`);
  }
}

export default new LawyerService();