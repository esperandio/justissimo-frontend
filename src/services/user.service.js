class UserService {
  getProfile(user_id) {
    return {
      "nome": "david",
      "nr_cnpj": "",
      "nr_cpf": "11111111111",
      "dt_nascimento": "2000-07-08T00:00:00.000Z",
      "endereco": {
        "cidade": "Blumenau",
        "estado": "SC",
        "nr_cep": "89526314"
      },
      "usuario": {
        "url_foto_perfil": "https://justissimo-s3.s3.us-east-1.amazonaws.com/a03247e850ca12a0ea6e10fca1ae75bb87e76c323c248a5736aeaf893949a2a7-husky.jpg",
        "email": "teste@teste.com"
      }
    }
  }
}

export default new UserService();