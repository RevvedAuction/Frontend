<template>
  <div class="payment-page">
    <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
        </header>

        <nav class="nav-menu">
            <ul>
                <li><a href="http://localhost:8080/product">PRODUCTS</a></li>
                <li><a href="http://localhost:8080/session">AUCTION</a></li>
                <li>CONTACT</li>
                <li><a href="http://localhost:8080/account-setup">LOGIN</a></li>
            </ul>
        </nav>
      </div>
      
    <h2 class="section-title">Make a Payment</h2>

    <form @submit.prevent="submitPayment" class="payment-form">

      <!-- Amount -->
      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number" v-model.number="payment.amount" id="amount" required />
      </div>

      <!-- Payment Method -->
      <div class="form-group">
        <label for="paymentMethod">Payment Method</label>
        <select v-model="payment.paymentMethod" id="paymentMethod" required>
          <option disabled value="">Select method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <!-- Payment Date -->
      <div class="form-group">
        <label for="paymentDate">Payment Date</label>
        <input
          type="date"
          v-model="payment.paymentDate"
          id="paymentDate"
          required
        />
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="payment.status" id="status" required>
          <option disabled value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <!-- Billing Address & Card Details if Credit/Debit Card -->
      <div v-if="payment.paymentMethod === 'Credit Card' || payment.paymentMethod === 'Debit Card'" class="billing-section">
        <h3>Billing Address</h3>
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" v-model="payment.fullName" id="fullName" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="payment.email" id="email" required />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" v-model="payment.address" id="address" required />
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" v-model="payment.city" id="city" required />
        </div>
        <div class="form-group">
          <label for="state">State/Province</label>
          <input type="text" v-model="payment.state" id="state" required />
        </div>
        <div class="form-group">
          <label for="zip">Zip/Postal Code</label>
          <input type="text" v-model="payment.zip" id="zip" required />
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" v-model="payment.country" id="country" required />
        </div>
      </div>

      <!-- Card Details if Credit Card -->
      <div v-if="payment.paymentMethod === 'Credit Card'" class="card-details">
        <h4>Card Details</h4>
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input type="text" v-model="payment.cardNumber" id="cardNumber" required />
        </div>
        <div class="form-group">
          <label for="cardExpiry">Expiry Date</label>
          <input type="month" v-model="payment.cardExpiry" id="cardExpiry" required />
        </div>
        <div class="form-group">
          <label for="cardCVC">CVC</label>
          <input type="text" v-model="payment.cardCVC" id="cardCVC" required />
        </div>
      </div>

      <!-- PayPal Button -->
      <div v-if="payment.paymentMethod === 'PayPal'" class="paypal-section">
        <h4>PayPal Payment</h4>
        <button @click.prevent="payWithPayPal" class="paypal-btn">Pay with PayPal</button>
      </div>

      <!-- Submit Button -->
      <div v-if="payment.paymentMethod !== 'PayPal'" class="submit-section">
        <button type="submit" class="pay-btn">Pay Now</button>
      </div>
    </form>

    <!-- Feedback Message -->
    <div v-if="message" :class="{ success: success, error: !success }" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'PaymentPage',
  data() {
    return {
      payment: {
        amount: 0,
        paymentMethod: '',
        paymentDate: new Date().toISOString().substr(0, 10),
        status: 'Pending',
        buyerID: 1,
        auctionID: 1,
        isRefunded: false,
        processPay: false,
        // Billing address
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        // Card details
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
      },
      message: '',
      success: false,
    };
  },
  methods: {
    async submitPayment() {
      // Basic validation for Credit Card
      if (this.payment.paymentMethod === 'Credit Card') {
        if (
          !this.payment.cardNumber ||
          !this.payment.cardExpiry ||
          !this.payment.cardCVC
        ) {
          this.message = 'Please fill out all credit card details.';
          this.success = false;
          return;
        }
      }
      try {
        // const response = await axios.post('/api/payments', this.payment);
        this.message = 'Payment successful!';
        this.success = true;
      } catch (error) {
        console.error(error);
        this.message = 'Failed to process payment.';
        this.success = false;
      }
    },
    payWithPayPal() {
      alert('Redirecting to PayPal...');
      // Integrate PayPal SDK or redirect
    },
  },
};
</script>

<style scoped>
/* Reset and layout */
* {
  box-sizing: border-box;
  margin: 10;
  padding: 0;
}

.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #e0e0e0; /* Slight shade of grey */
  padding: 2em;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* Top bar styles */
.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #111, #333);
  padding: 1em 2em;
  border-bottom: 2px solid #007bff;


  margin-bottom: 1.5em;
  flex-wrap: wrap;
}

.header h1 {
  cursor: pointer;
  font-family: 'Bodoni Moda SC', serif;
  font-size: 1.8em;
  color: #fff;
  margin-bottom: 0.5em;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.nav-menu li {
  font-family: 'Bodoni Moda SC', serif;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-menu li:hover {
  color: #b99976;
  font-weight: bold;
}

.nav-menu li a {
  font-family: 'Bodoni Moda SC', serif;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  text-decoration: none;
}
.nav-menu li a:hover {
  color: #b99976;
  font-weight: bold;
}

/* Heading styles */
.section-title {
  text-align: center;
  margin-bottom: 1em;
  color: #333;
  font-weight: 600;
}

/* Form styles */
.payment-form {
  background: #fff;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em; /* Space between sections */
  transition: box-shadow 0.3s;
}
.payment-form:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* Form groups spacing */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

label {
  font-weight: 600;
  margin-bottom: 0.25em;
  color: #555;
}

input[type='text'],
input[type='email'],
input[type='month'],
input[type='number'],
input[type='date'] {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  transition: border-color 0.2s;
}
input[type='text']:focus,
input[type='email']:focus,
input[type='month']:focus,
input[type='number']:focus,
input[type='date']:focus {
  border-color: #007bff;
  outline: none;
}

/* Buttons styling */
.pay-btn,
.paypal-btn {
  width: 100%;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1em;
}
.pay-btn {
  background-color: #007bff;
  color: #fff;
}
.pay-btn:hover {
  background-color: #0056b3;
}
.paypal-btn {
  background-color: #ffc439;
  color: #222;
}
.paypal-btn:hover {
  background-color: #e0a828;
}

/* Sections styling */
.billing-section,
.card-details {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
}

/* Feedback message styles */
.message {
  margin-top: 1em;
  padding: 1em;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
}
.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>