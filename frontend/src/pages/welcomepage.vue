<template>
  <div class="home-page">
    <div class="overlay">

      <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
        </header>

        <nav class="nav-menu">
            <ul>
                <li><a href="http://localhost:8081/product">PRODUCTS</a></li>
                <li><a href="http://localhost:8081/session">AUCTION</a></li>
                <li><a href="http://localhost:8081/contact-support">CONTACT</a></li>
                 <li><a href="http://localhost:8081/account-setup">LOGIN</a></li>
                 <!-- <li><a href="http://localhost:8081/auction-history">AUCTION HISTORY</a></li> -->
                <!-- <li><a href="http://localhost:8081/individual-form">INDIVIDUAL FORM</a></li> -->

            </ul>
        </nav>
      </div>

      <section class="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li> Verified Sellers & Bidders</li>
          <li> Real-time Bidding</li>
          <li> Secure Transactions</li>
          <li> Nationwide Pickup & Delivery</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcomePage',
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    }
  }
}
</script>
