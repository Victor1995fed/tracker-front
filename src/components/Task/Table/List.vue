<template>
  <div>
  <div class="md-layout md-gutter preloader" v-if="loader" :class="`md-alignment-center-center`">
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
  <div class="md-table-custom">

    <md-table md-card v-show="!loader">
      <md-table-toolbar>
<!--        <h1 class="md-title">Users</h1>-->
      </md-table-toolbar>
      <md-table-row>
        <md-table-head
          ><span
            @click="applySort"
            name="id"
            sort="default"
            class="label-header unselectable"
          >
            # <span v-html="arrow.id"></span></span
        ></md-table-head>
        <md-table-head>
          <span
            >Действия
          </span>
        </md-table-head>
        <md-table-head
          ><span
            @click="applySort"
            name="title"
            class="label-header unselectable"
            >Тема<span v-html="arrow.title"></span></span
        ></md-table-head>
        <md-table-head
          ><span
            @click="applySort"
            name="project.title"
            class="label-header unselectable"
            >Проект <span v-html="arrow['project.title']"></span></span
        ></md-table-head>

        <md-table-head
          ><span
            @click="applySort"
            name="status.id"
            class="label-header unselectable"
            >Статус<span v-html="arrow['status.id']"></span> </span
        ></md-table-head>
        <md-table-head
          ><span
            @click="applySort"
            name="priority.id"
            class="label-header unselectable"
            >Приоритет<span v-html="arrow['priority.id']"></span> </span
        ></md-table-head>
        <md-table-head
          ><span
            @click="applySort"
            name="date_end"
            class="label-header unselectable"
            >Дата завершения<span v-html="arrow['date_end']"></span></span
        ></md-table-head>
      </md-table-row>

      <md-table-row v-for="item in task">
        <md-table-cell md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-just-icon md-simple md-primary"
            :href="'/#/task/update/' + item.id"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редактировать</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple md-primary"
            :href="'/#/task/view/' + item.id"
          >
            <md-icon><img src="@/assets/img/view.svg" alt="view"/></md-icon>
            <md-tooltip md-direction="top">Просмотреть</md-tooltip>
          </md-button>
        </md-table-cell>
        <md-table-cell>{{ item.title }}</md-table-cell>
        <md-table-cell
          ><span v-if="item.project !== null"
            ><a :href="'#/project/view/' + item.project.id">{{
              item.project.title
            }}</a></span
          ><span v-else>&mdash;</span></md-table-cell
        >
        <md-table-cell>{{ item.status.title }}</md-table-cell>
        <md-table-cell>{{ item.priority.title }}</md-table-cell>
        <md-table-cell
          ><span v-if="item.date_end !== null">{{item.date_end | setFormatDate }}</span
          ><span v-else>&mdash;</span></md-table-cell
        >
        <md-table-cell> <md-button
                @click="taskSetId(item.id)"
                class="md-just-icon md-simple md-danger"
        >
          <md-icon>delete</md-icon>
          <md-tooltip md-direction="top">удалить</md-tooltip>
        </md-button></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
  </div>
</template>

<script>
  import {DoubleBounce} from 'vue-loading-spinner'
export default {
  name: "task-list",
  components: {
    DoubleBounce
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    task: {},
    sortType: {
      default: ""
    },
    loader : {
      default:true
    }
  },
  data() {
    return {
      selected: [],
      users: [],
      showDialog:false,
      sortName: {
        id: this.$settings.TASK_SORT_ID,
        title: this.$settings.TASK_SORT_THEME,
        project: this.$settings.TASK_SORT_PROJECT,
        status: this.$settings.TASK_SORT_STATUS,
        priority: this.$settings.TASK_SORT_PRIORITY,
        dateEnd: this.$settings.TASK_SORT_DATE_END
      },
      arrow: {
        id: "",
        title: "",
        "project.title": "",
        "status.id": "",
        "priority.id": "",
        date_end: ""
      }
    };
  },
  created(){
    this.setTypeSort(this.sortType)
  },
  filters: {
  },
  methods: {
    deleteTask: function(){
      let _this = this;
      this.$http
              .delete(this.$settings.TASK_DELETE + "?id=" + this.taskId)
              .then(function(response) {
                if (response.data) {
                  _this.$router.go(_this.$router.path)
                } else {
                  alert("error");
                }
              });
    },
    taskSetId:function(uuid){
      this.taskId = uuid
      this.showDialog = true;
    },
    clickCallback: function(page) {
      this.
      console.log(page);
      this.$router.push("/task/" + page);
      this.$http
        .get(this.$settings.TASK_LIST + "?page=" + page)
        .then(response => {
          this.task = response.data.task;
          this.pageCount = response.data.countPage;
        });
    },
    applySort: function(e) {
      let sort = {};
      let name = e.currentTarget.getAttribute("name");
      let typeSort = e.currentTarget.getAttribute("sort");
      console.warn(e.currentTarget.getAttribute("name"));
      sort.sort = name;
      //Смотрим тип сортировки
      this.clearArrow();
      let changeSort = this.getTypeSort(typeSort, name);
      e.currentTarget.setAttribute("sort", changeSort);
      sort.sort = (changeSort == "desc" ? "-" : "") + sort.sort;
      this.$emit("sort", sort);
    },
    getTypeSort: function(current, name) {
      console.warn("CURRENT", current);
      switch (current) {
        case "asc":
          if (this.arrow[name] !== undefined) {
            this.arrow[name] = "&#8659;";
          }
          return "desc";
        case "desc":
          if (this.arrow[name] !== undefined) {
            this.arrow[name] = "&#8657;";
          }
          return "asc";
        default:
          this.arrow[name] = "&#8657;";
          return "asc";
      }
    },
    setTypeSort: function(sortType){
        if(sortType[0] == '-'){
          let name =  sortType.slice(1)
          this.arrow[name] = this.arrow[name] === undefined ? '' : "&#8659;";
        }
        else
          this.arrow[sortType] = this.arrow[sortType] === undefined ? '' : "&#8657;";
    },
    clearArrow: function() {
      for (var key in this.arrow) {
        this.arrow[key] = "";
      }
    },

  }
};
</script>

<style scoped>
a.title-link {
  color: black !important;
}
.label-header {
  cursor: pointer;
}
.label-header:hover {
  color: #2196f3;
}

.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}

  .preloader {
    margin:100px 0 20px 0;
  }
</style>
