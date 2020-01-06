<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
              <search-field></search-field>
<!--            <md-field class="search" v-model="selectedEmployee">-->
<!--              <label>Поиск...</label>-->
<!--              <md-input v-model="initial"></md-input>-->
<!--            </md-field>-->
<!--            <md-autocomplete-->
<!--              class="search"-->
<!--              v-model="selectedEmployee"-->
<!--              :md-options="employees"-->
<!--            >-->
<!--              <label>Поиск...</label>-->
<!--            </md-autocomplete>-->
          </div>
          <md-list>

          </md-list>

          <md-button href="/#/dashboard" class="md-just-icon md-simple" >
            <md-icon>home</md-icon>
            <md-tooltip md-direction="top">На главную</md-tooltip>
          </md-button>

          <md-button  class="md-just-icon md-simple "  @click="logout">
            <md-icon>logout</md-icon>
            <md-tooltip md-direction="top">Выйти</md-tooltip>
          </md-button>


        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { SearchField} from "@/components";
export default {
    components: {
        SearchField
    },
  data() {
    return {
      // selectedEmployee: null,
      // employees: [
      //   "Jim Halpert",
      //   "Dwight Schrute",
      //   "Michael Scott",
      //   "Pam Beesly",
      //   "Angela Martin",
      //   "Kelly Kapoor",
      //   "Ryan Howard",
      //   "Kevin Malone"
      // ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout: function () {

      let username = this.username
      let password = this.password
      console.warn(this.$store);

      this.$store.dispatch('logout')
              .then(() => this.$router.push('/login'))
              .catch(err => {
                console.error(err)

              })
    }
  }
};
</script>

<style lang="css"></style>
