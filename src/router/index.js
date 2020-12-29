import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import routes from './data.js'
console.log(routes)
Vue.use(Router)

export default new Router({
  routes
})
