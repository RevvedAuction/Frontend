import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/bids';

class BidService {
    createBid(bid) {
        return axios.post(`${API_BASE_URL}/create`, bid);
    }

    readBid(bidId) {
        return axios.get(`${API_BASE_URL}/read/${bidId}`);
    }

    updateBid(bid) {
        return axios.put(`${API_BASE_URL}/update`, bid);
    }

    getBids() {
        return axios.get(`${API_BASE_URL}/getall`); 
    }
}

export default new BidService();