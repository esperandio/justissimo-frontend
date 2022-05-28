
import axios from  'axios';

/**
 * criação de componente para informar o axios onde está o nosso backend (api)
 */
const api = axios.create ({
    baseURL: process.env.REACT_APP_BASE_URL
});

//Configuracao para adicionar o Token de autorizacao
//para as requisicoes onde deve estar autenticado
api.interceptors.request.use(async config => {
    // Declaramos um token manualmente para teste.
    const token = window.sessionStorage.getItem('token');
  
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export default api ;
