import axios from "axios";
//import CarAdminService from "@/services/CarAdminService";


const API_BASE_URL = "http://localhost:8080/api/cars"; // match backend

class CarAdminService {
  getAllCars() {
    return axios.get(`${API_BASE_URL}`); // directly call /api/cars
  }

  createCar(carData) {
    const formData = new FormData();
    formData.append("carVIN", carData.carVIN);
    formData.append("carMake", carData.carMake);
    formData.append("carModel", carData.carModel);
    formData.append("carYear", carData.carYear);
    formData.append("carMileage", carData.carMileage);
    formData.append("carStatus", carData.carStatus);
    formData.append("auctionEndTime", carData.auctionEndTime);

    if (carData.image) formData.append("media", carData.image);

    return axios.post(`${API_BASE_URL}/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  updateCar(carData) {
    const formData = new FormData();
    formData.append("carVIN", carData.carVIN);
    formData.append("carMake", carData.carMake);
    formData.append("carModel", carData.carModel);
    formData.append("carYear", carData.carYear);
    formData.append("carMileage", carData.carMileage);
    formData.append("carStatus", carData.carStatus);
    formData.append("auctionEndTime", carData.auctionEndTime);

    if (carData.image) formData.append("media", carData.image);

    return axios.put(`${API_BASE_URL}/${carData.carVIN}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  deleteCar(carVIN) {
    return axios.delete(`${API_BASE_URL}/delete/${carVIN}`);
  }
}

export default new CarAdminService();
