    <template>
    <div class="content">
        <div class="md-layout">
        <div class="md-layout-item">
            <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Название проекта #878</h4>
                <p class="category">{{task.task.title}}</p>
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
                        {{task.task.date}}
                        </p>
                    </div>
                    </div>
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Приоритет:</span>
                        {{task.priority.title}}
                        </p>
                    </div>
                    <div class="md-layout-item">
                        <p>
                        <span class="md-body-2">Дата завершения:</span>
                        {{dateEnd}}
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
                        <span class="md-body-2">Готовность:</span>
                        <span>{{amount}}</span>%
                        </p>
                        <md-progress-bar
                        class="md-transparent"
                        md-mode="determinate"
                        :md-value="amount"
                        ></md-progress-bar>
                    </div>
                    </div>
                    <hr />
                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>Описание</h4>
                        <span v-html="task.task.description"></span>
                    </div>
                    </div>
                    <hr />

                    <div class="md-layout">
                    <div class="md-layout-item">
                        <h4>Приложенные файлы:</h4>
                        <p>
                        <a href="#">Links1</a>
                        </p>
                        <p>
                        <a href="#">Links2</a>
                        </p>
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
        task: [],
        priority: "Высокий",
        dateStart: "23.08.2019",
        dateEnd: "23.08.2019",
        amount: 90,
        content: "gives the styles and works fine with dark themes. Look:"
    }),
    mounted() {
        let id = this.$route.params.id;
        console.log({ router: this.$router });
        axios.get(repository.API + "task/view?id=" + id).then(response => {
        this.task = response.data;
        });
    }
    };
    </script>

    <style lang="scss" scoped>
    small {
    display: block;
    }
    </style>