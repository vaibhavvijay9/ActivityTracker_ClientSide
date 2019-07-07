<template>
  <div class="h-screen p-5">

    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="activity-card shadow-2xl text-center bg-gray-200 m-2 md:w-1/4 md:w-1/4 md:mx-auto relative">
      
      <div class="bg-blue-500 rounded-b-lg p-1 text-white">
        <div class="flex justify-between items-center text-xl px-2 h-8">
          <span>Hi {{userFirstName}}</span>
          <i class="material-icons cursor-pointer" @click="logout">power_settings_new</i>
        </div>
        <div class="flex justify-around items-center h-10">
          <router-link class="text-sm cursor-pointer" to="/home/yesterday">Yesterday</router-link>
          <router-link class="text-sm cursor-pointer" to="/home/today">Today</router-link>
          <router-link class="text-sm cursor-pointer" to="/home/tomorrow">Tomorrow</router-link>
        </div>
      </div>
      
      <router-view></router-view>
      
      <div class="bg-white rounded-t-lg flex justify-around items-center h-12 absolute bottom-0 left-0 right-0">
        <router-link class="text-sm cursor-pointer" to="/home/week">Week</router-link>
        <router-link class="text-sm cursor-pointer" to="/home/month">Month</router-link>
        <router-link class="text-sm cursor-pointer" to="/home/all">All</router-link>
      </div>

    </div>  
  </div>

</template>
<script>
export default {
  name: 'home',
  data:  function(){
    return{
      userFirstName: "",
      token: ""
    }},
  mounted() {
      this.token = localStorage.getItem("authTokenActivityTracker"); 
      if(this.token == null){
        console.log("is null")
        this.$router.push({name:"login"})
      }
      else{
        console.log('not null')
      }
      const url = 'http://localhost:8083/ActivityTracker_ServerSide/api/user/getuser';
      const auth = {
        headers: {authToken: this.token} 
      }
      this.$http.get(url,auth)
      .then(response => {
        this.userFirstName = response.data.name.split(" ")[0]
      })
      .catch(function (error) {
          console.log(error);
      });
  },
  methods: {
    logout : function(){
      localStorage.removeItem("authTokenActivityTracker");
      this.$router.push({name:"login"})
    }
}}

</script>

<style>
.openPopUp{
  visibility: visible;
  opacity: 1;
}

.activity-card{
  height: 85vh;
}
</style>