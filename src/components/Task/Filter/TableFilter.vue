<template>
  <div>
    <div class="radio-task" >
      <md-radio
        @change="applyFilter"
        v-model="period"
        value="1"
        class="md-primary"
        >Сегодня</md-radio
      >
      <md-radio @change="applyFilter" v-model="period" value="7" class="md-primary"
        >Следующие 7 дней</md-radio
      >
      <md-radio @change="applyFilter" v-model="period" value="0" class="md-primary"
        >Все задачи</md-radio
      >
      <md-switch @change="applyFilter" v-model="done" class="md-primary"
        >Отображать выполненные</md-switch
      >
      <md-button
        class="md-just-icon md-simple md-primary custom-button-task"
        :href="'/#/task/create/'"
      >
        <md-icon><img src="@/assets/img/plus.svg" alt="plus"/></md-icon>
        <md-tooltip md-direction="top">Добавить задачу</md-tooltip>
      </md-button>
    </div>
    <div class="both"></div>
    <div style="display: none">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">Фильтры</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Проект</label>
                <md-select
                  name="project"
                  id="project"
                  v-model="form.project_id"
                >
                  <md-option
                    v-for="one in response.project"
                    :value="one.id"
                    v-bind:key="one.id"
                    >{{ one.title }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Статус</label>
                <md-select name="status" id="project" v-model="form.project_id">
                  <md-option
                    v-for="one in response.project"
                    :value="one.id"
                    v-bind:key="one.id"
                    >{{ one.title }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Приоритет</label>
                <md-select
                  name="priority "
                  id="project"
                  v-model="form.project_id"
                >
                  <md-option
                    v-for="one in response.project"
                    :value="one.id"
                    v-bind:key="one.id"
                    >{{ one.title }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-primary">Применить</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "task-filter",
  data: () => ({
    period: "0",
    done: false,
    form: {
      project_id: 0
    },
    response: {
      project: {
        1: {
          title: "sdsd",
          id: 1
        },
        2: {
          title: "sdsddfd",
          id: 11
        }
      }
    }
  }),
  methods: {
    applyFilter: function() {
      let params = {
          'done': + this.done,
          'period':this.period,
      }
      // let url = "http://tracker-api.zz/task/test?page=1&done=1&period=1";
      this.$emit("filter", params);
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
