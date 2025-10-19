<template>
  <div class="admin-dashboard">
  
    <div class="top-bar">
      <header class="header">
        <h1 @click="goTo('home')">REVVED AUCTION</h1>
      </header>
      <nav class="nav-menu">
        <ul>
            <li><router-link to="/product">AUCTION</router-link></li>
            <li><router-link to="/contact-support">CONTACT</router-link></li>
            <li><router-link to="/account-setup">LOGIN</router-link></li>
        </ul>
      </nav>
    </div>

    <!-- Dashboard Section -->
    <section class="dashboard-section">
      <div class="dashboard-container">
        <h2>Admin Dashboard</h2>
        <p class="form-description">Manage administrative features and accounts</p>

        <div class="card-container">
          <div class="card" @click="goTo('/admin-management')">
            <h2>Admin Management</h2>
            <p>Manage admin accounts</p>
          </div>
          <div class="card" @click="goTo('/car-management')">
            <h2>Car Management</h2>
            <p>Manage auction car</p>
          </div>
          <div class="card" @click="goTo('/bid-management')">
            <h2>Bid Management</h2>
            <p>Manage user bids</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.admin-dashboard {
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  padding: 20px;
}

/* Top Bar */
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

/* Dashboard Section */
.dashboard-section {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.dashboard-container {
  background: rgba(30,30,30,0.7);
  backdrop-filter: blur(10px);
  padding: 30px 35px;
  border-radius: 25px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.6);
  max-width: 800px;
  width: 100%;
  transition: transform 0.3s;
}

.dashboard-container:hover {
  transform: translateY(-3px);
}

.dashboard-container h2 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 5px;
  color: #b99976;
}

.form-description {
  text-align: center;
  font-size: 14px;
  color: #d4af7f;
  margin-bottom: 25px;
}

/* Cards */
.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.card {
  background: rgba(50,50,50,0.8);
  padding: 1.5rem;
  border-radius: 15px;
  width: 250px;
  height: 150px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 20px rgba(0,0,0,0.6);
  text-align: center;
}

.card:hover {
  background: rgba(50,50,50,1);
  transform: scale(1.05);
  box-shadow: 0 0 12px #b99976;
}

.card h2 {
  color: #b99976;
  margin-bottom: 0.5rem;
  font-size: 20px;
}

.card p {
  color: #d4af7f;
  font-size: 14px;
}
</style>
