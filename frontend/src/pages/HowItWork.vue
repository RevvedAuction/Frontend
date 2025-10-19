<template>
  <div class="how-it-works-container">
    <h1>How It Works</h1>
    <p class="intro">
      From dream to driveway in just a few simple steps.
    </p>

    <div class="steps">
      <div class="step-card" v-for="(step, index) in steps" :key="index">
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>

    <div class="contact-button-container">
      <router-link to="/contact-support" class="contact-button">Contact Us for More Information</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowItWork",
  data() {
    return {
      steps: [
        {
          title: "1. Register or Log In",
          description:
            "Create an account to get started or log in if you already have one.",
        },
        {
          title: "2. Browse Cars",
          description:
            "Browse through our collection of luxury vehicle",
        },
        {
          title: "3. Bid",
          description:
            "Bid on your favorite cars during live auction",
        },
        {
          title: "4. Win & Drive",
          description:
            "Win the auction,complete payment and we'll deliver your dream car to your doorstep.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.how-it-works-container {
  padding: 3rem;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  font-family: 'Arial', Helvetica, sans-serif;
}

h1 {
  text-align: center;
  color: #b99976;
  font-family: 'Bodoni Moda SC', serif;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.intro {
  text-align: center;
  color: #e0c8a0;
  margin-bottom: 2.5rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step-card {
  background: rgba(30, 30, 30, 0.85);
  border: 1px solid rgba(185, 153, 118, 0.5);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  color: #e0c8a0;
  transition: all 0.3s ease;
}

.step-card:hover {
  box-shadow: 0 6px 15px rgba(185, 153, 118, 0.5);
  transform: translateY(-3px);
}

.step-card h3 {
  color: #b99976;
  margin-bottom: 0.5rem;
}

/* Added button styles */
.contact-button-container {
  text-align: center;
  margin-top: 3rem;
}

.contact-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #b99976;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.contact-button:hover {
  background-color: #d4b483;
  transform: scale(1.05);
}
</style>