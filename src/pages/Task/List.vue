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
              table-header-color="green"
            ></task-filter>
            <task-list
              table-header-color="green"
              :task="task"
              @sort="applySort"
            ></task-list>
            <div class="pagination-custom">
              <paginate
                v-model="currentPage"
                ref="paginate"
                :force-page="2"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="3"
                :click-handler="clickCallback"
                :prev-text="'Предыдущая'"
                :next-text="'Следующая'"
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
    Paginate
  },
  data: () => ({
    radio: "today",
    done: false,
    form: {
      project_id: 0
    },
    task: [],
    currentPage: 1,
    pageCount: 0,
    paramsFilter: {
      done: 0,
      period: 0
    },
    sort: {}
  }),
  mounted() {
    this.currentPage =
      this.$route.params.page !== undefined
        ? Number(this.$route.params.page)
        : 1;
    console.log(this.currentPage);
    console.log(this.$refs.paginate);
    let url = this.genUrl(Object.assign(this.paramsFilter, this.sort));
    this.$http.get(url).then(response => {
      this.task = response.data.task;
      this.pageCount = response.data.countPage;
    });
  },
  //TODO:: Реализовать передачу параметров фильтра и сортировки  в $router
  methods: {
    //Получаем ссылку для запроса из TaskFilter
    applyFilter: function(params) {
      this.currentPage = 1;
      this.paramsFilter = params;
      let url = this.genUrl(Object.assign(params, this.sort));
      this.$router.push("/task/" + this.currentPage);
      this.$http.get(url).then(response => {
        this.task = response.data.task;
        this.pageCount = response.data.countPage;
      });
      console.warn(url);
    },
    //Получаем параметры сортировки из TaskList
    applySort: function(sort) {
      // this.currentPage = 1;
      this.sort = sort;
      let url = this.genUrl(Object.assign(this.paramsFilter, this.sort));
      // this.$router.push("/task/" + this.currentPage);
      console.warn("Сортировать", sort);
      this.$http.get(url).then(response => {
        this.task = response.data.task;
        this.pageCount = response.data.countPage;
      });
    },
    //Генерим урл
    genUrl: function(filter, page = this.currentPage) {
      let url = this.$settings.TASK_LIST + "?page=" + page;
      for (var key in filter) {
        if (filter[key] !== 0 && filter[key] !== false) {
          url = url + "&" + key + "=" + filter[key];
        }
      }
      return url;
    },
    clickCallback: function(page) {
      console.log(page);
      this.$router.push("/task/" + page);
      let url = this.genUrl(Object.assign(this.paramsFilter, this.sort), page);
      this.$http.get(url).then(response => {
        this.task = response.data.task;
        this.pageCount = response.data.countPage;
        this.currentPage = page;
      });
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
