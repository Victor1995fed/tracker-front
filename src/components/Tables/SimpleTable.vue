<template>
  <div>
    <md-table v-model="task" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Тема"><a :href="'#/task/view/'+item.id">{{ item.title }}</a></md-table-cell>
        <!-- <md-table-cell md-label="Проект">{{ item.project }}</md-table-cell> -->
        <md-table-cell md-label="Категория"><span v-if="item.category !== null">{{ item.category.title }}</span></md-table-cell>
        <md-table-cell md-label="Приоритет">{{ item.priority.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios';
import repository from '@/settings.js';
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      task: [],
      selected: [],
      users: []
    };
  },
  
  mounted() {

axios.get(repository.API+'task/index').then(response => {

this.task = response.data

})
}
};
</script>
