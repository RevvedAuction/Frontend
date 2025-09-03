<!-- 
author: Caitlin Malan
student: 230426271 
-->

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <div class="login-background">
    

    <div class="container" :class="{ active: isActive }" ref="container">

      <!-- Sign Up -->
      <div class="form-container sign-up">
        <form @submit.prevent="saveData" novalidate>
          <h1 class="form-title">Create Account</h1>

            <input type="text" placeholder="Username" v-model="user.userFullName" />
            <div v-if="signupErrors.username" class="error">{{ signupErrors.username }}</div>

            <input placeholder="Email" v-model="user.userEmail" />
            <div v-if="signupErrors.email" class="error">{{ signupErrors.email }}</div>

            <input :type="showSignupPassword ? 'text' : 'password'" placeholder="Password" v-model="user.userPassword" />
            <div v-if="signupErrors.password" class="error">{{ signupErrors.password }}</div>

          <i
            class="fa-solid fa-eye"
            :class="{ active: showSignupPassword }"
            @click="showSignupPassword = !showSignupPassword"
          ></i>
          <button class="sign-up-button" type="submit">Sign Up</button>
        </form>
      </div>

      <!-- Login -->
      <div class="form-container sign-in">
        <form @submit.prevent="loginUser">
          <h1 class="form-title">Login</h1>

          <input type="text" placeholder="Username" v-model="user.userFullName" />
          <div v-if="loginErrors.username" class="error">{{ loginErrors.username }}</div>

          <input :type="showLoginPassword ? 'text' : 'password'" placeholder="Password" v-model="loginPassword" />
          <div v-if="loginErrors.password" class="error">{{ loginErrors.password }}</div>

          <i
            class="fa-solid fa-eye"
            :class="{ active: showLoginPassword }"
            @click="showLoginPassword = !showLoginPassword"
          ></i>
          <a href="#">Forget Your Password?</a>
          <button class="sign-in-button" type="submit">Login</button>
        </form>
      </div>

      <!-- Toggle panels -->
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <div class="home-button-left">
              <a href="http://localhost:8081/welcome">REVVED AUCTION</a>
            </div>
            <h1 class="toggle-title">Hey, New Comer!</h1>
            <p>Welcome to Revved Auction. The place where you can find your dream car!</p>
            <span>Already a member? Please login:</span>
            <button class="sign-in-button" type="button" @click="toggleActive">Login</button>
          </div>
          <div class="toggle-panel toggle-right">
            <div class="home-button-right">
              <a href="http://localhost:8081/welcome">REVVED AUCTION</a>
            </div>
            <h1 class="toggle-title">Welcome Back!</h1>
            <p>So glad to have you back. We have cars to auction and more features for you!</p>
            <span>Are you new? Please create an account:</span>
            <button class="sign-up-button" type="button" @click="toggleActive">Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import AccountValidations from "../services/AccountValidations.js";

