<template>
  <div class="product-page">
    <h1>Available Cars for Auction</h1>

    <div v-if="cars.length === 0" class="empty-message">
      🚗 No cars currently available for auction
    </div>

    <div class="car-list">
      <div v-for="car in cars" :key="car.carVIN" class="car-card">
        <img
          :src="car.media"
          alt="Car Image"
          class="car-image"
        />
        <h2>{{ car.carMake }} {{ car.carModel }} ({{ car.carYear }})</h2>
        <p>Mileage: {{ car.carMileage.toLocaleString() }} km</p>
        <p>Status: {{ car.carStatus }}</p>
        <p class="countdown">
          Time left: {{ formatCountdown(car.remainingTime) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "productPage",
  data() {
    return {
      cars: [],
      timer: null
    };
  },
  methods: {
    async fetchCars() {
      try {
        const res = await axios.get("http://localhost:8080/api/cars/active");
        this.cars = res.data.map(car => ({
          ...car,
          remainingTime: new Date(car.auctionEndTime) - new Date()
        }));
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    },
    updateCountdown() {
      this.cars = this.cars.map(car => ({
        ...car,
        remainingTime: new Date(car.auctionEndTime) - new Date()
      }));
    },
    formatCountdown(ms) {
      if (ms <= 0) return "Auction Ended";
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  },
  mounted() {
    this.fetchCars();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>