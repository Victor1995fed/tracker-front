<template>

  <form novalidate @submit.prevent="validateFields">
    <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Название проекта</h4>
      </md-card-header>
            <md-card-content>
                <div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field :class="getValidationClass('title')">
                            <label>Название  заметки</label>
                            <md-input v-model="form.title" autocomplete="given-name" :disabled="sending"></md-input>
                            <span class="md-error" v-if="!$v.form.title.required">Название обязательно</span>
                            <span class="md-error" v-else-if="!$v.form.title.minlength">Минимум 3 символа</span>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-100">
                        <label>Основное</label>
                        <md-field maxlength="5">
                            <div id="app">
                                <vue-editor v-model="form.content"></vue-editor>
                            </div>
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
        name: "edit-note",
        mixins: [validationMixin],
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            },
            form:{
                default: {
                        title: null,
                        content: null,
                }
            },
            action: {},

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
            };
        },
        methods: {
            checkValue(){

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
                        formData.append(key,  this.form[key]);
                    }
                }
                if(this.form.dataFile != null){
                    for (var i = 0; i < this.form.dataFile.length; i++) {
                        let file = this.form.dataFile[i];
                        formData.append('file[]', file);
                    }
                }
                let taskId = this.$route.params.id;
                let method = (this.action == 'note/create') ? 'post' : 'put';

                const options = {
                    method: method,
                    responseType:'json',
                    url: this.$settings.API + this.action + ((taskId !== undefined) ? '?id='+taskId : ''),
                    data: formData,
                    transformResponse: [(data) => {
                        if (data) {
                            _this.$router.push('/note/view/'+data);
                        }
                        else{
                            alert('error')
                        }
                    }]
                };
                this.$http(options);
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


        },
        updated: function () {
            this.$nextTick(function () {

            })
        }
    };

</script>
<style scoped>
    .md-card-content input {
        color: white !important;
    }
</style>
