<template>
<div>
    <div class="m-2 overflow-auto tasks-list">
        <div v-if="loading">
            <Loader></Loader>
        </div> 
        <p class="text-xs font-medium">You have <span class="text-blue-600">{{tasks.length}} task:</span></p>
        <div v-for="task of tasks" :key='task.id' class="bg-white m-2 p-2 rounded-lg text-left flex justify-between items-center">
            <label class="block">
                <input class="mr-2 leading-tight" type="checkbox" v-model=task.completed @click="updateTaskStatus(task)">
                <span v-bind:class="{ active: task.completed}" class="text-sm">{{task.taskDescription}}</span>
            </label>
            <span>
                <a @click="openEditModal(task)"><i class="material-icons cursor-pointer text-blue-600">edit</i></a>
                <a @click="deleteTask(task.taskId)"><i class="material-icons cursor-pointer text-blue-600">delete</i></a>
            </span>
        </div>
    </div>
    <div class="sticky">
        <button class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full" @click="modalOpen=true">Add New Task</button>
    </div>

    <!-- pop-up / Modal START-->
      <div v-if="modalOpen" class="fixed inset-0 invisible opacity-0 openPopUp">
        <div class="mx-auto my-48 bg-white rounded w-3/4 md:w-1/5 relative shadow-2xl">
          <div class="bg-blue-500 rounded-b-lg p-1 text-white">
            <div class="flex items-center justify-between text-xl px-2 h-10">
              <span v-if="addOperation">New Task</span>
              <span v-else>Update Task</span>
              <i class="material-icons cursor-pointer" @click="closeModal()">close</i>
            </div>
          </div>
          <div class="mt-4 p-2 flex justify-center">
              <form v-if="addOperation" @submit.prevent="addTask">
                  <div class="flex items-center mt-3 py-1">
                    <i class="material-icons">text_format</i>
                    <input type="text" v-model="taskForm.taskDescription" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none" placeholder="Add your task">
                  </div>
                  <div class="flex items-center mt-3 py-1 ">
                    <i class="material-icons">date_range</i>
                    <input type="date" v-model="taskForm.taskDate" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none">
                  </div>
                  <button type="submit" v-bind:disabled="taskForm.taskDescription === '' && taskForm.taskDate === ''" class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 mt-4 rounded-full" >Add New Task</button>
                  <!-- added type="submit" (type="button" will not work) to resolve the error : form submission canceled because the form is not connected -->
              </form>
              <form v-else @submit.prevent="updateTask">
                  <div class="flex items-center mt-3 py-1">
                    <i class="material-icons">text_format</i>
                    <input type="text" v-model="currentTask.taskDescription" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none" placeholder="Add your task">
                  </div>
                  <div class="flex items-center mt-3 py-1 ">
                    <i class="material-icons">date_range</i>
                    <input type="date" v-model="currentTask.taskDate" required class="border-b border-b-2 border-blue-500 md:w-3/4 appearance-none text-gray-700 ml-2 py-1 px-2 leading-tight focus:outline-none">
                  </div>
                  <button type="submit" v-bind:disabled="currentTask.taskDescription === '' && currentTask.taskDate === ''" class="w-48 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 mt-4 rounded-full" >Update Task</button>
                  <!-- added type="submit" (type="button" will not work) to resolve the error : form submission canceled because the form is not connected -->
              </form>
          </div>
        </div>
      </div>
      <!-- pop-up / Modal END-->
</div>
</template>

<style>
.tasks-list{
    height: 55vh;
}
.active{
    text-decoration: line-through !important;
}
</style>

<script>
import Loader from '../components/Loader.vue'

