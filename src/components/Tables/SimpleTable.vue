<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Проект">{{ item.project }}</md-table-cell>
        <md-table-cell md-label="Категория">{{ item.category }}</md-table-cell>
        <md-table-cell md-label="Тема"><a :href="item.link">{{ item.title }}</a></md-table-cell>
        <md-table-cell md-label="Приоритет">{{ item.priority }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
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
  }
};
</script>
