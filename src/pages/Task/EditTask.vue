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
   
         
    
              <md-datepicker ref="datePicker" v-on:md-opened="changeText"  v-model="dateStart" :md-open-on-focus="false" :md-immediately="true"><label>Дата начала</label></md-datepicker>
         
          </div>

           <div class="md-layout-item md-small-size-100 md-size-50">
              
              <md-datepicker  v-model="dateEnd" v-on:md-opened="changeText" :md-open-on-focus="false" :md-immediately="true"><label>Дата завершения</label></md-datepicker>
           
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
           
            <md-field>
               <label>Приложенные файлы</label>
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
import Vue from 'vue'
export default {
   components: {
    VueEditor
  },
  name: "edit-task",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods:{
 changeText: function(event){
     this.$nextTick(function () {
let datepickerFooter = document.getElementsByClassName('md-datepicker-body-footer')[0]
let buttonDatepicker = datepickerFooter.getElementsByClassName('md-button-content')[0]
buttonDatepicker.innerText = 'Отмена'
  })

// for(var i=0; i < test.length; i++) { 
//   console.log(test[i])
// }
//  test.innerText = 'dfdf'

 }
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
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
   mounted() {
// console.log(this.$refs.datePicker)
// console.log(this.$refs.datePicker)
// console.dir(this.$children);
        Vue.material.locale = {
          mdCancelText:'sdsd',
    // range for datepicker
    startYear: 1900,
    endYear: 2099,
    // date format for date picker
    dateFormat: 'dd.MM.yyyy',
    // i18n strings
    days: ['Воскреенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    shorterDays: ['В', 'П', 'В', 'Ср', 'Ч', 'П', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
    shorterMonths: ['Я', 'Ф', 'М', 'А', 'М', 'Ин', 'Ил', 'Ав', 'Се', 'О', 'Н', 'Д'],
 firstDayOfAWeek: 1
  }
    },

    updated: function () {
  this.$nextTick(function () {

  })
}
};

</script>
