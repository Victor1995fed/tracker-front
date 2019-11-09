<template>

    <div class="md-table-custom">
<!--        <md-table v-model="task" :table-header-color="tableHeaderColor">-->
<!--            <md-table-row slot="md-table-row" slot-scope="{ item }">-->
<!--                <md-table-cell md-label="#">{{ item.id }}</md-table-cell>-->
<!--                <md-table-cell md-label="Действия">-->
<!--                <md-button class="md-just-icon md-simple md-primary" :href="'/#/task/update/'+ item.id">-->
<!--                    <md-icon>edit</md-icon>-->
<!--                    <md-tooltip  md-direction="top">Редактировать</md-tooltip>-->
<!--                </md-button>-->
<!--                    <md-button class="md-just-icon md-simple md-primary" :href="'/#/task/view/'+ item.id">-->
<!--                        <md-icon ><img src="@/assets/img/view.svg" alt="view"></md-icon>-->

<!--                        <md-tooltip  md-direction="top">Просмотреть</md-tooltip>-->
<!--                    </md-button>-->
<!--                </md-table-cell>-->
<!--                <md-table-cell md-label="Тема">{{ item.title }}</md-table-cell>-->
<!--                <md-table-cell  md-label="Проект" ><span v-if="item.project !== null"><a :href="'#/project/view/'+item.project.id">{{ item.project.title }}</a></span><span v-else>&mdash;</span> </md-table-cell>-->
<!--                <md-table-cell  md-label="Статус">{{ item.status.title }}</md-table-cell>-->
<!--                <md-table-cell md-label="Приоритет">{{ item.priority.title }}</md-table-cell>-->
<!--                <md-table-cell md-label="Дата завершения"><span v-if="item.date_end !== null">{{ item.date_end }}</span><span v-else>&mdash;</span> </md-table-cell>-->
<!--            </md-table-row>-->
<!--        </md-table>-->

        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Users</h1>
            </md-table-toolbar>
            <md-table-row>
                <md-table-head ><span @click="applyFilter" class="label-header"> # <i class="arrow up"></i></span></md-table-head>
                <md-table-head> <span @click="applyFilter" class="label-header">Действия <i class="arrow up"/> </span> </md-table-head>
                <md-table-head><span @click="applyFilter" class="label-header">Тема <i class="arrow up"/></span></md-table-head>
                <md-table-head><span @click="applyFilter" class="label-header">Проект <i class="arrow up"/></span></md-table-head>
                <md-table-head><span @click="applyFilter" class="label-header">Приоритет <i class="arrow up"/></span></md-table-head>
                <md-table-head><span @click="applyFilter" class="label-header">Статус <i class="arrow up"/></span></md-table-head>
                <md-table-head><span @click="applyFilter" class="label-header">Дата завершения <i class="arrow down"/></span></md-table-head>
            </md-table-row>

            <md-table-row v-for="item in task">
                <md-table-cell md-numeric>{{item.id}}</md-table-cell>
                <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary" :href="'/#/task/update/'+ item.id">
                        <md-icon>edit</md-icon>
                        <md-tooltip  md-direction="top">Редактировать</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-primary" :href="'/#/task/view/'+ item.id">
                        <md-icon ><img src="@/assets/img/view.svg" alt="view"></md-icon>
                        <md-tooltip  md-direction="top">Просмотреть</md-tooltip>
                    </md-button>
                </md-table-cell>
                <md-table-cell>{{ item.title }}</md-table-cell>
                <md-table-cell><span v-if="item.project !== null"><a :href="'#/project/view/'+item.project.id">{{ item.project.title }}</a></span><span v-else>&mdash;</span></md-table-cell>
                <md-table-cell>{{ item.status.title }}</md-table-cell>
                <md-table-cell>{{ item.priority.title }}</md-table-cell>
                <md-table-cell><span v-if="item.date_end !== null">{{ item.date_end }}</span><span v-else>&mdash;</span></md-table-cell>
            </md-table-row>
        </md-table>

        <div class="pagination-custom">
            <paginate
                    v-model="currentPage"
                    ref="paginate"
                    :force-page="2"
                    :page-count="pageCount"
                    :page-range="3"
                    :margin-pages="3"
                    :click-handler="clickCallback"
                    :prev-text="'Предыдущая'"
                    :next-text="'Следующая'"
                    :container-class="'pagination'"
                    :page-class="'page-item'">
            </paginate>
        </div>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'
    export default {
        name: "task-list",
        components: {
            Paginate
        },
        props: {
            tableHeaderColor: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                pageCount:5,
                currentPage : 1,
                task: [],
                selected: [],
                users: []
            };
        },

        mounted() {
             this.currentPage = (this.$route.params.page !== undefined) ?  Number(this.$route.params.page) : 1;
            console.log(this.currentPage);

            console.log(this.$refs.paginate)
            this.$http.get(this.$settings.TASK_LIST+'?page='+this.currentPage).then(response => {

                this.task = response.data.task
                this.pageCount = response.data.countPage

            })
        },
        methods:{
            clickCallback: function(page) {
                console.log(page)
                this.$router.push('/task/' + page);
                this.$http.get(this.$settings.TASK_LIST+'?page='+page).then(response => {
                this.task = response.data.task
                this.pageCount = response.data.countPage
            })
            },
            applyFilter:function () {
                console.warn('dff')
                alert('dfd')
            }
        },
    };
</script>

<style scoped>
    a.title-link {
        color: black !important;
    }
    .label-header {
        cursor: pointer;
    }
    .label-header:hover {
        color: #2196f3;
    }
     i.arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }


    .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
</style>