export default {
  name: "AccountSetUpPage",
  data() {
    return {
      isActive: false,
      showSignupPassword: false,
      showLoginPassword: false,
      loginUsername: '',
      loginPassword: '',
      signupErrors: {},
      loginErrors: {},
      user: {
        userID: '',
        userType: 'USER',
        userFullName: '',
        userEmail: '',
        userPassword: ''
      }
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
      this.signupErrors = {};
      this.loginErrors = {};
    },

    // Validate signup credentials

    // validateSignup() {
    //   const validator = new AccountValidations(
    //     {
    //     username: this.user.userFullName, 
    //     email: this.user.userEmail, 
    //     password: this.user.userPassword
    //   });
    //   this.signupErrors = validator.checkValidations();
    //   if( Object.keys(this.signupErrors).length === 0) return;
    // },

    saveData() {
        const validator = new AccountValidations({
          username: this.user.userFullName,
          email: this.user.userEmail,
          password: this.user.userPassword
        });
        this.signupErrors = validator.checkValidations();

        if (Object.keys(this.signupErrors).length !== 0) return;

        axios
          .post("http://localhost:8080/api/user/register", this.user)
          .then(() => {
            alert("Registered Successfully!");
            this.toggleActive();
          })
          .catch(err => {
            console.error(err);
            this.signupErrors.email = 'Invalid email';
          });
    },

    // Validate login credentials
    validateLogin() {
      const validator = new AccountValidations(
        {
          username: this.loginUsername,
          password: this.loginPassword
        }
      );
      this.loginErrors = validator.checkValidations();
      return Object.keys(this.loginErrors).length === 0;
    },

    loginUser() {
      if (!this.validateLogin()) return;
      
      axios
        .post("http://localhost:8080/api/user/login", {
          username: this.loginUsername,
          password: this.loginPassword
        })
        .then(() => {
          alert("Login successful!");
          this.$router.push( '/product' );
        })
        .catch(err => {
          console.error(err);
          this.loginErrors.password = 'Invalid username or password';
        });
    }
  }
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

*{
    color:#ffffff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.login-top-bar {
  width: 100%;
  background-color: #000000;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
}

.login-background {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
}

.container {
    background-color: #000000;
    border-radius: 30px;
  width: 100%;
  height: 100%;
  max-width: none;
  min-height: 100vh;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
}

.container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #ffffff;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: #b99976;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}



.container form{
     background: 
    linear-gradient(#b99976, #000000);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container .form-title{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
}

.container input{
    background-color: #eee;
    color: #000000;
    border: none;
    margin: 10px 5px;
    padding: 15px 15px;
    font-size: 16px;
    border-radius: 8px;
    width: 350px;
    outline: none;
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

}

.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}


.container.active .sign-in{
    transform: translateX(100%);
}

.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.sign-in-button{
    background-color: #b99976;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.sign-in-button:hover {
    background-color: #000000;
    color: #b99976;
    border-color: #b99976;
}

.sign-up-button{
    background-color: #b99976;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.sign-up-button:hover {
    background-color: #000000;
    color: #b99976;
    border-color: #b99976;
}

.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}

.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 0 0 0 0;
    z-index: 1000;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 0 0 0;
}

.toggle{
    background-color: #b99976;
    height: 100%;
    background: 
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('@/assets/sign_up_sign_in.jpg');
    background-size: cover;
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-title{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.toggle-left .home-button-left {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 9999;
    padding: 8px 12px;
}

.home-button-left a {
    font-family: 'Bodoni Moda SC', serif;
    color: #b99976;
    font-size: 2.5rem;
    margin: 0;
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
}

.home-button-left a:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 3px;
    background-color: #b99976;
    transition: width 0.3s ease;
}

.home-button-left a:hover::after {
    width: 100%;
}

.toggle-left p{
    font-size: 20px;
    margin-bottom: 60px;
}

.toggle-left span{
    font-size: 15px;
    margin-bottom: 10px;
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right .toggle-title{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.toggle-right .home-button-right {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9999;
    padding: 8px 12px;
}

.home-button-right a {
    font-family: 'Bodoni Moda SC', serif;
    color: #b99976;
    font-size: 2.5rem;
    margin: 0;
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
}

.home-button-right a:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 3px;
    background-color: #b99976;
    transition: width 0.3s ease;
}

.home-button-right a:hover::after {
    width: 100%;
}

.toggle-right p{
    font-size: 20px;
    margin-bottom: 60px;
}

.toggle-right span{
    font-size: 15px;
    margin-bottom: 10px;
}

.container.active .toggle-right{
    transform: translateX(200%);
}

.error{
    color: #b5b7bb;
    font-size: 16px;
    margin-top: 5px;
}

.error-message {
    background-color: #bb9999;
    color: #000000;
    font-size: 20px;
    border: rgb(231, 47, 47) solid 1px;
    margin: 10px 10px;
    padding: 14px;
    border-radius: 4px;
    
}

.fa-solid.fa-eye {
    font-size: 20px;
    border: #ffffff solid 1px;
    margin: 10px 10px;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #ffffff;
}

.fa-solid.fa-eye:hover {
    color: #b99976; 
    background-color: #ffffff;
    transform: scale(1.1); 
}

.fa-solid.fa-eye.active {
    color: #b99976;
    background-color: #ffffff;
    transform: scale(1.1);
}

</style>
