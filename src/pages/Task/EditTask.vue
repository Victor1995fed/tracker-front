<template>
  <form novalidate @submit.prevent="validateFields">
    <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Название проекта</h4>
                <p class="category">Название задачи если есть</p>
      </md-card-header>

            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Проект</label>
                            <md-select name="project" id="project" v-model="form.project">
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
                            <md-select name="priority" id="priority" v-model="form.priority">
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
                            <md-select name="category" id="category" v-model="form.category">
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


                        <md-datepicker ref="datePicker"  v-on:md-opened="changeText" v-model="form.dateStart"
                                       :md-open-on-focus="false" :md-immediately="true"><label>Дата начала</label>
                        </md-datepicker>

                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">

                        <md-datepicker v-model="form.dateEnd"  v-on:md-opened="changeText" :md-open-on-focus="false"
                                       :md-immediately="true"><label>Дата завершения</label></md-datepicker>

                    </div>


                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <label>Прогресс</label>
                        <md-field>

                            <!-- <md-input v-model="file" type='file'></md-input> -->
                            <input type="range" v-model.number="form.amount"> {{ form.amount }}%

                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">

                        <md-field>
                            <label>Приложенные файлы</label>
                            <!-- <md-input v-model="file" type='file'></md-input> -->
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
    import repository from '@/settings.js';
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
            }
        },
        methods: {
            onFileChange(e) {
                this.form.dataFile = e.target.files
                // let now = new Date()
                // let dateStart= format(this.form.dateStart,"YYYY-MM-DD")
                // let dateStart = new Date(this.form.dateStart)
                // console.log("date", dateStart);
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
                //TODO: Положить добавление в цикл
                formData.append('title', (this.form.title == null) ? '' : this.form.title);
                formData.append('description', this.form.description);
                formData.append('priority_id', this.form.priority);
                formData.append('project_id', this.form.project);
                formData.append('category_id', this.form.category);
                formData.append('readiness', this.form.amount);
                formData.append('date_end', format(this.form.dateEnd,"YYYY-MM-DD"));
                formData.append('date_start', format(this.form.dateStart,"YYYY-MM-DD"));

                console.log('FILE', this.form.dataFile);
                // formData.append('file', this.form.dataFile[0]);
                if(this.form.dataFile != null){
                    for (var i = 0; i < this.form.dataFile.length; i++) {
                        let file = this.form.dataFile[i];
                        formData.append('file[]', file);
                    }
                }

                // formData.append('file', this.form.dataFile);
                axios.post(repository.API + 'task/create',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function (response) {
                        console.log(response.data)
                        if (response.data.result) {
                            _this.$router.push('/task/view/' + response.data.id);
                        } else {
                            alert('error' + response.data.message)
                        }
                    })
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
        data() {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date()
            return {
                response: [],
                form: {
                    title: null,
                    category: null,
                    description: '',
                    priority: null,
                    tag: null,
                    file: null,
                    dateEnd: null,
                    dateStart: null,
                    amount: 0,
                    dataFile: null,
                },
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

                description: "Пиши"
            };
        },
        mounted() {
            axios.get(repository.API + 'task/edit').then(response => {
                this.response = response.data
            })
        },

        updated: function () {
            this.$nextTick(function () {

            })
        }
    };

</script>
