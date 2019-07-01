<template>
  <div class="h-screen p-5">

    <div class="text-3xl text-white mb-5 font-medium">Activity Tracker</div>
    
    <div class="activity-card shadow-2xl text-center bg-gray-200 m-2 md:w-1/4 md:w-1/4 md:mx-auto relative">
      
      <div class="bg-blue-500 rounded-b-lg p-1 text-white">
        <div class="flex justify-between items-center text-xl px-2 h-8">
          <span>Hi {{name}}</span>
          <i class="material-icons cursor-pointer">power_settings_new</i>
        </div>
        <div class="flex justify-around items-center h-10">
          <router-link class="text-sm cursor-pointer" to="/home/yesterday">Yesterday</router-link>
          <router-link class="text-sm cursor-pointer" to="/home/today">Today</router-link>
          <router-link class="text-sm cursor-pointer" to="/home/tomorrow">Tomorrow</router-link>
        </div>
      </div>
      
      <router-view></router-view>
      
      <div class="absolute bottom-0 mb-16 ml-16">
        <button class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full" @click="modalOpen = true">Add New Task</button>
      </div>

      <div class="bg-white rounded-t-lg flex justify-around items-center h-12 absolute bottom-0 left-0 right-0">
        <router-link class="text-sm cursor-pointer" to="/home/day">Day</router-link>
        <router-link class="text-sm cursor-pointer" to="/home/week">Week</router-link>
        <router-link class="text-sm cursor-pointer" to="/home/month">Month</router-link>
      </div>

    </div>  
      
      <!-- Add Task pop-up START-->
      <div v-if="modalOpen" class="fixed inset-0 invisible opacity-0 openPopUp">
        <div class="mx-auto my-48 bg-white rounded w-3/4 md:w-1/5 relative shadow-2xl">
          <div class="bg-blue-500 rounded-b-lg p-1 text-white">
            <div class="flex items-center justify-between text-xl px-2 h-10">
              <span>New Task</span>
              <i class="material-icons cursor-pointer" @click="modalOpen = false">close</i>
            </div>
          </div>
          <div class="mt-4 p-2 flex justify-center">
              <form name="myForm">
                  <div class="flex items-center mt-3 py-1">
                    <i class="material-icons">text_format</i>
                    <input name="newEventText" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Add your task">
                  </div>
                  <div class="flex items-center mt-3 py-1 ">
                    <i class="material-icons">date_range</i>
                    <input name="newEventText" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none" type="date">
                  </div>
                  <button class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 mt-4 rounded-full" @click="modalOpen = false">Add New Task</button>
                  <!-- <input ng-disabled="!newEventText" id="popup-add-button" class="w-2/5 self-center mt-4 md:w-auto flex-shrink-0 text-sm border-4 text-white py-1 px-4 rounded" type="submit" value="Add"> -->
              </form>
          </div>
        </div>
      </div>
      <!-- Add Task pop-up END-->
  </div>

</template>
<script>
export default {
  name: 'home',
  data:  function(){
    return{
      modalOpen: false,
      name: ""
    }}
    ,
  mounted() {
      const url = 'http://localhost:8083/ActivityTracker_ServerSide/api/user/getuser';
      const auth = {
        headers: {authToken:"dmFpYmhhdkBnbWFpbC5jb20yMDE5MDYyOTEzMjQzNw=="} 
      }
      this.$http.get(url,auth)
      .then(response => {
        this.name = response.data.name.split(" ")[0]
      })
      .catch(function (error) {
          console.log(error);
      });
  }
}
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

