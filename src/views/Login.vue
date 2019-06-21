<template>
  <div class="page-content">
    
    <div class="title">Activity Tracker</div>
    
    <div class="z-depth-5 login-card">
      <p class="login-title">Login</p>
      <form class="">
      <div class="">
        <div class="input-field">
          <!-- <i class="material-icons prefix">account_circle</i> -->
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">User Name</label>
        </div>
        <div class="input-field">
          <!-- <i class="material-icons prefix">phone</i> -->
          <input id="icon_telephone" type="tel" class="validate">
          <label for="icon_telephone">Password</label>
        </div>
        <p><a href="#" class="forgot-password-link">Forgot your password?</a></p>
        <a class="waves-effect waves-light btn z-depth-3 login-button">LOGIN</a>
        <p class="sign-up-link">Don't have account?  <a href="#">Sign up </a></p>
      </div>
    </form>
    </div>

  </div>
</template>

<style>
.page-content{
  background-image: url("../assets/background.png");
  height: 100vh;
  padding: 5%;
}

.title{
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 5%;
}

.login-card{
  text-align: center;
  background-color: white;
  padding: 5% 7%;
  margin: 2%;
}

.login-title{
  margin: 0 !important;
  font-size: 2rem;
  font-weight: 600;
}

.forgot-password-link{
  float: left;
  padding-bottom: 5%;
  font-size: 0.9rem;
}

.login-button{
  width: 250px;
  border-radius: 15px;
}

.sign-up-link{
  padding-top: 5%;
  margin-bottom: 0;
  font-size: 0.9rem;
}

@media screen and (min-width: 769px) {
    .page-content {
      display: grid;
      grid-template-columns: 30vw auto;
      grid-column-gap: 20vw;
    }

    .login-card{
      width: 350px;
      height: 60vh;
    }
}
</style>

