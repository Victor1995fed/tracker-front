    <template>
    <div class="content">
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Вы действительно хотите удалить эту задачу?</md-dialog-title>

            <md-dialog-actions>
                <md-button  @click="showDialog = false">Нет</md-button>
                <md-button class="md-danger" @click="deleteTask">Да</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="md-layout">
        <div class="md-layout-item">
            <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">{{response.note.title}}</h4>
            </md-card-header>
            <md-card-content>
                <div id="typography">
                <div class="title">
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <md-button class="md-just-icon md-simple md-primary" :href="'/#/note/update/'+this.$route.params.id">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="top">Редактировать</md-tooltip>
                        </md-button>
                        <md-button  @click="showDialog  = true" class="md-just-icon md-simple md-danger">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="top">Удалить</md-tooltip>
                        </md-button>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Дата изменения:</span>
                        {{response.note.date_create}}
                        </p>
                    </div>
                    </div>


                    <hr />
                    <div class="md-layout layout-height-min">

                        <div class="ql-editor" v-html="response.note.content"></div>


                    </div>
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
        components: {
        },
    props: {
        dataBackgroundColor: {
        type: String,
        default: ""
        }
    },
    data: () => ({
        showDialog: false,
        urlChildTask:'note/create',
        response: {
            note:{}
        },
    }),
    mounted() {

        // Vue.material.locale.dateFormat = 'dd/MM/yyyy'
        // console.log(Vue.material.locale.dateFormat);
        let id = this.$route.params.id;
        axios.get(repository.API + "note/view?id=" + id).then(response => {
        this.response = response.data;

        });
        this.urlChildTask = '#/note/create/'+id;
    },
        methods: {
            deleteTask() {
                let _this = this
                axios.delete(repository.API+'note/delete?id='+this.$route.params.id)
                    .then(function(response){
                        if (response.data) {
                            _this.$router.push('/note/list');
                        }
                        else{
                            alert('error')
                        }
                    })
            },

        }
    };
    </script>

    <style lang="scss" scoped>
    small {
    display: block;
    }
        .layout-height-min {
            min-height: 400px;
        }
        .md-tabs-navigation{
            box-shadow: none !important;
        }
    </style>
