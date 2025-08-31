<!-- /pages/Admin.vue -->

<template>
  <div class="admin-dashboard">
    <h1 class="text-center mt-4">Admin Dashboard</h1>

    <div class="card-container">
      <div class="card" @click="goTo('/admin-management')">
        <h2>Admin Management</h2>
        <p>Manage admin accounts</p>
      </div>
      <div class="card" @click="goTo('/car-management')">
        <h2>Car Management</h2>
        <p>Manage auction cars</p>
      </div>
      <div class="card" @click="goTo('/bid-management')">
        <h2>Bid Management</h2>
        <p>Handle user bids</p>
      </div>
    </div>
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
.admin-dashboard {
  padding: 2rem;
  text-align: center;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.card {
  background-color: #f1f8ff;
  padding: 1.5rem;
  border-radius: 10px;
  width: 250px;
  height: 150px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card:hover {
  background-color: #e0efff;
  transform: translateY(-4px);
}

.card h2 {
  color: #1e90ff;
  margin-bottom: 0.5rem;
}
</style>
