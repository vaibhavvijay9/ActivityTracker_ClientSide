<template>
  <div class="h-screen p-5">
    
    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="shadow-2xl pt-5 px-8 m-2 mt-12 text-center bg-white md:w-1/4 md:mx-auto">
      <div v-if="status" class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 m-1" role="alert">
        <p>{{status}}</p>
      </div>

      <p class="text-2xl font-medium">SignUp</p>
      <form @submit="signUp">
      <div class="">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="User Name" v-model="username" required>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="password" placeholder="Password" v-model="password" required>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-1 mt-3">
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Name" v-model="name" required>
        </div>
        <button class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 my-6 rounded-full">Create Account</button>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'signUp',
  data:  function(){
    return{
      username: "",
      password: "",
      name: "",
      status: ""
    }},
  methods:{
    signUp: function () {
      this.$http.post('http://localhost:8083/ActivityTracker_ServerSide/api/user/signUp', {
                    username: this.username,
                    password: this.password,
	                  name: this.name
                })
      .then(response => {
        // 0 - Failed,  1 - Success,  2 - Success, but user already exists
        if(response.data == 0){
            this.status =  "SignUp failed!!"
        }
        if(response.data == 1){
            this.status =  "Account created!! Please login"
        }
        if(response.data == 2){
            this.status =  "Username already exists!!"
        }
        this.username = this.password = this.name = "";
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>
