<template>
  <form novalidate method="POST" class="md-layout" :action="action" @submit.prevent="validateFields" ref="formData">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Название проекта </h4>
        <p class="category">Название задачи если есть</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('title')" >
              <label>Название проекта</label>
              <md-input  name="title"  autocomplete="given-name" v-model="form.title" ref="title" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.title.required">Название обязательно</span>
                <span class="md-error" v-else-if="!$v.form.title.minlength">Минимум 3 символа</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <label>Описание</label>
            <md-field maxlength="5">
     <div id="app">
    <vue-editor  v-model="form.description" ref="description"></vue-editor>
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
// import Vue from 'vue'
import axios from 'axios';
import repository from '@/settings.js';
import { validationMixin } from 'vuelidate'
import {
    required,
    minLength,
} from 'vuelidate/lib/validators'
export default {
   components: {
    VueEditor
  },
  name: "edit-project",
  mixins: [validationMixin],
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
        form: {
            title: null,
            description: ""
        },
        rules:[],
      amount:10,
      action:'http://tracker.zz/project/create',
      content: "<h1>Some initial content</h1>",
      dateStart: null,
      dateEnd: null,
      file: null,
      username: null,
      title: null,
      description: "Пиши",
        sending:false
    };
  },
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(3)
            }
        },
        sending: false
    },
  methods:{
      getValidationClass (fieldName) {
       const field = this.$v.form[fieldName]

          if (field) {
              console.log("INVA",field.$invalid);
              console.log("DIR",field.$dirty);
              return {
                  'md-invalid': field.$invalid && field.$dirty
              }
          }
      },
      clearForm () {
          this.$v.$reset()
          this.form.title = null
      },
      saveUser () {
          this.sending = true
          this.projectReview()
      },
      validateFields () {
          this.$v.$touch()
          if (!this.$v.$invalid) {
              this.saveUser()
          }
      },
    projectReview(){
      let _this = this
      const formData = new FormData();
      formData.append('title', (this.form.title == null) ? '' : this.form.title);
      formData.append('description', this.form.description);

      axios.post(repository.API+'project/create',
    formData)
    .then(function(response){
      if (response.data.result) {
       _this.$router.push('/project/view/'+response.data.id);
      }
      else{
          alert('error'+response.data.message)
     }
    })
    },

  }


};

</script>
