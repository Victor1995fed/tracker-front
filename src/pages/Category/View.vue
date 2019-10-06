<template>
    <div class="content">
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Вы действительно хотите удалить эту категорию?</md-dialog-title>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Нет</md-button>
                <md-button class="md-danger" @click="deleteCategory">Да</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="md-layout">
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Категория:  <span>{{response.category.title}}</span></h4>
                        <p v-if="response.category.parent_id != null && response.parentCategory != null">Основная категория: <a :href="'/#/category/view/'+response.category.parent_id" target="_blank">{{response.parentCategory.title}} </a></p>
                        <!-- <p class="category">{{task.task.title}}</p> -->
                    </md-card-header>
                    <md-card-content>
                        <div id="typography">
                            <div class="title">
                                <div class="md-layout">
                                    <div class="md-layout-item">
                                        <md-button class="md-just-icon md-simple md-primary" :href="'/#/category/update/'+this.$route.params.id">
                                            <md-icon>edit</md-icon>
                                            <md-tooltip md-direction="top">Редактировать</md-tooltip>
                                        </md-button>
                                        <md-button @click="showDialog  = true" class="md-just-icon md-simple md-danger">
                                            <md-icon>close</md-icon>
                                            <md-tooltip md-direction="top">Удалить</md-tooltip>
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <hr />
                                <div class="md-layout">
                                    <div class="md-layout-item">
                                        <h4>Описание</h4>
                                        <!--                        <vue-editor v-model="response.description"></vue-editor>-->
                                        <div class="ql-editor" v-html="response.category.description"></div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import repository from "@/settings.js";
    export default {
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            }
        },
        data: () => ({
            showDialog: false,
            response: [],
            priority: "Высокий",
            dateStart: "23.08.2019",
            dateEnd: "23.08.2019",
            amount: 90,
            content: "gives the styles and works fine with dark themes. Look:"
        }),
        mounted() {

            // Vue.material.locale.dateFormat = 'dd/MM/yyyy'
            // console.log(Vue.material.locale.dateFormat);
            let id = this.$route.params.id;
            axios.get(repository.API + "category/view?id=" + id).then(response => {
                this.response = response.data;
            });
        },
        methods: {
            deleteCategory() {
                let _this = this
                axios.get(repository.API+'category/delete?id='+this.$route.params.id)
                    .then(function(response){
                        if (response.data) {
                            _this.$router.push('/project/list');
                        }
                        else{
                            alert('error')
                        }
                    })
            },

        }
    };
</script>

<style lang="css">
    @import "~vue2-editor/dist/vue2-editor.css";
    /* Import the Quill styles you want */
    @import '~quill/dist/quill.core.css';
    @import '~quill/dist/quill.bubble.css';
    @import '~quill/dist/quill.snow.css';
    small {
        display: block;
    }
    .ql-editor {
        min-height: 50px;
    }
</style>