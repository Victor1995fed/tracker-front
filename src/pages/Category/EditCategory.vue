<template>
    <form novalidate method="POST" class="md-layout" @submit.prevent="validateFields" ref="formData">
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Название категории </h4>
                <p v-if="isChild">Родительская задача : {{parentCategory.title}} </p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field :class="getValidationClass('title')" >
                            <label>Название</label>
                            <md-input  name="title"  autocomplete="given-name" v-model="form.title" ref="title" :disabled="sending"></md-input>
                            <span class="md-error" v-if="!$v.form.title.required">Название обязательно</span>
                            <span class="md-error" v-else-if="!$v.form.title.minlength">Минимум 3 символа</span>
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
    import { validationMixin } from 'vuelidate'
    import {
        required,
        minLength,
    } from 'vuelidate/lib/validators'
    export default {
        name: "edit-category",
        mixins: [validationMixin],
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            },
            form:{},
            action: {}

        },
        data() {
            return {
                isChild:false,
                parentCategory:{},
                rules:[],
                amount:10,
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
                this.getRequest()
            },
            validateFields () {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            },
            getRequest(){
                let _this = this
                const formData = new FormData();
                for (var key in this.form) {
                    if(this.form[key] !== undefined && this.form[key] !== null){
                        formData.append(key, this.form[key]);
                    }
                }
                let categoryId = this.$route.params.id;
                let method = (this.action == 'category/create') ? 'post' : 'put';
                const options = {
                    method: method,
                    responseType:'json',
                    url: repository.API + this.action + ((categoryId !== undefined) ? '?id='+categoryId : ''),
                    data: formData,
                    transformResponse: [(data) => {
                        console.log(data)
                        if (data.result) {
                            _this.$router.push('/category/view/'+data.id);
                        }
                        else{
                            alert('error'+data.message)
                        }
                    }]
                };
                axios(options);
            },
        },
        mounted() {
            let parent_id = this.$route.params.parent_id;
            if(parent_id !== null && parent_id !== undefined){
                this.isChild = true;
                this.form.parent_id = parent_id
                axios.get(repository.API + 'category/view?id='+parent_id).then(response => {
                    this.parentCategory = response.data.category
                    this.form.parent_id = parent_id
                })
            }


        },


    };

</script>
