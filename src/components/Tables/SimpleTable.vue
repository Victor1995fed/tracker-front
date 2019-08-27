<template>
  <div>
    <md-table v-model="task" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Тема"><a :href="'task/view?id='+item.id">{{ item.title }}</a></md-table-cell>
        <!-- <md-table-cell md-label="Проект">{{ item.project }}</md-table-cell> -->
        <md-table-cell md-label="Категория">{{ item.category.title }}</md-table-cell>
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
      users: [
        {
          id: 1,
          project: "test1",
          category: "rer",
          title: "Niger",
          link: "http://test.com",
          priority: "Oud-Turnhout2"
        },
        {
          id: 2,
          project: "test2",
          category: "rer",
          title: "Curaçao",
          link: "http://test.com",
          priority: "Sinaai-Waas"
        },
        {
          id: 3,
          project: "$56,142",
          category: "rer",
          title: "Netherlands",
          link: "http://test.com",
          priority: "Overland Park"
        }
      ]
    };
  },
  
  mounted() {

axios.get(repository.API+'task/index').then(response => {

this.task = response.data

})
}
};
</script>
