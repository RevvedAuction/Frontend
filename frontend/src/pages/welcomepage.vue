<template>
  <div class="home-page">
    <div class="overlay">

      <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REV AUCTION</h1>
        </header>

        <nav class="nav-menu">
            <ul>
                <li>HOME</li>
                <li>AUCTION</li>
                <li>CONTACT</li>
                 <li>LOGIN</li>
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