<template>
  <form novalidate @submit.prevent="validateFields">
    <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Название проекта</h4>
                <p v-if="isChild">Родительская задача : {{parentTask.title}} </p>
      </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Проект</label>
                            <md-select name="project" id="project" v-model="form.project_id">
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
                        <md-field :class="getValidationClass('title')">
                            <label>Название задачи</label>
                            <md-input v-model="form.title" autocomplete="given-name" :disabled="sending"></md-input>
                            <span class="md-error" v-if="!$v.form.title.required">Название обязательно</span>
                            <span class="md-error" v-else-if="!$v.form.title.minlength">Минимум 3 символа</span>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-100">
                        <label>Описание</label>
                        <md-field maxlength="5">
                            <div id="app">
                                <vue-editor v-model="form.description"></vue-editor>
                            </div>
                            <!-- <md-textarea v-model="description"></md-textarea> -->
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                            <label>Приоритет</label>
                            <md-select name="priority" id="priority" v-model="form.priority_id">
                                <md-option

                                        v-for="one in response.priority"
                                        :value="one.id"
                                        v-bind:key="one.id"
                                >{{ one.title }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                            <label>Категория</label>
                            <md-select name="category" id="category" v-model="form.category_id">
                                <md-option
                                        v-for="one in response.category"
                                        :value="one.id"
                                        v-bind:key="one.id"
                                >{{ one.title }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                            <label>Метки</label>
                            <md-select name="tag" id="tag" v-model="form.tag">
                                <md-option
                                        v-for="one in tag"
                                        :value="one.value"
                                        v-bind:key="one.value"
                                >{{ one.name }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">


                        <md-datepicker ref="datePicker"  v-on:md-opened="changeText" v-model="form.date_start"
                                       :md-open-on-focus="false" :md-immediately="true"><label>Дата начала</label>
                        </md-datepicker>

                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">

                        <md-datepicker v-model="form.date_end"  v-on:md-opened="changeText" :md-open-on-focus="false"
                                       :md-immediately="true"><label>Дата завершения</label></md-datepicker>

                    </div>


                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <label>Прогресс</label>
                        <md-field>

                            <input type="range" v-model.number="form.readiness"> {{ form.readiness }}%

                        </md-field>
                    </div>
                    <div v-if="action == this.$settings.TASK_UPDATE" class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>

                            <md-field>
                                <label>Трудозатраты</label>
                                <md-input v-model="form.spending" ref="spending"  @change="checkValue" max="100" type="number"></md-input>
                            </md-field>
                        </md-field>
                    </div>
                    <div v-if="action == this.$settings.TASK_UPDATE" class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                            <label>Статус</label>
                            <md-select name="status" id="status" v-model="form.status_id">
                                <md-option
                                        v-for="one in response.status"
                                        :value="one.id"
                                        v-bind:key="one.id"
                                >{{ one.title }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Приложенные файлы</label>
                            <md-file v-model="form.file" ref='files' multiple @change="onFileChange"/>
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
    import axios from 'axios';
    import {VueEditor} from "vue2-editor";
    import format from 'date-fns/format'
    import {validationMixin} from 'vuelidate'
    import {
        required,
        minLength,
    } from 'vuelidate/lib/validators'

    export default {
        components: {
            VueEditor
        },
        name: "edit-task",
        mixins: [validationMixin],
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            },
            form:{
                default: {
                        title: null,
                        category_id: null,
                        description: '',
                        priority_id: null,
                        tag: null,
                        file: null,
                        date_end: null,
                        date_start: null,
                        amount: 0,
                        dataFile: null,
                        project_id:null,
                        status_id: null,
                        parent_id: null
                }
            },
            action: {},
            parent_id:{
                default:null
            }

        },
        data() {
            return {
                isChild:false,
                parentTask:{},
                response: [],
                sending: false,
                amount: 10,
                dateStart: null,
                dateEnd: null,
                file: null,
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
            };
        },
        methods: {
            checkValue(){
                // let form.spending = this.$refs.spending
                console.log(this.form.spending)
                if(this.form.spending > 100){
                    this.form.spending = 100
                }
                else if(this.form.spending <= 0.1 && this.form.spending != 0){
                    this.form.spending= 0.1
                }
            },
            onFileChange(e) {
                this.form.dataFile = e.target.files
            },
            validateFields() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.save()
                }
            },
            save() {
                this.sending = true
                this.taskSend()
            },
            taskSend() {
                let _this = this
                const formData = new FormData();
                for (var key in this.form) {
                    if(this.form[key] !== undefined && this.form[key] !== null){
                        formData.append(key, (key == 'date_end' || key == 'date_start') ? format(this.form[key],this.$settings.DATE_FORMAT)  : this.form[key]);
                    }
                }
                if(this.form.dataFile != null){
                    for (var i = 0; i < this.form.dataFile.length; i++) {
                        let file = this.form.dataFile[i];
                        formData.append('file[]', file);
                    }
                }
                let taskId = this.$route.params.id;
                let method = (this.action == this.$settings.TASK_CREATE) ? 'post' : 'put';

                const options = {
                    method: method,
                    responseType:'json',
                    url: this.action + ((taskId !== undefined) ? '?id='+taskId : ''),
                    data: formData,
                    transformResponse: [(data) => {
                        if (data.result) {
                            _this.$router.push('/task/view/'+data.id);
                        }
                        else{
                            alert('error'+data.message)
                        }
                    }]
                };
                axios(options);
            },
            changeText: function () {
                this.$nextTick(function () {
                    let datepickerFooter = document.getElementsByClassName('md-datepicker-body-footer')[0]
                    let buttonDatepicker = datepickerFooter.getElementsByClassName('md-button-content')[0]
                    buttonDatepicker.innerText = 'Отмена'
                })

            },
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]
                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
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

        mounted() {
            let parent_id = this.$route.params.parent_id;
            this.$http.get(this.$settings.API + 'task/edit').then(response => {
                this.response = response.data
            })
            if(parent_id !== null && parent_id !== undefined){
                this.isChild = true;
                this.form.parent_id = parent_id
                this.$http.get(this.$settings.API + 'task/view?id='+parent_id).then(response => {
                    this.parentTask = response.data.task
                    this.form.project_id = response.data.task.project_id
                    this.form.category_id = response.data.task.category_id
                })
            }


        },
        updated: function () {
            this.$nextTick(function () {

            })
        }
    };

</script>
<style scoped>
    .md-card-content input {
        color: black !important;
    }
</style>
