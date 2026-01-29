import axios from "axios"; 

 

// Criamos uma instância do Axios com a configuração padrão do nosso Backend 

const api = axios.create({ 

    baseURL: "http://localhost:8080", // Endereço do seu Spring Boot 

}); 

 

export default api;