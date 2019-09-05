<template>
  <form method="POST" :action="action" @submit.prevent="projectReview" ref="formData">
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
              <md-input name="title" v-model="title" ref="title"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100">
            <label>Описание</label>
            <md-field maxlength="5">
              
     <div id="app">
    <vue-editor  v-model="description" ref="description"></vue-editor>
    <!-- <textarea style="display:none" v-model="description" name="description" id="description" > </textarea> -->
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
import axios from 'axios';
import repository from '@/settings.js'; 
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
  methods:{
    projectReview(obj){
      let _this = this
      const formData = new FormData();
      formData.append('title', (this.$refs.title.value == null) ? '' : this.$refs.title.value);
      formData.append('description', this.$refs.description.value);

      axios.post(repository.API+'project/create', 
    formData)
    .then(function(response){
       console.log(response.data)
      // return
      // let data = JSON.parse(response.data);
  // console.log(data)
      //redirect logic
      if (response.data.result) {
       _this.$router.push('/project/view/'+response.data.id);
      }
      else{
          alert('error'+response.data.message)
     }
    })
     
      // console.log(this.$refs.description.value);
    }
  }


};

</script>
