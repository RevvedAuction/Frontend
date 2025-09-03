<template>
  <div class="auction-form-page">
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

    <!-- Individual Registration Form -->
    <section class="auction-form-section">
      <div class="auction-form-container">
        <h2>Register Individual</h2>
        <p class="form-description">Fill in the details to register a new individual for the auction</p>

        <form @submit.prevent="submitForm" class="individual-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input id="firstName" v-model="individual.firstName" type="text" placeholder="John"/>
              <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input id="lastName" v-model="individual.lastName" type="text" placeholder="Doe"/>
              <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
            </div>

            <div class="form-group">
              <label for="emailAddress">Email Address</label>
              <input id="emailAddress" v-model="individual.emailAddress" type="email" placeholder="john.doe@email.com"/>
              <span v-if="errors.emailAddress" class="error">{{ errors.emailAddress }}</span>
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input id="phoneNumber" v-model="individual.phoneNumber" type="text" placeholder="+27 600 000 000"/>
              <span v-if="errors.phoneNumber" class="error">{{ errors.phoneNumber }}</span>
            </div>

            <div class="form-group">
              <label for="dateOfBirth">Date of Birth</label>
              <input id="dateOfBirth" v-model="individual.dateOfBirth" type="date"/>
              <span v-if="errors.dateOfBirth" class="error">{{ errors.dateOfBirth }}</span>
            </div>

            <div class="form-group">
              <label for="identityNumber">Identity Number</label>
              <input id="identityNumber" v-model="individual.identityNumber" type="text" placeholder="8001015009087"/>
              <span v-if="errors.identityNumber" class="error">{{ errors.identityNumber }}</span>
            </div>

            <div class="form-group full-width">
              <label for="homeAddress">Home Address</label>
              <textarea id="homeAddress" v-model="individual.homeAddress" rows="3" placeholder="123 Main Street, Cape Town"></textarea>
              <span v-if="errors.homeAddress" class="error">{{ errors.homeAddress }}</span>
            </div>
          </div>

          <button type="submit" class="submit-btn">Submit</button>
        </form>

        <div v-if="submitted" class="confirmation">
          ✅ Individual submitted successfully!
        </div>
        <div v-if="serverError" class="error server-error">{{ serverError }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import individualService from "@/services/IndividualService";

export default {
  name: "IndividualForm",
  data() {
    return {
      individual: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        dateOfBirth: "",
        identityNumber: "",
        phoneNumber: "",
        homeAddress: "",
      },
      errors: {},
      submitted: false,
      serverError: null,
    };
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    validate() {
      this.errors = {};
      if (!this.individual.firstName) this.errors.firstName = "First name is required";
      if (!this.individual.lastName) this.errors.lastName = "Last name is required";
      if (!this.individual.emailAddress) this.errors.emailAddress = "Email is required";
      if (!this.individual.phoneNumber) this.errors.phoneNumber = "Phone number is required";
      if (!this.individual.dateOfBirth) this.errors.dateOfBirth = "Date of birth is required";
      if (!this.individual.identityNumber) this.errors.identityNumber = "Identity number is required";
      if (!this.individual.homeAddress) this.errors.homeAddress = "Home address is required";

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validate()) return;

      try {
        const response = await individualService.create(this.individual);
        console.log("Submitted individual:", response.data);
        this.submitted = true;
        this.serverError = null;
        this.resetForm();
        setTimeout(() => (this.submitted = false), 4000);
      } catch (err) {
        console.error(err);
        this.serverError = "Failed to submit individual. Please try again.";
      }
    },
    resetForm() {
      this.individual = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        dateOfBirth: "",
        identityNumber: "",
        phoneNumber: "",
        homeAddress: "",
      };
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.auction-form-page {
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

.auction-form-section {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.auction-form-container {
  background: rgba(30,30,30,0.7);
  backdrop-filter: blur(10px);
  padding: 30px 35px;
  border-radius: 25px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.6);
  max-width: 700px;
  width: 100%;
  transition: transform 0.3s;
}

.auction-form-container:hover {
  transform: translateY(-3px);
}

.auction-form-container h2 {
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

.individual-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #b99976;
}

input, textarea {
  padding: 12px 14px;
  border-radius: 12px;
  border: none;
  outline: none;
  background: rgba(50,50,50,0.8);
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}

input::placeholder, textarea::placeholder {
  color: #aaa;
}

input:focus, textarea:focus {
  background: rgba(50,50,50,1);
  box-shadow: 0 0 8px #b99976;
}

.submit-btn {
  padding: 14px 0;
  border: none;
  border-radius: 15px;
  background: #b99976;
  color: #000;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 150px;
  margin: 0 auto;
}

.submit-btn:hover {
  background: #d4af7f;
  transform: scale(1.05);
}

.confirmation {
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  color: #2d3436;
  font-size: 16px;
}

.error {
  margin-top: 5px;
  color: #d63031;
  font-size: 13px;
}

.server-error {
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
}
</style>
