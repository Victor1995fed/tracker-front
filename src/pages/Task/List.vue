<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Список ваших задач</h4>
          </md-card-header>
          <md-card-content>
            <task-filter
              @filter="applyFilter"
              :done="!!+paramsFilter.done"
              :period="paramsFilter.period"
              table-header-color="green"
            ></task-filter>
            <task-list
              table-header-color="green"
              :task="task"
              :sortType="sort.sort"
              :loader = "loader"
              @sort="applySort"
            ></task-list>
            <div class="pagination-custom">
              <paginate
                v-model="currentPage"
                v-if="!loader && pageCount > 1"
                ref="paginate"
                :force-page="2"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="3"
                :click-handler="clickCallback"
                :prev-text="'&#8656;'"
                :next-text="'&#8658;'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              >
              </paginate>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      ></div>
    </div>
  </div>
</template>

<script>
import { TaskList } from "@/components";
import { TaskFilter } from "@/components";
import Paginate from "vuejs-paginate";

export default {
  components: {
    TaskList,
    TaskFilter,
    Paginate,
  },
  data: () => ({
    done: true,
    form: {
      project_id: 0
    },
    loader:true,
    task: [],
    currentPage: 1,
    pageCount: 0,
    paramsFilter: {
      done: 0,
      period: "0"
    },
    sort: {}
  }),
  created() {
    this.createFilter();
    this.currentPage =
      this.$route.params.page !== undefined
        ? Number(this.$route.params.page)
        : 1;
    let url = this.genUrl();
    this.getTask(url);
    console.warn("TASKLIST",this.paramsFilter.done)
  },
  //TODO:: Реализовать передачу параметров фильтра и сортировки  в $router
  methods: {
    //Получаем ссылку для запроса из TaskFilter
    applyFilter: function(params) {
      this.currentPage = 1;
      this.paramsFilter = params;
      let url = this.genUrl();
      this.getTask(url)
      console.warn(url);
    },
    createFilter: function(){
      if(this.$route.query.sort !== undefined)
          this.sort.sort = this.$route.query.sort;
      if(this.$route.query.done !== undefined)
        this.paramsFilter.done = this.$route.query.done;
      if(this.$route.query.period !== undefined)
        this.paramsFilter.period = this.$route.query.period;
    },
    //Получаем параметры сортировки из TaskList
    applySort: function(sort) {
      this.sort = sort;
      let url = this.genUrl();
      console.warn(url);
      this.getTask(url)
    },
    //Получить список задач
    getTask: function(url){
      this.loader = true
      let _this = this
      this.$http.get(url).then(response => {

        setTimeout(function () {
          _this.loader = false
          _this.task = response.data.task;
          _this.pageCount = response.data.countPage;
        }, 500);

      }).catch(error => {
        console.log(error)
        throw new Error(`Something wrong happens`);
      });
    },
    //Генерим урл
    genUrl: function(page = this.currentPage) {

      let sortPush = Object.assign(this.paramsFilter, this.sort);
      this.$router.push({query: sortPush});

      let url = this.$settings.TASK_LIST + "?page=" + page;
      for (var key in this.$route.query) {
          url = url + "&" + key + "=" + this.$route.query[key];
      }
      return url;
    },
    clickCallback: function(page) {
      this.currentPage = page
      this.$router.push('/task/list/' + page);
      let url = this.genUrl();
      this.getTask(url);
      // this.$http.get(url).then(response => {
      //   this.task = response.data.task;
      //   this.pageCount = response.data.countPage;
      //   this.currentPage = page;
      // });
    }
  }
};
</script>

<style scoped>
.button-task {
  clear: both;
}

.custom-button-task {
  margin-top: 5px;
  margin-right: 15px;

  float: right;
}

.both {
  clear: both;
}
</style>
