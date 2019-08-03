<template>
  <div class="h-screen p-5">
    
    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="shadow-2xl pt-5 px-8 m-2 mt-12 text-center bg-white md:w-1/4 md:mx-auto">
      <div v-if="loading">
          <Loader></Loader>
      </div>
      
      <div v-if="signUpMessage" class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 m-1" role="alert">
        <p>{{signUpMessage}}</p>
      </div>

      <p class="text-2xl font-medium">SignUp</p>
      <form @submit.prevent="signUp">
      <div class="">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="User Name" v-model="signUpForm.username" required pattern="[a-zA-Z0-9]+" title="Only digits and alphabets are allowed.">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="password" placeholder="Password" v-model="signUpForm.password" required>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Name" v-model="signUpForm.name" required>
        </div>
        <button class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 my-4 rounded-full">Create Account</button>
        <p class="pb-2 text-left"><router-link class="text-blue-600" to="/">Login</router-link></p>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  name: 'signUp',
  components: {
    Loader
  },
  data:  function(){
    return{
      signUpForm: { 
        username: "",
        password: "",
        name: ""
      },
      signUpMessage: "",
      loading: false
    }},
  methods:{
    signUp: function () {
      this.loading = true;
      const url = process.env.VUE_APP_BASE_URL + '/user/signUp';

      this.signUpForm.username = this.signUpForm.username.toLowerCase();
      this.signUpForm.name = this.titleCase(this.signUpForm.name);      
      
      const data = this.signUpForm;

      this.$http.post(url, data)
      .then(response => {
        this.loading = false;
        // 0 - Failed,  1 - Success,  2 - Success, but user already exists
        if(response.data == 0){
            this.signUpMessage =  "SignUp failed!!"
        }
        if(response.data == 1){
            this.signUpMessage =  "Account created!! Please login"
        }
        if(response.data == 2){
            this.signUpMessage =  "Username already exists!!"
        }
        this.signUpForm.username = this.signUpForm.password = this.signUpForm.name = "";
      })
      .catch(function (error) {
          this.loading = false;
          console.log(error);
      });
    },
    titleCase: function(str) {
      return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    }
  }
}
</script>
