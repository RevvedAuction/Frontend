import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cars';

export default {
  getActiveCars() {
    return axios.get(`${API_BASE_URL}`); 
  },

  addCars(formData) {
    return axios.post(`${API_BASE_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getCarByVIN(vin) {
    return axios.get(`${API_BASE_URL}/${vin}`);
  },

  updateCar(vin, carData) {
    return axios.put(`${API_BASE_URL}/${vin}`, carData);
  },

  deleteCar(vin) {
    return axios.delete(`${API_BASE_URL}/delete/${vin}`);
  }
};
