<template>
  <li class="md-list-item" style="overflow: hidden">
    <router-link
      class="md-list-item-router md-list-item-container md-button-clean"
      @click="hideSidebar"
      v-bind="$attrs"
    >
      <div class="md-list-item-content md-ripple">
        <slot>
          <md-icon>{{ link.icon }}</md-icon>
          <p>{{ link.name }}</p>
        </slot>
      </div>

    </router-link>
<!--    <drop-down>-->
<!--      <a slot="title" class="dropdown-toggle" data-toggle="dropdown">-->
<!--        <p>Notifications</p>-->
<!--      </a>-->
<!--      <ul class="dropdown-menu dropdown-menu-left" style="background: black; position: absolute; z-index: 10;">-->
<!--        <li><a href="#">Mike John responded to your email</a></li>-->
<!--        <li><a href="#">You have 5 new tasks</a></li>-->
<!--      </ul>-->
<!--    </drop-down>-->
  </li>
</template>
<script>
export default {
  inject: {
    autoClose: {
      default: true
    }
  },
  props: {
    link: {
      type: [String, Object],
      default: () => {
        return {
          name: "",
          path: "",
          icon: ""
        };
      }
    },
    tag: {
      type: String,
      default: "router-link"
    }
  },
  methods: {
    hideSidebar() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
<style></style>
