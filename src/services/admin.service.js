import api from "./api";

class AdminService {
  getAllLawyersPending(user_id) {
    let url = `/lawyers/pending?id_usuario=${user_id}`;
    return api.get(url);
  }

  approveLawyer(user_id, lawyer_id) {
    let url = "/lawyers/approve";
    return api.post(url, { 
      id_usuario: user_id,
      id_advogado: lawyer_id 
    });
  }

  rejectLawyer(user_id, lawyer_id) {
    let url = "/lawyers/reprove";
    return api.post(url, {
      id_usuario: user_id,
      id_advogado: lawyer_id
    });
  }
}

export default new AdminService();