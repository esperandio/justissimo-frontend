import api from './api';

class UserService {
  getProfile(user_id) {
    return api.get(`user/${user_id}`);
  }

  updateProfile(user_id, { email, nome, dt_nascimento, cpf, cnpj, cidade, estado, cep, file }) {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('nome', nome);
    formData.append('dt_nascimento', dt_nascimento);
    formData.append('cpf', cpf);
    formData.append('cnpj', cnpj);
    formData.append('cidade', cidade);
    formData.append('estado', estado);
    formData.append('cep', cep);

    if (file !== null) {
      formData.append('file', file);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return api.putForm(`user/${user_id}`, formData, config);
  }
}

export default new UserService();