<template>
  <div class="h-screen p-5">
    
    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="shadow-2xl py-5 px-8 pb-12 m-2 mt-12 text-center bg-white md:w-1/4 md:mx-auto">
      <div v-if="loading">
          <Loader></Loader>
      </div>
      
      <div v-if="message" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 m-1" role="alert">
        <p>{{message}}</p>
      </div>
      
      <p class="text-2xl font-medium">Login</p>
      <form @submit.prevent="login">
      <div class="">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="User Name" v-model="username" required>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="password" placeholder="Password" v-model="password" required>
        </div>
        <!-- <p><a href="#" class="float-left py-4 text-sm text-blue-600">Forgot your password?</a></p> -->
        <input type="submit" value="LOGIN" class="w-56 bg-blue-500 hover:bg-blue-700 text-white mt-4 py-1 px-4 rounded-full">
        <p class="pt-4 text-sm">Don't have account?  <router-link class="text-blue-600" to="/signUp">Sign Up</router-link></p>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  name: 'login',
  components: {
    Loader
  },
  data:  function(){
    return{
      username: "",
      password: "",
      message: "",
      loading: false
    }},
  methods:{
    login: function () {
      this.loading = true;
      this.message= ""
      const url = process.env.VUE_APP_BASE_URL + '/user/login';
      
      const data = {
        username: this.username,
        password: this.password
      }
      this.$http.post(url, data)
      .then(response => {
        if(response.data.message !== 'failure')
        {
          this.loading = false;
          localStorage.setItem("authTokenActivityTracker", response.data.token);
          this.username = this.password = ""
          
          // all ways works
          //this.$router.push('home')
           this.$router.push({path: '/home'});
          //this.$router.push({name:"home"}) 
        }
        else{
          this.loading = false;
          this.message = "Wrong username or password!!"
        }
      })
      .catch(function (error) {
          this.loading = false;
          console.log(error);
      });
    }
  }
}
</script>