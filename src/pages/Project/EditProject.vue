<template>
  <form novalidate method="POST" class="md-layout" @submit.prevent="validateFields" ref="formData">
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
            <div v-if="action == 'project/update'" class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                    <label>Статус</label>
                    <md-select v-model="form.status_id">
                        <md-option
                                v-for="one in status"
                                :value="one.id"
                                v-bind:key="one.id"
                        >{{ one.title }}
                        </md-option>
                    </md-select>
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
    },
      form:{
        default:
            {
                title: null,
                description: ""
            }
      },
      action:{}
  },
    data: () => ({
        rules:[],
        status:{},
        amount:10,
        // action:'http://tracker.zz/project/create',
        content: "<h1>Some initial content</h1>",
        dateStart: null,
        dateEnd: null,
        file: null,
        username: null,
        title: null,
        description: "Пиши",
        sending:false
    }),
    mounted() {
        console.warn(this)
        let _this = this
        // this.status = {id:1,title:'ere'};
        _this.$http.get(this.$settings.API+'project/status')
            .then(function(response){
                if (response.data) {
                    console.warn(this)
                    _this.status = response.data;
                }
                else{
                    alert('error')
                }
            })
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
      let projectId = this.$route.params.id;
      const formData = new FormData();
        for (var key in this.form) {
            if(this.form[key] !== undefined && this.form[key] !== null){
                formData.append(key, this.form[key]);
            }
        }
        let method = (this.action == this.$settings.PROJECT_CREATE) ? 'post' : 'put';
        const options = {
            method: method,
            responseType:'json',
            url: this.action + ((projectId !== undefined) ? '?id='+projectId : ''),
            data: formData,
            transformResponse: [(data) => {
                if (data.result) {
                    _this.$router.push('/project/view/'+data.id);
                }
                else{
                    alert('error'+data.message)
                }
            }]
        };

        this.$http(options);

    },
  },

};

</script>
