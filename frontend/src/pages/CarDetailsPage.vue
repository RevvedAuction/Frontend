<template>
  <div class="car-page">
    <!-- Top Navigation -->
    <div class="top-bar">
      <header class="header">
        <h1 @click="goTo('home')">REVVED AUCTION</h1>
      </header>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/product">AUCTION</router-link></li>
          <li><router-link to="/contact-support">CONTACT</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/account-setup">LOGIN</router-link></li>
          <li v-else><a @click="logout">LOGOUT</a></li>
        </ul>
      </nav>
    </div>

    <!-- Car Detail Section -->
    <section class="car-detail-section">
      <div v-if="loading" class="loading">Loading car details...</div>

      <div v-else-if="!car || Object.keys(car).length === 0" class="empty-message">
        🚗 Car details not available
      </div>

      <div v-else class="car-container">
        <!-- Left: Car Image -->
        <div class="car-image-section">
          <img :src="car.mediaBase64 || placeholderImage" alt="Car Image" />
          <div class="overlay-360">360° View</div>
        </div>

        <!-- Middle: Vehicle Details -->
        <div class="vehicle-details">
          <h3>Vehicle Details</h3>
          <table>
            <tbody>
              <tr><td>VIN</td><td>{{ car.carVIN || 'N/A' }}</td></tr>
              <tr><td>Mileage</td><td>{{ (car.carMileage ?? 0).toLocaleString() }} km</td></tr>
              <tr><td>Key</td><td>{{ car.hasKey ? 'Yes' : 'No' }}</td></tr>
              <tr><td>Status</td><td>{{ car.carStatus || 'Unknown' }}</td></tr>
              <tr><td>Make / Model</td><td>{{ car.carMake }} {{ car.carModel }}</td></tr>
              <tr><td>Year</td><td>{{ car.carYear }}</td></tr>
              <tr><td>Source</td><td>{{ car.source || 'Unknown' }}</td></tr>
            </tbody>
          </table>
        </div>

        <!-- Right: Auction & Actions -->
        <div class="auction-info">
          <!-- Countdown -->
          <div class="countdown-bar" :class="{ 'ended': isAuctionEnded }">
            ⏰ {{ formatCountdown(car.remainingTime) }}
          </div>

          <!-- Current Bids -->
          <div class="bid-info">
            <p>Current Highest Bid</p>
            <h2>R{{ (highestBid || car.price || 0).toLocaleString() }}</h2>
            <p>Winning Buyer: {{ highestBidder || 'None' }}</p>
            <p v-if="totalBids > 0" class="total-bids">Total Bids: {{ totalBids }}</p>
          </div>

          <!-- Bid Calculator -->
          <div class="bid-calculator" v-if="!isAuctionEnded">
            <h4>Bid Calculator</h4>
            <input 
              type="number" 
              v-model.number="userBid" 
              :placeholder="`Min: R${minBidAmount.toLocaleString()}`"
              :min="minBidAmount"
              class="bid-input"
            />
            <button @click="calculateBid" :disabled="!userBid" class="calc-btn">
              Calculate
            </button>
            <p v-if="calculatedBid" class="calculation-result">
              Your bid plus increment: R{{ calculatedBid.toLocaleString() }}
            </p>
          </div>

          <!-- Place Bid Button -->
          <div class="place-bid" v-if="!isAuctionEnded">
            <button 
              class="bid-button" 
              @click="placeBid"
              :disabled="!userBid || userBid < minBidAmount || placingBid"
            >
              <span v-if="placingBid">Placing Bid...</span>
              <span v-else>💰 Place Your Bid</span>
            </button>
            <p v-if="userBid && userBid < minBidAmount" class="error-message">
              Bid must be at least R{{ minBidAmount.toLocaleString() }}
            </p>
          </div>

          <!-- Login Prompt -->
          <div class="login-prompt" v-if="!isLoggedIn && !isAuctionEnded">
            <p>Please log in to place your bid.</p>
            <div class="auth-buttons">
              <button @click="goTo('login')" class="login-btn">Login</button>
              <button @click="goTo('signup')" class="signup-btn">Sign Up</button>
            </div>
          </div>

          <!-- Auction Ended Message -->
          <div class="auction-ended" v-if="isAuctionEnded">
            <h3>🚫 Auction Ended</h3>
            <p>Bidding is no longer available for this vehicle.</p>
          </div>

          <!-- Auction Details -->
          <div class="bid-details">
            <p>Bid Increment: R{{ car.bidIncrement ?? 1000 }}</p>
            <p>Minimum Bid: R{{ minBidAmount.toLocaleString() }}</p>
            <p>Current Highest: R{{ highestBid.toLocaleString() }}</p>
            <p>Subject To Confirmation: Yes</p>
            <p>Expires: {{ formatDate(car.auctionEndTime) }}</p>
            <p>Total Bids: {{ totalBids }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CarService from "@/services/CarService";
import BidService from "@/services/BidService";

export default {
  name: "CarDetailsPage",
  data() {
    return {
      car: {},
      loading: true,
      timer: null,
      placeholderImage: "https://via.placeholder.com/400x300?text=No+Image",
      userBid: null,
      calculatedBid: null,
      highestBid: 0,
      highestBidder: '',
      totalBids: 0,
      isLoggedIn: true,
      currentUserId: 'test-user-123',
      placingBid: false
    };
  },
  computed: {
    isAuctionEnded() {
      return this.car.remainingTime <= 0;
    },
    minBidAmount() {
      const currentHighest = this.highestBid || this.car.price || 0;
      const increment = this.car.bidIncrement || 1000;
      return currentHighest + increment;
    }
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    async fetchCar() {
      const vin = this.$route.params.vin;
      try {
        const res = await CarService.getCarByVIN(vin);
        const auctionTime = new Date(res.data.auctionEndTime);
        this.car = {
          ...res.data,
          remainingTime: auctionTime - new Date(),
          currentBid: res.data.currentBid ?? 0,
          price: res.data.price ?? 0,
        };
        
        await this.fetchBidData();
      } catch (err) {
        console.error("Error fetching car:", err);
        this.car = {};
      } finally {
        this.loading = false;
      }
    },
    
    async fetchBidData() {
      const vin = this.$route.params.vin;
      try {
        const highestBidData = await BidService.getHighestBid(vin);
        if (highestBidData) {
          this.highestBid = highestBidData.bidAmount;
          this.highestBidder = highestBidData.userId;
        } else {
          this.highestBid = this.car.currentBid || this.car.price || 0;
          this.highestBidder = this.car.winningBuyer || '';
        }
        
        const bidsData = await BidService.getBidsForCar(vin);
        this.totalBids = Array.isArray(bidsData) ? bidsData.length : 0;
        
      } catch (error) {
        console.error("Error fetching bid data:", error);
        this.highestBid = this.car.currentBid || this.car.price || 0;
        this.highestBidder = this.car.winningBuyer || '';
        this.totalBids = this.car.successfulBids || 0;
      }
    },
    
    updateCountdown() {
      if (this.car && this.car.auctionEndTime) {
        this.car.remainingTime = new Date(this.car.auctionEndTime) - new Date();
      }
    },
    
    formatCountdown(ms) {
      if (!ms || ms <= 0) return "Auction Ended";
      const days = Math.floor(ms / (1000 * 3600 * 24));
      const hours = Math.floor((ms / (1000 * 3600)) % 24);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const seconds = Math.floor((ms / 1000) % 60);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
    
    formatDate(dateStr) {
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleString();
    },
    
    calculateBid() {
      const increment = this.car.bidIncrement ?? 1000;
      if (this.userBid) {
        this.calculatedBid = this.userBid + increment;
      }
    },
    
    async placeBid() {
      if (!this.userBid) {
        alert("Please enter a bid amount first!");
        return;
      }
      
      if (this.userBid < this.minBidAmount) {
        alert(`Your bid must be at least R${this.minBidAmount.toLocaleString()}`);
        return;
      }
      
      if (this.isAuctionEnded) {
        alert("This auction has already ended.");
        return;
      }
      
      if (!this.isLoggedIn) {
        alert("Please log in to place a bid.");
        this.goTo('login');
        return;
      }

      this.placingBid = true;

      try {
        const bidData = {
          carVIN: this.car.carVIN,
          userId: this.currentUserId,
          bidAmount: this.userBid,
          bidDate: new Date().toISOString().split('T')[0],
          status: "Pending Confirmation"
        };

        console.log("Placing bid:", bidData);
        
        await BidService.placeBid(bidData);
        
        alert(`✅ Bid of R${this.userBid.toLocaleString()} placed successfully for ${this.car.carMake} ${this.car.carModel}!`);
        
        await this.fetchBidData();
        
        this.userBid = null;
        this.calculatedBid = null;
        
      } catch (error) {
        console.error("Error placing bid:", error);
        alert("❌ Failed to place bid. Please check if the backend is running and try again.");
      } finally {
        this.placingBid = false;
      }
    },
    
    logout() {
      this.isLoggedIn = false;
      this.currentUserId = null;
      alert('Logged out successfully!');
    }
  },
  mounted() {
    this.fetchCar();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.car-page {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(#b99976, #000000);
  min-height: 100vh;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  cursor: pointer;
  font-weight: 800;
  font-size: 24px;
  color: #2d3436;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: #2d3436;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: #216D96;
}

.car-detail-section {
  display: flex;
  justify-content: center;
}

.car-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  background: #B5B7BB;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  padding: 30px;
  max-width: 1200px;
  width: 100%;
}

.car-image-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.car-image-section img {
  width: 100%;
  height: 250px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.overlay-360 {
  text-align: center;
  background: #BB9999;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.overlay-360:hover {
  background: #a57c7c;
}

.vehicle-details h3 {
  background: #216D96;
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.vehicle-details table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.vehicle-details td {
  padding: 12px 15px;
  border-bottom: 1px solid #e1e1e1;
}

.vehicle-details tr:last-child td {
  border-bottom: none;
}

.vehicle-details td:first-child {
  font-weight: 600;
  color: #2d3436;
  width: 40%;
}

.auction-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.countdown-bar {
  background: #216D96;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.countdown-bar.ended {
  background: #e74c3c;
}

.bid-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bid-info h2 {
  color: #e17055;
  margin: 10px 0;
  font-size: 28px;
}

.bid-info p {
  margin: 5px 0;
  color: #636e72;
}

.total-bids {
  font-weight: 600;
  color: #2d3436;
}

.bid-calculator {
  background: #dfe6e9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bid-calculator h4 {
  margin: 0 0 15px 0;
  color: #2d3436;
  text-align: center;
}

.bid-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #b2bec3;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.bid-input:focus {
  outline: none;
  border-color: #216D96;
}

.calc-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #fd79a8;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.calc-btn:hover:not(:disabled) {
  background: #e84393;
}

.calc-btn:disabled {
  background: #b2bec3;
  cursor: not-allowed;
}

.calculation-result {
  margin: 10px 0 0 0;
  padding: 10px;
  background: #a29bfe;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.place-bid {
  text-align: center;
}

.bid-button {
  background: #fbbf24;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.bid-button:hover:not(:disabled) {
  background: #fff;
  color: #111;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.bid-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 600;
  text-align: center;
}

.login-prompt {
  background: #dfe6e9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.login-prompt p {
  margin: 0 0 15px 0;
  color: #2d3436;
  font-weight: 600;
}

.auth-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.login-btn, .signup-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn {
  background: #55efc4;
  color: #2d3436;
}

.login-btn:hover {
  background: #00b894;
}

.signup-btn {
  background: #74b9ff;
  color: #2d3436;
}

.signup-btn:hover {
  background: #0984e3;
}

.auction-ended {
  text-align: center;
  background: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.auction-ended h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.auction-ended p {
  margin: 0;
  opacity: 0.9;
}

.bid-details {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bid-details p {
  margin: 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #ecf0f1;
  color: #2d3436;
}

.bid-details p:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.loading, .empty-message {
  font-size: 18px;
  text-align: center;
  color: white;
  padding: 40px;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .car-container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .top-bar {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .nav-menu ul {
    justify-content: center;
  }
  
  .auth-buttons {
    flex-direction: column;
  }
}
</style>