<template>
  <div class="Car-page">
    <div class="overlay">
      <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
        </header>
        <nav class="nav-menu">
          <ul>
            <li><router-link to="/product">AUCTION</router-link></li>
            <li><router-link to="/contact-support">CONTACT</router-link></li>
            <li><router-link to="/account-setup">LOGIN</router-link></li>
          </ul>
        </nav>
      </div>

      <section class="product-listing">
        <h2>Available Cars for Auction</h2>
        <div v-if="loading" class="loading">Loading cars...</div>
        <div v-else-if="cars.length === 0" class="empty-message">
          No cars currently available for auction
        </div>
        <div class="car-grid">
          <div class="car-card" v-for="car in cars" :key="car.carVIN">
            <img
              :src="car.mediaBase64 ? car.mediaBase64 : placeholderImage"
              alt="Car Image"
              class="car-image"
            />

            <div class="car-details">
              <div class="car-title">{{ car.carModel }}</div>
              <p class="car-info-sub">{{ car.carYear }} {{ car.carMake }}, Mileage of {{ car.carMileage.toLocaleString() }}km</p>
              <p class="car-location">
                <i class="fas fa-map-marker-alt"> Cpt, sa </i>
                <span class="status">{{ car.carStatus }}</span>
              </p>
              <p class="car-info">Current Bid<strong class="bid"> R{{ car.currentBid?.toLocaleString() || '0' }}</strong></p>
              <hr class="styled-line" />
              <p class="car-info-time">Time left:</p>
              <p class="countdown" :class="{ 'ended': car.remainingTime <= 0 }">
                <span>
                  <div class="value">{{ Math.floor(car.remainingTime / (1000 * 3600 * 24)) }}</div>
                  <div class="label">Days</div>
                </span>
                <span>
                  <div class="value">{{ Math.floor((car.remainingTime / (1000 * 3600)) % 24) }}</div>
                  <div class="label">Hours</div>
                </span>
                <span>
                  <div class="value">{{ Math.floor((car.remainingTime / (1000 * 60)) % 60) }}</div>
                  <div class="label">Minutes</div>
                </span>
                <span>
                  <div class="value">{{ Math.floor((car.remainingTime / 1000) % 60) }}</div>
                  <div class="label">Seconds</div>
                </span>
              </p>

<<<<<<< HEAD
              <div class="car-actions">
                <button class="btn-bid" @click="placeBid(car)">Place Bid</button>
                <button class="btn-details" @click="$router.push({ name: 'cardetails', params: { vin: car.carVIN } })">
                  View Details
                </button>
              </div>
            </div>
          </div>
=======
    <!-- Buttons -->
    <div class="car-actions">
      <button class="btn-bid"><a class="btn-bid" href="http://localhost:8081/account-setup">Place Bid</a></button>
      <button class="btn-details"><a class="btn-details" href="http://localhost:8081/cardetails/1HGCM82633A123456 ">View Details</a></button>
    </div>
  </div>
</div>
>>>>>>> 2739d0b (Modified Account SetUp)
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CarService from "@/services/CarService";

export default {
  name: "productPage",
  data() {
    return {
      cars: [],
      loading: false,
      timer: null,
      placeholderImage: "https://via.placeholder.com/300x200?text=No+Image",
      user: null, 
    };
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },

    async fetchCars() {
      this.loading = true;
      try {
        const res = await CarService.getActiveCars();
        if (Array.isArray(res.data)) {
          this.cars = res.data.map((car) => {
            const auctionTime = new Date(car.auctionEndTime);
            return {
              ...car,
              mediaBase64: car.mediaBase64 || null,
              remainingTime: auctionTime - new Date(),
            };
          });
        } else {
          this.cars = [];
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
        this.cars = [];
      } finally {
        this.loading = false;
      }
    },

    updateCountdown() {
      this.cars = this.cars.map((car) => ({
        ...car,
        remainingTime: new Date(car.auctionEndTime) - new Date(),
      }));
    },

   placeBid(car) {
  if (!this.user) {
    this.$router.push("/account-setup");
    return;
  }
      const bidAmount = parseFloat(prompt("Enter your bid amount:", car.currentBid || 0));
      if (!bidAmount || bidAmount <= car.currentBid) {
        alert("Your bid must be higher than the current bid.");
        return;
      }

      car.currentBid = bidAmount;
      alert(`Bid of R${bidAmount.toLocaleString()} placed successfully!`);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")) || null;
    this.fetchCars();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },

};
</script>
