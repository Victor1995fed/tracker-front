<template>
  <div>
    <md-dialog class="md-scrollbar" :md-active.sync="showDialog">
      <md-dialog-content>
      <md-dialog-title>Комментарий</md-dialog-title>
      <div class="md-layout-item md-size-100">
        <md-field maxlength="5">
          <div id="app">
            <vue-editor v-model="form.content"></vue-editor>
          </div>
        </md-field>
      </div>
<!--        TODO:: Перенести диалоговые окна в отдельные компоненты-->
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="saveComment">Сохранить</md-button>
      </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>

      <md-dialog :md-active.sync="showDialogDel">
          <md-dialog-title>Вы действительно хотите удалить этот комментарий?</md-dialog-title>

          <md-dialog-actions>
              <md-button  @click="showDialogDel = false">Нет</md-button>
              <md-button class="md-danger" @click="deleteComment">Да</md-button>
          </md-dialog-actions>
      </md-dialog>
<!--    <md-button class="md-primary md-raised" @click="addComment"-->
<!--      >Добавить комментарий</md-button-->
<!--    >-->


    <div v-for="one in comment" class="custom-layout clear-fix">
      <div class="clear-fix">
        <div class="comment-icon"><md-icon>comment</md-icon></div>
        <div class="comment-date">{{ one.date_create }}</div>
      </div>
      <div class="clear-fix">
        <div class="comment-content" v-html="one.content">
          <!--          <p>{{ one.content }}</p>-->
        </div>
      </div>
      <div class="comment-button">
        <md-button
          @click="editComment(one)"
          class="md-just-icon md-simple md-primary"
        >
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Редактировать</md-tooltip>
        </md-button>
        <md-button class="md-just-icon md-simple md-danger"  @click="setParamsDelete(one)">
          <md-icon>delete</md-icon>
          <md-tooltip md-direction="top" class="md-danger">удалить</md-tooltip>
        </md-button>
      </div>
    </div>
    <md-button
            @click="addComment"
            class=" md-primary md-simple md-just-icon clear-fix"
    >
<!--      <md-icon class="md-size-5x">add_comment</md-icon>-->
            <md-icon>add_comment</md-icon>
      <md-tooltip md-direction="top">Добавить комментарий</md-tooltip>
    </md-button>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "task-tabs-comment",
  props: ["prop"],
  components: {
    VueEditor
  },
  data() {
    return {
      method: "POST",
      url: "",
      selected: [],
      comment: [],
      showDialog: false,
      showDialogDel:false,
      form: {
        content: ""
      },
      idComment: null
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$http.get(this.$settings.COMMENT_LIST + "?id=" + id).then(response => {
      this.comment = response.data;
      this.$emit("countComment", {
        field:'comment',
        count:this.comment.length
      });
    });
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    },
    addComment: function() {
      this.method = "POST";
      this.idComment = null;
      this.url = this.$settings.COMMENT_CREATE;
      this.showDialog = true;
    },
    editComment: function(item) {
      console.warn(item);
      this.method = "PUT";
      this.form.content = item.content;
      this.idComment = item.id;
      this.url = this.$settings.COMMENT_UPDATE;
      this.showDialog = true;
    },
    saveComment() {
      let _this =this;
      let formData = new FormData();
      for (var key in this.form) {
        if (this.form[key] !== undefined && this.form[key] !== null) {
          formData.append(key, this.form[key]);
        }
      }

      const options = {
        method: this.method,
        responseType: "json",
        url:
          this.url +
          "?id=" +
          (this.idComment !== null ? this.idComment : this.$route.params.id),
        data: formData,
        transformResponse: [
          data => {
            if (data) {
              this.showDialog = false;
              //TODO:: Добавить динамическое обновление компонента с комментариями
                _this.$router.go(_this.$router.path)
            } else {
              alert("error" + data.message);
            }
          }
        ]
      };
      this.$http(options);
    },
      setParamsDelete: function(item){
        this.idComment = item.id
          this.showDialogDel = true;
      },
    deleteComment: function() {
        this.method = "DELETE";
        this.url = this.$settings.COMMENT_DELETE;
        let _this =this;
        this.$http.delete(this.url+'?id='+this.idComment)
            .then(function(response){
                if (response) {
                    _this.$router.go(_this.$router.path)
                }
                else{
                    alert('error')
                }
            })

        this.showDialogDel = false;
    }
  }
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

  .add-comment {
    float: left !important;
  }
</style>
