// frontend/src/services/individualService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/individual";

export default {
  create(individual) {
    return axios.post(`${API_URL}/add`, individual);
  },
  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  getAll() {
    return axios.get(API_URL);
  },
  update(id, individual) {
    return axios.put(`${API_URL}/${id}`, individual);
  },
  delete(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  },
};
