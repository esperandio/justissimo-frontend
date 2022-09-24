import api from "./api";

class ClientService {
  getAllSchedulings(client_id) {
    return api.get(`schedulings/client/${client_id}`);
  }
}

export default new ClientService();