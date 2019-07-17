<template>
    <div class="overlay">
        <div class="loader fixed inset-0 m-auto"></div>
    </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
.overlay{
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, 0.5);
}

.loader {  
  border: 10px solid #dddddd;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  width: 65px;
  height: 65px;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
