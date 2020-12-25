import Vue from 'vue'
import App from './App.vue'
import myRouter from './easyRouter'
import Index from './pages/Index.vue'

Vue.use(myRouter)

const router = new myRouter({
  routes: [{
    path: '/index',
    component: Index
  }, {
    path: '/regard',
    component: () => import('./pages/Regard.vue')
  }]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
