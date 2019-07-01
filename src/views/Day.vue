<template>
    <div class="m-2">
        <p class="text-xs font-medium">You have <span class="text-blue-600">{{noOfTasks}} task:</span></p>
        <div v-for="task of tasks" class="bg-white m-2 p-2 rounded-lg text-left flex justify-between items-center">
            <label class="block">
                <input class="mr-2 leading-tight" type="checkbox" v-model=task.completed>
                <span class="text-sm">{{task.taskDescription}}</span>
            </label>
            <span>
                <a><i class="material-icons cursor-pointer text-blue-600">edit</i></a>
                <a @click="deleteTask(task.taskId)"><i class="material-icons cursor-pointer text-blue-600">delete</i></a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Day',
  data:  function(){
    return{
      tasks: [],
      noOfTasks: 0
    }},
  watch : {
      '$route.params.day': function(){
      console.log(this.$route.params.day);
      const url = 'http://localhost:8083/ActivityTracker_ServerSide/api/task/gettask/' + this.$route.params.day;
      const auth = {
        headers: {authToken:"dmFpYmhhdkBnbWFpbC5jb20yMDE5MDYyOTEzMjQzNw=="} // dummy value from db for testing
      }
      this.$http.get(url, auth)
        .then(response => {
            console.log(response.data)
            this.tasks = response.data;
            this.noOfTasks = this.tasks.length;
        })
        .catch(function (error) {
              console.log(error);
        });
        }
    },
    methods: {
        deleteTask : function(taskId){
            const url = 'http://localhost:8083/ActivityTracker_ServerSide/api/task/deletetask/' + taskId;
            const auth = {
                headers: {authToken:"dmFpYmhhdkBnbWFpbC5jb20yMDE5MDYyOTEzMjQzNw=="} // dummy value from db for testing
            }
            this.$http.delete(url, auth)
                .then(response => {
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                }); 
            }
        }
    }
</script>

