<template>
  <div class="h-screen p-5">
    
    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="shadow-2xl py-5 px-8 pb-12 m-2 mt-12 text-center bg-white md:w-1/4 md:mx-auto">
      <p class="text-2xl font-medium">Login</p>
      <form @submit="login">
      <div class="">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="User Name" v-model="username">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="password" placeholder="Password" v-model="password">
        </div>
        <p><a href="#" class="float-left py-4 text-sm text-blue-600">Forgot your password?</a></p>
        <input type="submit" value="LOGIN" class="w-56 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full">
        <p class="pt-4 text-sm">Don't have account?  <a href="#" class="text-blue-600">Sign up</a></p>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data:  function(){
    return{
      username: "",
      password: ""
    }},
  methods:{
    login: function (e) {
      const url = 'http://localhost:8083/ActivityTracker_ServerSide/api/user/login';
      const data = {
        username:this.username,
        password:this.password
      }
      const auth = {
        headers: {authToken:"dmFpYmhhdkBnbWFpbC5jb20yMDE5MDYyOTEzMjQzNw=="} // dummy value from db for testing
      }
      this.$http.post(url, data,auth)
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
}
}
</script>
