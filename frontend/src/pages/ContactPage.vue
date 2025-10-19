<template>
    <div class="top-bar">
        <header class="header">
          <h1 @click="goTo('home')">REVVED AUCTION</h1>
        </header>
    </div>

  <div class="contact-support">
    
    
    <h1>Contact Support</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="firstName" placeholder="Your Name" />
      <input type="email" v-model="email" placeholder="Your Email" />
      <textarea v-model="message" placeholder="How can we help?" rows="5"></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.contact-support {
    background: linear-gradient(#b99976, #000000);
  color: white;
  height: 100vh; 
  padding: 200px;
  margin: auto;

}
input, textarea, button {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  background: #2a2a2a;
  color: white;
  border: none;
  border-radius: 4px;
}
button {
  background-color: #b99976;
  color: #121212;
  cursor: pointer;
}
</style>
