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
                <li><a href="http://localhost:8081/contact-support">CONTACT</a></li>
                 <li><a href="http://localhost:8081/account-setup">LOGIN</a></li>
                 <!-- <li><a href="http://localhost:8081/auction-history">AUCTION HISTORY</a></li> -->
                <li><a href="http://localhost:8081/individual-form">INDIVIDUAL FORM</a></li>

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
