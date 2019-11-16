    <template>
    <div class="content">
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Вы действительно хотите удалить этот проект?</md-dialog-title>

            <md-dialog-actions>
                <md-button class="md-default" @click="showDialog = false">Нет</md-button>
                <md-button class="md-danger" @click="deleteProject">Да</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="md-layout">
        <div class="md-layout-item">
            <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title"><span>{{response.project.title}}</span></h4>
                <!-- <p class="category">{{task.task.title}}</p> -->
            </md-card-header>
            <md-card-content>
                <div id="typography">
                <div class="title">
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <md-button class="md-just-icon md-simple md-primary" :href="'/#/project/update/'+this.$route.params.id">
                        <md-icon>edit</md-icon>
                        <md-tooltip  md-direction="top">Редактировать</md-tooltip>
                        </md-button>
<!--                        <md-button @click="deleteProject" class="md-just-icon md-simple md-danger">-->
                        <md-button @click="showDialog  = true" class="md-just-icon md-simple md-danger">
                        <md-icon>close</md-icon>
                        <md-tooltip md-direction="top">Удалить</md-tooltip>
                        </md-button>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="md-layout">
                        <div class="md-layout-item">
                            <p>
                                <span class="md-body-2">Дата создания:</span>
                                {{response.project.date}}
                            </p>
                        </div>
                        <div class="md-layout-item">
                            <p>
                                <span class="md-body-2">Статус:</span>
                                {{response.status.title}}
                            </p>
                        </div>

                    </div>
                    <hr />
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>Описание</h4>
<!--                        <vue-editor v-model="response.description"></vue-editor>-->
                        <div class="ql-editor" v-html="response.project.description"></div>
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

    export default {
    props: {
        dataBackgroundColor: {
        type: String,
        default: ""
        }
    },
    data: () => ({
        response: [],
        showDialog : false,
        priority: "Высокий",
        dateStart: "23.08.2019",
        dateEnd: "23.08.2019",
        amount: 90,
        content: "gives the styles and works fine with dark themes. Look:"
    }),
    mounted() {
        let id = this.$route.params.id;
        this.$http.get(this.$settings.PROJECT_VIEW + "?id=" + id).then(response => {
            if (response.data) {
                this.response = response.data;
            }
            else
                {
                    this.$router.push('/404');
            }
        }).catch((error) => {
            console.warn('Ошибка' + error);
            this.$router.push('/404');
        });
    },
        methods: {
            deleteProject() {
                let _this = this
                this.$http.delete(_this.$settings.PROJECT_DELETE+'?id='+this.$route.params.id)
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
