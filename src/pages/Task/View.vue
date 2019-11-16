<template>
  <div class="content">
    <div
      class="md-layout md-gutter preloader-view"
      v-if="loader"
      :class="`md-alignment-center-center`"
    >
      <DoubleBounce></DoubleBounce>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title
        >Вы действительно хотите удалить эту задачу?</md-dialog-title
      >

      <md-dialog-actions>
        <md-button @click="showDialog = false">Нет</md-button>
        <md-button class="md-danger" @click="deleteTask">Да</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="md-layout" v-if="!loader">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">{{ response.task.title }}</h4>
            <!-- FIXME: меняется url, указанный в href, но страница не обновляется, не стал долго возиться, воткнул target="_blank"    -->
            <p
              v-if="
                response.task.parent_id != null && response.parent_task != null
              "
            >
              Основная задача:
              <a
                :href="'/#/task/view/' + response.task.parent_id"
                target="_blank"
                >{{ response.parent_task.title }}
              </a>
            </p>
            <p class="category" v-if="response.category !== null">
              {{ response.category.title }}
            </p>
          </md-card-header>
          <md-card-content>
            <div id="typography">
              <div class="title">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <md-button
                      class="md-just-icon md-simple md-primary"
                      :href="'/#/task/update/' + this.$route.params.id"
                    >
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Редактировать</md-tooltip>
                    </md-button>
                    <md-button
                      @click="showDialog = true"
                      class="md-just-icon md-simple md-danger"
                    >
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="top">Удалить</md-tooltip>
                    </md-button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Статус:</span>
                      {{ response.status.title }}
                    </p>
                  </div>
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Дата начала:</span>
                      {{ response.task.date_start | setFormatDate }}
                    </p>
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Приоритет:</span>
                      {{ response.priority.title }}
                    </p>
                  </div>
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Дата завершения:</span>
                      {{ response.task.date_end | setFormatDate }}
                    </p>
                  </div>
                </div>

                <div class="md-layout">
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Метки:</span>
                      <md-chip md-clickable>Clickable1</md-chip>
                      <md-chip md-clickable>Clickable2</md-chip>
                      <md-chip md-clickable>Clickable3</md-chip>
                    </p>
                  </div>
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Потрачено(ч):</span>
                      {{ response.task.spending }}
                    </p>
                  </div>
                </div>

                <div class="md-layout">
                  <div class="md-layout-item">
                    <p>
                      <span class="md-body-2">Готовность:</span>
                      <span>{{ response.task.readiness }}</span
                      >%
                    </p>
                    <md-progress-bar
                      class="md-transparent"
                      md-mode="determinate"
                      :md-value="response.task.readiness"
                    ></md-progress-bar>
                  </div>
                </div>
                <hr />
                <div class="md-layout layout-height-min">
                  <div
                    class="ql-editor"
                    v-html="response.task.description"
                  ></div>
                  <nav-tabs-card class="custom-tabs-view">
                    <template slot="content">
                      <md-tabs class="md-color-red">
                        <template slot="md-tab" slot-scope="{ tab }">
                          {{ tab.label }}
                          <i class="badge noHover" v-if="tab.data.badge">{{
                            tab.data.badge
                          }}</i>
                        </template>
                        <md-tab
                          id="tab-comment"
                          md-label="Комментарии"
                          :md-template-data="{ badge: countComment }"
                        >
                          <task-tabs-comment
                            @countComment="setCount"
                          ></task-tabs-comment>
                        </md-tab>

                        <md-tab id="tab-files" md-label="Файлы" :md-template-data="{ badge: response.files.length }">
                          <task-tabs-files
                            :prop="response.files"
                          ></task-tabs-files>
                        </md-tab>
                        <md-tab id="tab-history" md-label="История" :md-template-data="{ badge: countHistory }">
                          <task-tabs-history @countHistory="setCount"></task-tabs-history>
                        </md-tab>
                      </md-tabs>
                    </template>
                  </nav-tabs-card>
                </div>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button :href="urlChildTask" class="md-raised md-success"
                  >Добавить подзадачу</md-button
                >
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DoubleBounce } from "vue-loading-spinner";
// import repository from "@/settings.js";
// console.warn(window.$settings);
import {
  NavTabsCard,
  TaskTabsFiles,
  TaskTabsComment,
  TaskTabsHistory
} from "@/components";
export default {
  components: {
    NavTabsCard,
    TaskTabsFiles,
    TaskTabsComment,
    TaskTabsHistory,
    DoubleBounce
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    showDialog: false,
    urlChildTask: "task/create",
    loader: true,
    response: {
      task: {},
      category: {},
      files: {},
      priority: {},
      status: {}
    },
    countComment:0,
    countHistory:0,
    priority: "Высокий",
    dateStart: "23.08.2019",
    dateEnd: "23.08.2019",
    amount: 90,
    content: "gives the styles and works fine with dark themes. Look:"
  }),
  mounted() {
    // Vue.material.locale.dateFormat = 'dd/MM/yyyy'
    // console.log(Vue.material.locale.dateFormat);
    let id = this.$route.params.id;
    this.$http.get(this.$settings.API + "task/view?id=" + id).then(response => {
      this.loader = false;
      this.response = response.data;
    });
    this.urlChildTask = "#/task/create/" + id;
  },
  methods: {
    deleteTask() {
      let _this = this;
      axios
        .delete(_this.$settings.API + "task/delete?id=" + this.$route.params.id)
        .then(function(response) {
          if (response.data) {
            _this.$router.push("/task/list");
          } else {
            alert("error");
          }
        });
    },
    setCount: function(countObj) {
      switch (countObj.field) {
        case "comment":
          this.countComment = countObj.count;
          break;

        case "file":
          this.countFile = countObj.count;
          break;

        case "history":
          this.countHistory = countObj.count;
          break;
      }
    }
  }

};
</script>

<style lang="scss" scoped>
small {
  display: block;
}
.layout-height-min {
  min-height: 400px;
}
.md-tabs-navigation {
  box-shadow: none !important;
}
.badge {
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  /*top: 2px;*/
  right: 2px;
  /*background: gray;*/
  border-radius: 100%;
  color: #ccc !important;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-family: "Roboto Mono", monospace;
}
.badge:hover {
  color: #ccc !important;
}
</style>
