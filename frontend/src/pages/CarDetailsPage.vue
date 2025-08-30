<template>
  <div class="car-details-page">
    <div class="overlay">

      <!-- 🔹 Back button -->
      <button @click="$router.back()" class="back-btn">
        ← Back to Listings
      </button>

      <!-- Loading -->
      <div v-if="loading" class="status-message loading">
        ⏳ Loading car details...
      </div>

      <!-- Error -->
      <div v-else-if="error" class="status-message error-message">
        ⚠️ {{ error }}
      </div>

      <!-- Car Details -->
      <div v-else-if="car" class="car-card">
        <img 
          :src="car.media || '/placeholder-car.png'" 
          alt="Car Image" 
          class="car-image" 
        />

        <h2 class="car-title">{{ car.carMake }} {{ car.carModel }}</h2>
        <p class="car-year">Year: {{ car.carYear }}</p>
        <p class="car-mileage">Mileage: {{ car.carMileage.toLocaleString() }} km</p>
        <p class="car-status" :class="car.carStatus.toLowerCase()">
          Status: {{ car.carStatus }}
        </p>

        <p class="countdown">
          Auction ends in: <span class="highlight">{{ formatCountdown(car.remainingTime) }}</span>
        </p>
      </div>

      <!-- Empty fallback -->
      <div v-else class="status-message empty-message">
        🚗 Car details not available
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CarDetailsPage",
  data() {
    return {
      car: null,
      loading: false,
      error: null,
      timer: null,
    };
  },
  methods: {
    async fetchCar() {
      this.loading = true;
      this.error = null;
      const vin = this.$route.params.vin;

      try {
        const res = await axios.get(`http://localhost:8080/cars/read/${vin}`);
        this.car = {
          ...res.data,
          remainingTime: new Date(res.data.auctionEndTime) - new Date(),
        };
      } catch (err) {
        console.error("Error fetching car details:", err);
        this.error = "Could not load car details.";
      } finally {
        this.loading = false;
      }
    },

    updateCountdown() {
      if (this.car) {
        this.car.remainingTime =
          new Date(this.car.auctionEndTime) - new Date();
      }
    },

    formatCountdown(ms) {
      if (!ms || ms <= 0) return "Auction Ended";
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    },
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
/* =========================
   Overall Overlay
========================= */
.overlay {
  background: linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 100%);
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

/* =========================
   Back Button
========================= */
.back-btn {
  background: linear-gradient(90deg, #ffcc00, #ffaa00);
  color: #111;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.5);
  margin-bottom: 30px;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 204, 0, 0.7);
}

/* =========================
   Status Messages
========================= */
.status-message {
  font-size: 1.3rem;
  margin-top: 50px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.loading {
  color: #00ccff;
}

.error-message {
  color: #ff6666;
}

.empty-message {
  color: #999;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================
   Car Card
========================= */
.car-card {
  background: #222;
  padding: 25px;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8);
}

.car-image {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 2px solid #ffcc00;
}

/* =========================
   Car Info
========================= */
.car-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #ffcc00, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.car-year,
.car-mileage,
.car-status {
  font-size: 1.1rem;
  margin: 5px 0;
  font-weight: 500;
}

.car-status.available { color: #00cc66; }
.car-status.sold { color: #ff4444; }
.car-status.pending { color: #ffaa00; }

/* =========================
   Countdown
========================= */
.countdown {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 15px;
  color: #fff;
}

.highlight {
  color: #ffcc00;
  font-weight: bold;
}

/* =========================
   Responsive
========================= */
@media (max-width: 600px) {
  .car-card {
    padding: 20px;
    border-radius: 15px;
  }

  .car-title {
    font-size: 1.5rem;
  }

  .countdown {
    font-size: 1.1rem;
  }

  .back-btn {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}
</style>
