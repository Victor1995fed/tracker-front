<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Название проекта </h4>
        <p class="category">Название задачи если есть</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Название задачи</label>
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
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Приоритет</label>
              <md-select name="priority  " id="priority">
                <md-option
                  v-for="one in priority"
                  :value="one.value"
                  v-bind:key="one.value"
                >{{ one.name }}</md-option>
              </md-select>
            </md-field>
          </div>

            <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Категория</label>
              <md-select name="category  " id="category">
                <md-option
                  v-for="one in category"
                  :value="one.value"
                 v-bind:key="one.value"
                >{{ one.name }}</md-option>
              </md-select>
            </md-field>
          </div>
         
         <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Метки</label>
              <md-select name="tag  " id="tag">
                <md-option
                  v-for="one in tag"
                  :value="one.value"
                  v-bind:key="one.value"
                >{{ one.name }}</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Родительская задача</label>
              <md-select name="tag  " id="tag">
                <md-option
                  v-for="one in parent"
                  :value="one.value"
                  v-bind:key="one.value"
                >{{ one.name }}</md-option>
              </md-select>
            </md-field>
          </div>
  <div class="md-layout-item md-small-size-100 md-size-50">
    <label>Дата начала</label>
         
              <!-- <datepicker></datepicker> -->
              <datepicker  v-model="dateStart" :clear-button="true" :language="ru" input-class="date-picker" :format="format"/>
              <!-- <md-datepicker  v-model="dateStart" :md-open-on-focus="false" :md-immediately="true"></md-datepicker> -->
        
          </div>

           <div class="md-layout-item md-small-size-100 md-size-50">
             <label>Дата завершения</label>
          
          
           <datepicker  v-model="dateEnd" :clear-button="true" :language="ru" input-class="date-picker" :format="format"/>
              <!-- <md-datepicker  v-model="dateEnd" :md-open-on-focus="false" :md-immediately="true"></md-datepicker> -->
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>Приложенные файлы</label>
            <md-field>
              
              <!-- <md-input v-model="file" type='file'></md-input> -->
             <md-file v-model="file" multiple  />
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Сохранить</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<style>
.date-picker {
  width:90%;
  border: none;
  border-bottom: 1px solid #d2d2d2; 
}
.date-picker:focus {
  border-bottom: 1px solid #a84db8; 
}
</style>
<script>
import { VueEditor } from "vue2-editor";
import Datepicker from 'vuejs-datepicker';
import {en, ru} from 'vuejs-datepicker/dist/locale'
// this.dateFormat = 'yyyy/MM/dd'
export default {
   components: {
    VueEditor,
    Datepicker,
    en,
    ru
  },
  name: "edit-task",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      format:'yyyy-dd-MM',
      ru: ru,
      content: "<h1>Some initial content</h1>",
      // dateFormat : 'yyyy/MM/dd',
    //  ru: 'ru',
      dateStart: null,
      dateEnd: null,
      file: null,
      parent: [
         {
          name: "Род1",
          value: 1
        },
        {
          name: "Род2",
          value: 2
        }
      ],

      tag: [
         {
          name: "Таг1",
          value: 1
        },
        {
          name: "Таг12",
          value: 2
        }
      ],
      priority: [
        {
          name: "Низкий",
          value: 1
        },
        {
          name: "Средний",
          value: 2
        },
        {
          name: "Высокий",
          value: 3
        },
        {
          name: "Наивысший",
          value: 4
        }
      ],
      category:  [
        {
          name: "Перв",
          value: "1"
        },
        {
          name: "Втор",
          value: "2"
        }
      ],
      username: null,
      title: null,
      emailadress: null,
      lastname: null,
      firstname: null,
      address: null,
      city: null,
      country: null,
      code: null,
      description: "Пиши"
    };
  },
};

</script>
<style></style>
