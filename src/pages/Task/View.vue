    <template>
    <div class="content">
        <div class="md-layout">
        <div class="md-layout-item">
            <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">{{response.task.title}}</h4>
                <p class="category">{{response.category.title}}</p>
            </md-card-header>
            <md-card-content>
                <div id="typography">
                <div class="title">
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <md-button class="md-just-icon md-simple md-primary">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="top">Редактировать</md-tooltip>
                        </md-button>
                        <md-button class="md-just-icon md-simple md-danger">
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
                        <span class="md-body-2">Статус:</span> Новая
                        </p>
                    </div>
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Дата начала:</span>
                        {{response.task.date_start}}
                        </p>
                    </div>
                    </div>
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Приоритет:</span>
                        {{response.priority.title}}
                        </p>
                    </div>
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Дата завершения:</span>
                        {{response.task.date_end}}
                        </p>
                    </div>
                    </div>

                    <div class="md-layout">
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Метки:</span>
                        <md-chip md-clickable>Clickable1</md-chip>
                        <md-chip md-clickable>Clickable2</md-chip>
                        <md-chip md-clickable>Clickable3</md-chip>
                        <md-chip md-clickable>Clickable4</md-chip>
                        <md-chip md-clickable>Clickable5</md-chip>
                        </p>
                    </div>
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Потрачено(ч):</span>
                            {{response.task.spending}}
                        </p>
                    </div>

                    </div>


                       <div class="md-layout">
                       <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Готовность:</span>
                        <span>{{response.task.readiness}}</span>%
                        </p>
                        <md-progress-bar
                        class="md-transparent"
                        md-mode="determinate"
                        :md-value="response.task.readiness"
                        ></md-progress-bar>
                    </div>
                    </div>
                    <hr />
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>Описание</h4>
                        <span v-html="response.task.description"></span>
                    </div>
                    </div>
                    <hr />

                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>Приложенные файлы:</h4>
                        <div class="link-files"  v-for="(data,index) in response.files" :key="index">
                            <p>
                                <a :href="url+data.uuid">{{data.title}}</a>
                            </p>

                        </div>

                    </div>
                    </div>
                    <hr />
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>История</h4>
                        <p>Действие 1 1 1 1</p>
                        <hr />
                        <p>Действие 22</p>
                    </div>
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
    props: {
        dataBackgroundColor: {
        type: String,
        default: ""
        }
    },
    data: () => ({
        response: {
            task:{},
            category:{},
            files:{},
            priority:{},
        },
        url: 'http://tracker.zz/files/download?uuid=',
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
        axios.get(repository.API + "task/view?id=" + id).then(response => {
        this.response = response.data;
        });
    }
    };
    </script>

    <style lang="scss" scoped>
    small {
    display: block;
    }
    </style>