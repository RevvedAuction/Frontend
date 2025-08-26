// src/services/CarService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cars';

export default {
  // Fetch all active cars
  getActiveCars() {
    return axios.get(`${API_BASE_URL}`); // make sure to call /active
  },

  // Add a single car with image (multipart/form-data)
  addCars(formData) {
    return axios.post(`${API_BASE_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Fetch a car by its VIN
  getCarByVIN(vin) {
    return axios.get(`${API_BASE_URL}/${vin}`);
  },

  // Update car details
  updateCar(vin, carData) {
    return axios.put(`${API_BASE_URL}/${vin}`, carData);
  },

  // Delete a car
  deleteCar(vin) {
    return axios.delete(`${API_BASE_URL}/delete/${vin}`);
  }
};
