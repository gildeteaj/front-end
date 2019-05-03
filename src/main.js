import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from './routes';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BTabs from 'bootstrap-vue/es/components/tabs/tabs'

Vue.component('b-tabs', BTabs)


Vue.use(VueRouter);


//window.moment = VueMoment;
//window.moment.locale('ptBR');

// adicionando a propriedade mode com o valor history.

const router = new VueRouter({
  routes, 
  mode: 'history'
});

Vue.use(VueResource);

new Vue({
  el: '#app', 
  router,
 
  render: h => h(App)
})


