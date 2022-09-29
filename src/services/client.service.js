import api from "./api";

class ClientService {
  getAllSchedulings(client_id, data_inicial = null, data_final = null) {
    let url = `schedulings/client/${client_id}`;

    if (data_inicial != null && data_final != null) {
      url = `${url}/?data_inicial=${data_inicial}&data_final=${data_final}`
    }

    return api.get(url);
  }
}

export default new ClientService();