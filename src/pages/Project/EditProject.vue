<template>
  <form method="POST" :action="action">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Название проекта </h4>
        <p class="category">Название задачи если есть</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Название проекта</label>
              <md-input v-model="title"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100">
            <label>Описание</label>
            <md-field maxlength="5">
              
     <div id="app">
    <vue-editor v-model="description"></vue-editor>
  </div>
              <!-- <md-textarea v-model="description"></md-textarea> -->
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button type="submit" class="md-raised md-success">Сохранить</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { VueEditor } from "vue2-editor";
import Vue from 'vue'
export default {
   components: {
    VueEditor
  },
  name: "edit-project",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      amount:10,
      action:'http://tracker.zz/project/create',
      content: "<h1>Some initial content</h1>",
      dateStart: null,
      dateEnd: null,
      file: null,
      username: null,
      title: null,
      description: "Пиши"
    };
  },


};

</script>
