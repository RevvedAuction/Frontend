<template>
  <div class="individual-form-page">
    <h2>Register Individual</h2>

    <form @submit.prevent="submitForm" class="individual-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="individual.firstName" type="text" required />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model="individual.lastName" type="text" required />
      </div>

      <div class="form-group">
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" v-model="individual.emailAddress" type="email" required />
      </div>

      <div class="form-group">
        <label for="dateOfBirth">Date of Birth</label>
        <input id="dateOfBirth" v-model="individual.dateOfBirth" type="date" required />
      </div>

      <div class="form-group">
        <label for="identityNumber">Identity Number</label>
        <input id="identityNumber" v-model="individual.identityNumber" type="text" required />
      </div>

      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input id="phoneNumber" v-model="individual.phoneNumber" type="text" required />
      </div>

      <div class="form-group">
        <label for="homeAddress">Home Address</label>
        <textarea id="homeAddress" v-model="individual.homeAddress" rows="3" required></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>

    <div v-if="submitted" class="confirmation">
      ✅ Individual submitted successfully!
    </div>
  </div>
</template>

<script>
export default {
  name: "IndividualForm",
  data() {
    return {
      individual: {
        individualId: null,
        firstName: "",
        lastName: "",
        emailAddress: "",
        dateOfBirth: "",
        identityNumber: "",
        phoneNumber: "",
        homeAddress: "",
      },
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      console.log("Submitted individual:", this.individual);

      // Here you can send `this.individual` to your backend API
      // axios.post('/api/individual', this.individual)...

      this.submitted = true;
    },
  },
};
</script>

<style scoped>
.individual-form-page {
  font-family: 'Montserrat', sans-serif;
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background: #f8f9fb;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #216D96;
}

.individual-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
}

input, textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b2bec3;
  font-size: 14px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: #fd79a8;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #e84393;
}

.confirmation {
  margin-top: 15px;
  text-align: center;
  color: #2d3436;
  font-weight: 600;
}
</style>
