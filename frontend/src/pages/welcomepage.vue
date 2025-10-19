<template>
  <div class="home-page">
    <div class="overlay">

      <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
        </header>

        <nav class="nav-menu">
            <ul>
            <li><router-link to="/product">AUCTION</router-link></li>
            <li><router-link to="/contact-support">CONTACT</router-link></li>
            <li><router-link to="/account-setup">LOGIN</router-link></li>
            <li><router-link to="/works">HOW IT WORKS</router-link></li>

            </ul>
        </nav>
      </div>

      <section class="home-hero">
  <div class="hero-overlay">
    <h1>Welcome to <span>Revved Auctions</span></h1>
    <p>Your next ride is just a bid away — browse, bid, and drive home the car of your dreams.</p>
    <a href="/product" class="btn-hero">Browse Cars</a>
  </div>
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
