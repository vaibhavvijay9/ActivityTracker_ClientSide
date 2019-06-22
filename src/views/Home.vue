<template>
  <div class="page-content">
    
    <div class="title">Activity Tracker</div>
    
    <div class="z-depth-5 activity-card">
      <div class="header">
        <div class="header-user">
          <span>Hi Vaibhav</span>
          <i class="material-icons">power_settings_new</i>
        </div>
        <div class="header-nav">
          <a>Yesterday</a>
          <a>Today</a>
          <a>Tomorrow</a>
        </div>
      </div>
      <div class="main">
        <p class="task-summary">You have <span class="task-count">5 task:</span></p>
        <div class="task-item">
            <label>
              <input type="checkbox" class="filled-in"/>
              <span style="display:block">Call to John</span>
              <span class="task-time">8:00</span>
            </label>
            <span>
              <i class="material-icons task-action-icon">edit</i>
              <i class="material-icons task-action-icon">delete</i>
            </span>
        </div>
      </div>
      <div>
        <!-- <a class="waves-effect waves-light btn z-depth-3 add-task-button">Add new task</a> -->
        <a class="btn-floating waves-effect waves-light" style="background-color: #3B4FFF;"><i class="material-icons">add</i></a>
      </div>
      <div class="footer">
        <a>Day</a>
        <a>Week</a>
        <a>Month</a>
      </div>
    </div>

  </div>
</template>

<style>
/* main start*/
.task-summary{
  font-size: 0.8rem;
  font-weight: 600;
}

.task-count{
  color: #3D51FF;
}

.task-item{
  background-color: white;
  margin: 2%;
  padding: 1.8%;
  border-radius: 5px;
  text-align: left;
  display:flex;
  justify-content:space-between;
}
.task-time{
  padding-left: 35%;
}

.task-action-icon{
  color: #8390ff; /*7180ff*/
}

/* main end */

.page-content{
  height: 100vh;
  padding: 2%;
  /* background-color: #F2F3F9; */
}

.title{
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.activity-card{
  text-align: center;
  background-color: #ECEEFF;
  margin: 2%;
  height: 80vh;
  display: grid;
  grid-template-rows: 15vh auto 8vh 10vh;
}

.header{
  background-color: #3D51FF;
  border-radius: 0px 0px 20px 20px;
  padding: 1%;
  color: white;
}

.header-user{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  font-size: 1.5rem;
  padding: 0 2%;
}

.header-nav{
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.main{

}

.add-task-button{
  width: 250px;
  border-radius: 15px;
  background-color: #3B4FFF;
}

.footer{
  background-color: #DCDDE3;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

@media screen and (min-width: 769px) {
    .activity-card{
      width: 350px;
      height: 85vh;
      margin: 0 auto;  
    }
}
</style>

