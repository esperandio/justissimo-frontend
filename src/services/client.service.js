import api from "./api";

class ClientService {
  getAllSchedulings(client_id, data_incial = null, data_final = null) {
    let url = `schedulings/client/${client_id}`;

    if (data_incial != null && data_final != null) {
      url = `${url}/?data_inicial=${data_incial}&data_final=${data_final}`
    }

    return api.get(url);
  }
}

export default new ClientService();