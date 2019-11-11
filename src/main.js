// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Axios from 'axios'


// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

//helper
import {helpers} from "./helpers";
import {settings} from "./settings";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";



import Chartist from "chartist";
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});
//URL MAIN
// const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR";

Vue.prototype.$Chartist = Chartist;
import {store} from './store';

Vue.prototype.$settings = settings;
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

Vue.filter('setFormatDate', function (value) {
  //TODO:: Добавить нормальную проверку, перенести в отдельный файл
  if(value != '' && value != null && value !== undefined){
    let date = new Date(value);
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1;
    let curr_year = date.getFullYear();
    return curr_date + "-" + curr_month + "-" + curr_year;
  }
  else
    return null;

})

//settings dateformat
Vue.material.locale = {
  // range for datepicker
  startYear: 1900,
  endYear: 2099,
  // date format for date picker
  dateFormat: 'dd-MM-yyyy',
  // i18n strings
  days: ['Воскреенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  shorterDays: ['В', 'П', 'В', 'Ср', 'Ч', 'П', 'Сб'],
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
  shorterMonths: ['Я', 'Ф', 'М', 'А', 'М', 'Ин', 'Ил', 'Ав', 'Се', 'О', 'Н', 'Д'],
  firstDayOfAWeek: 1
}

Vue.prototype.$http = Axios;
// Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+'pRN76I5AYmBoYYpkZxQuHDKf824zOOlL';
const token = localStorage.getItem('token')
if (token) {
  console.warn('TOKEN!!++',token)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}


/* eslint-disable no-new */
new Vue({
  mixins: [helpers],
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  },

});