export default {
  name: 'Day',
  components: {
    Loader
  },
  data:  function(){
    return{
      modalOpen: false,
      addOperation: true,  
      tasks: [],
      taskForm : {
        taskDescription: "",
        taskDate: ""
      },
      currentTask: {},
      token: "",
      loading: false
    }},
  watch : {
      '$route.params.day': function(){
          this.getTasks()
  }},
    mounted(){
        if(localStorage.getItem("authTokenActivityTracker") == null){
            this.$router.push({name:"login"});
        }
        else{
            this.token = localStorage.getItem("authTokenActivityTracker")
        }
        this.getTasks()
    },
    methods: {
      openEditModal : function(curTask){
          this.modalOpen=true,
          this.addOperation = false,
          this.currentTask = curTask;
      },
      closeModal: function(){
          this.modalOpen=false,
          this.addOperation = true
      }, 
      getTasks : function(){
        this.loading = true;
        if(this.token == null){
            this.$router.push({name:"login"});
        }  
        const url = process.env.VUE_APP_BASE_URL + '/task/gettask/' + this.$route.params.day;
        const auth = {
            headers: {authToken: this.token}
        }
        this.$http.get(url, auth)
            .then(response => {
                this.tasks = response.data;
                this.loading = false;
            })
            .catch(error => {
                if(error.response.status == '401'){
                    this.removeTokenAndRedirect()
                }
                console.log(error);
                this.loading = false;
            });
        },
        addTask : function(){
            if(this.token == null){
                this.$router.push({name:"login"});
            }
            const url = process.env.VUE_APP_BASE_URL + '/task/addtask';
            
            const data = this.taskForm;
            
            const auth = {
                headers: {authToken: this.token}
            }
            this.modalOpen=false;

            this.$http.post(url, data, auth)
                .then(response => {
                    this.getTasks()
                    this.taskForm.taskDescription = this.taskForm.taskDate = "";
                })
                .catch(error => {
                    if(error.response.status == '401'){
                        this.removeTokenAndRedirect()
                    }
                    console.log(error);
                }); 
            },
        deleteTask : function(taskId){
            if(this.token == null){
                this.$router.push({name:"login"});
            }
            const url = process.env.VUE_APP_BASE_URL + '/task/deletetask/' + taskId;
            const auth = {
                headers: {authToken: this.token}
            }
            this.$http.delete(url, auth)
                .then(response => {
                    this.getTasks()
                })
                .catch(error => {
                    if(error.response.status == '401'){
                        this.removeTokenAndRedirect()
                    }
                    console.log(error);
                }); 
            },
        updateTask : function(){
            if(this.token == null){
                this.$router.push({name:"login"});
            }
            const url = process.env.VUE_APP_BASE_URL + '/task/updatetask';
            const auth = {
                headers: {authToken: this.token}
            }
            const data =  {
                taskId: this.currentTask.taskId,
                taskDescription: this.currentTask.taskDescription,
                taskDate: this.currentTask.taskDate,
                completed: false,
                username: ""
            }
            
            this.$http.put(url, data, auth)
                .then(response => {
                    this.modalOpen = false;
                    this.addOperation = true;
                    this.getTasks()
                })
                .catch(error => {
                    if(error.response.status == '401'){
                        this.removeTokenAndRedirect()
                    }
                    console.log(error);
                }); 
            },
        updateTaskStatus : function(task){
            if(this.token == null){
                this.$router.push({name:"login"});
            }
            const url = process.env.VUE_APP_BASE_URL + '/task/updatetaskstatus';
            const auth = {
                headers: {authToken: this.token}
            }
            const data =  {
                taskId: task.taskId,
                taskDescription: "",
                taskDate: "",
                completed: !task.completed,
                username: ""
            }
            
            this.$http.put(url, data, auth)
                .then(response => {
                })
                .catch(error => {
                    // if unauthorised, means set a valid token in localStorage and hit the url, though that user is already logged out and not present in db table.
                    if(error.response.status == '401'){
                        this.removeTokenAndRedirect()
                    }
                    console.log(error);
                });
        },
        removeTokenAndRedirect : function(){
            localStorage.removeItem("authTokenActivityTracker");
            this.$router.push({name:"login"});
        }
    }
}
</script>