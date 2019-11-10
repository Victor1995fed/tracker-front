<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/dashboard" >
        <md-icon>dashboard</md-icon>
        <p>Главная</p>
      </sidebar-link>


      <sidebar-link to="/project/list">
        <md-icon>dashboard</md-icon>
        <p>Проекты</p>
      </sidebar-link>

      <sidebar-link to="/task/list">
        <md-icon>content_paste</md-icon>
        <p>Задачи</p>
      </sidebar-link>




      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Метки</p>
      </sidebar-link>

      <sidebar-link to="/notifications3">
        <md-icon>notifications</md-icon>
        <p>Шаблоны</p>
      </sidebar-link>
      <sidebar-link to="/note">
        <md-icon>notifications</md-icon>
        <p>Заметки</p>
      </sidebar-link>

      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Профиль</p>
      </sidebar-link>

      <sidebar-link to="/user4">
        <md-icon>person</md-icon>
        <p>Мои действия</p>
      </sidebar-link>

<!--      ############################-->



<!--      Мусор!!!-->
<!--      <sidebar-link to="/typography">-->
<!--        <md-icon>library_books</md-icon>-->
<!--        <p>Typography</p>-->
<!--      </sidebar-link>-->
<!--      <sidebar-link to="/icons">-->
<!--        <md-icon>bubble_chart</md-icon>-->
<!--        <p>Icons</p>-->
<!--      </sidebar-link>-->
      <!-- <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link> -->
<!--      <sidebar-link to="/notifications">-->
<!--        <md-icon>notifications</md-icon>-->
<!--        <p>Заметки</p>-->
<!--      </sidebar-link>-->
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->

    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>

  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods:{
    // projectMenu(){
    //     alert('sds');
    // }
  }
};
</script>




  <style lang="scss" scoped>

  </style>

