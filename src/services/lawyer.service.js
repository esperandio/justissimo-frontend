import api from './api';

class LawyerService {
  getLawyer(lawyer_id) {
    return api.get(`lawyers/${lawyer_id}`);
  }

  createScheduling(lawyer_id, { fk_advogado_area, nome_cliente, email_cliente, data_agendamento, horario, observacao }) {
    return api.post(`lawyers/scheduling`, {
      fk_advogado: lawyer_id,
      fk_advogado_area, 
      nome_cliente, 
      email_cliente, 
      data_agendamento, 
      horario, 
      observacao
    })
  }
}

export default new LawyerService();