import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admins';

class AdminService{

    createAdmin(admin){
        return axios.post(`${API_BASE_URL}/create`, admin)
    }

    readAdmin(adminNumber) {
        return axios.get(`${API_BASE_URL}/findAdmin/${adminNumber}`);
    }

    updateAdmin(admin) {
        return axios.put(`${API_BASE_URL}/update`, admin);
    }

    deleteAdmin(adminNumber) {
        return axios.delete(`${API_BASE_URL}/delete/${adminNumber}`);
    }

    getAdmins(){
        return axios.get(`${API_BASE_URL}/getall`);
    }
}

export default new AdminService()