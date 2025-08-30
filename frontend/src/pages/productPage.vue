<template>
  <div class="product-page">
    <div class="overlay">

      <!-- 🔹 Top Navigation Bar -->
      <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
        </header>

        <nav class="nav-menu">
          <ul>
            <li><a @click.prevent="goTo('product')">PRODUCTS</a></li>
            <li><a @click.prevent="goTo('session')">AUCTION</a></li>
            <li>CONTACT</li>
            <li><a @click.prevent="goTo('account-setup')">LOGIN</a></li>
          </ul>
        </nav>
      </div>

      <!-- 🔹 Product Section -->
      <section class="products">
        <h2>Available Cars for Auction</h2>

        <!-- Loading -->
        <div v-if="loading" class="loading">
          ⏳ Loading cars...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-message">
          ⚠️ {{ error }}
        </div>

        <!-- Empty -->
        <div v-else-if="cars.length === 0" class="empty-message">
          🚗 No cars currently available for auction
        </div>

        <!-- Car List -->
        <div class="car-list" v-else>
          <div v-for="car in cars" :key="car.carVIN" class="car-card">
            <img :src="car.media" alt="Car Image" class="car-image" />
            <h3>{{ car.carMake }} {{ car.carModel }} ({{ car.carYear }})</h3>
            <p>Mileage: {{ car.carMileage.toLocaleString() }} km</p>
            <p>Status: {{ car.carStatus }}</p>
            <p class="countdown">
              Time left: {{ formatCountdown(car.remainingTime) }}
            </p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductPage",
  data() {
    return {
      cars: [],
      timer: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    async fetchCars() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get("http://localhost:8080/api/cars/active");
        this.cars = res.data.map((car) => ({
          ...car,
          remainingTime: new Date(car.auctionEndTime) - new Date(),
        }));
      } catch (err) {
        console.error("Error fetching cars:", err);
        this.error = "Could not load cars. Please try again later.";
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
    formatCountdown(ms) {
      if (ms <= 0) return "Auction Ended";
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    },
  },
  mounted() {
    this.fetchCars();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* ✅ Clean & modest styling */

.overlay {
  background: rgba(0, 0, 0, 0.6);
  min-height: 100vh;
  padding: 20px;
  color: #fff;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header h1 {
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: #ffcc00;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-menu li {
  cursor: pointer;
}

.products {
  text-align: center;
  margin-top: 20px;
}

.loading, .error-message, .empty-message {
  margin-top: 20px;
  font-size: 1.2rem;
}

.error-message {
  color: #ff6666;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.car-card {
  background: #1c1c1c;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 12px rgba(0,0,0,0.4);
}

.car-image {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.countdown {
  font-weight: bold;
  color: #ffcc00;
}
</style>
