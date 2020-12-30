<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="nav">
      <ul>
        <li v-for="item in routes" :key="item.name" @click="$router.push(item.path)">{{item.name}}</li>
      </ul>
    </div>
    <div class="router-view">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import routes from './router/data.js'
export default {
  name: 'App',
  data(){
    return{
      routes
    }
  }
}
</script>

<style lang="less" >
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
.nav{
  background: rgb(230, 227, 227);
  height: 100%;
  box-sizing: border-box;
  li{
    line-height: 30px;
    cursor: pointer;
  padding: 5px 10px;
    &:hover{
      background: #fff;
    }
  }
}
.router-view{
  flex: 1;
}
</style>
