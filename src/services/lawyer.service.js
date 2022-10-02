import api from "./api";

class LawyerService {
  getLawyer(lawyer_id) {
    return api.get(`lawyers/${lawyer_id}`);
  }

  createScheduling(lawyer_id, { fk_advogado_area, nome_cliente, email_cliente, data_agendamento, horario, observacao }) {
    return api.post("lawyers/scheduling", {
      fk_advogado: lawyer_id,
      fk_advogado_area, 
      nome_cliente, 
      email_cliente, 
      data_agendamento, 
      horario, 
      observacao
    })
  }

  getAllDivulgations(data_inicial = null, data_final = null) {
    let url = "divulgations";

    if (data_inicial != null && data_final != null) {
      url = `${url}/?data_inicial=${data_inicial}&data_final=${data_final}`
    }

    return api.get(url);
  }

  getDivulgationInfo(lawyer_id, divulgation_id) {
    return api.get(`lawyers/${lawyer_id}/divulgation/${divulgation_id}`);
  }
}

export default new LawyerService();