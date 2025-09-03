<template>
  <div class="auction-history-page">
    <!-- Top Navigation -->
    <div class="top-bar">
      <header class="header">
        <h1 @click="goTo('home')">REVVED AUCTION</h1>
      </header>
      <nav class="nav-menu">
        <ul>
          <li><a href="/product">PRODUCTS</a></li>
          <li><a href="/session">AUCTION</a></li>
          <li>CONTACT</li>
          <li><a href="/account-setup">LOGIN</a></li>
        </ul>
      </nav>
    </div>

    <!-- Auction History Section -->
    <section class="auction-history-section">
      <div v-if="loading" class="loading">Loading auction details...</div>

      <div v-else-if="!auction || Object.keys(auction).length === 0" class="empty-message">
        🚗 Auction details not available
      </div>

      <div v-else class="auction-container">
        <h3>Auction History</h3>
        <table>
          <tbody>
            <tr><td>History ID</td><td>{{ auction.historyId }}</td></tr>
            <tr><td>Session ID</td><td>{{ auction.auctionSessionId }}</td></tr>
            <tr><td>Car VIN</td><td>{{ auction.carVIN }}</td></tr>
            <tr><td>User ID</td><td>{{ auction.userId }}</td></tr>
            <tr><td>Seller ID</td><td>{{ auction.sellerId }}</td></tr>
            <tr><td>Buyer ID</td><td>{{ auction.buyerId }}</td></tr>
            <tr><td>Final Price</td><td>R{{ (auction.finalPrice ?? 0).toLocaleString() }}</td></tr>
            <tr><td>Auction Date</td><td>{{ formatDate(auction.auctionDate) }}</td></tr>
            <tr><td>Status</td><td>{{ auction.status }}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AuctionHistory",
  data() {
    return {
      auction: {},
      loading: true,
    };
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    async fetchAuction() {
      const historyId = this.$route.params.historyId;

      try {
        // Example test data
        const data = {
          historyId: historyId || 1,
          auctionSessionId: "AS12345",
          carVIN: "1HGCM82633A004352",
          userId: "U1001",
          sellerId: "S2002",
          buyerId: "B3003",
          finalPrice: 350000,
          auctionDate: new Date(),
          status: "Closed",
        };

        this.auction = data;
      } catch (err) {
        console.error("Error fetching auction:", err);
        this.auction = {};
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "N/A";
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  mounted() {
    this.fetchAuction();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.auction-history-page {
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-weight: 800;
  font-size: 28px;
  color: #b99976;
  cursor: pointer;
  position: relative;
}

.header h1::after {
  content: "";
  position: absolute;
  width: 50%;
  height: 3px;
  background: #b99976;
  bottom: -5px;
  left: 25%;
  transition: width 0.3s;
}

.header h1:hover::after {
  width: 100%;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  gap: 25px;
}

.nav-menu a {
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #b99976;
}

.auction-history-section {
  display: flex;
  justify-content: center;
}

.auction-container {
  background: linear-gradient(135deg, #1a1a1a, #2b2b2b);
  padding: 25px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
  max-width: 700px;
  width: 100%;
}

.auction-container h3 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 25px;
  color: #b99976;
}

.auction-container table {
  width: 100%;
  border-collapse: collapse;
}

.auction-container td {
  padding: 12px 10px;
  border-bottom: 1px solid #444;
}

.auction-container td:first-child {
  font-weight: 600;
  color: #b99976;
}

.loading, .empty-message {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  color: #b99976;
}
</style>
