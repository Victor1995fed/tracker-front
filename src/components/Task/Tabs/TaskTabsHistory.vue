<template>
  <div>
    <div v-for="one in history" class="custom-layout clear-fix">
      <div class="clear-fix">
        <div class="comment-icon"><md-icon>history</md-icon></div>
        <div class="comment-date">{{ one.date }}</div>
      </div>
      <div class="clear-fix">
        <div class="comment-content" v-html="one.comment">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-tabs-history",
  props: ["prop"],
  data() {
    return {
      method: "POST",
      url: "",
      selected: [],
      history: [],
      showDialog: false,
      showDialogDel: false,
      form: {
        content: ""
      },
      idComment: null
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$http.get(this.$settings.TASK_GET_HISTORY + "?id=" + id).then(response => {
      this.history = response.data;
    });
  },
  methods: {}
};
</script>

<style scoped>
.custom-layout {
  border-bottom: 1px #ccc solid;
  margin-bottom: 40px;
  padding: 5px;
}
.comment-content,
.comment-icon,
.comment-button {
  float: left;
  /*margin-left: 10px;*/
}
.comment-button {
  margin-left: -5px;
}
.comment-content {
  margin-top: 10px;
}
.comment-date {
  float: right;
}

.clear-fix::after {
  content: "";
  display: block;
  clear: both;
  height: 0px;
  visibility: hidden;
}
</style>
