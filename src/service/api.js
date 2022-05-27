
import axios from  'axios';

/**
 * criação de componente para informar o axios onde está o nosso backend (api)
 */
const api = axios.create ({
    baseURL: 'http://localhost:3333'
    // baseURL: process.env('BASE_URL')
});

export default api;
