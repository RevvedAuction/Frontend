import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default {
   
  async placeBid(bidData) {
    try {
      const response = await apiClient.post('/bids/create', bidData);
      return response.data;
    } catch (error) {
      console.error('Error placing bid:', error.response?.data || error.message);
      throw error;
    }
  },
  

  /**
   * Fetch highest bid for a car
   */
  async getHighestBid(carVIN) {
    try {
      const response = await apiClient.get(`/bids/car/${carVIN}/highest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching highest bid:', error.message);
      // Return null if endpoint doesn't exist yet
      return null;
    }
  },

  /**
   * Fetch all bids for a specific car
   */
  async getBidsForCar(carVIN) {
    try {
      const response = await apiClient.get(`/bids/car/${carVIN}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bids for car:', error.message);
      // Return empty array if endpoint doesn't exist yet
      return [];
    }
  }
};