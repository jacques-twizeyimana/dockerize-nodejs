import axios from "axios";
export const API_URL = "http://localhost:7000";
class APIS {
    register(body) {
        return axios.post(`${API_URL}/users`,body);
    }
    login(body) {
        return axios.post(`${API_URL}/users/login`,body);
    }
}

export default new APIS()