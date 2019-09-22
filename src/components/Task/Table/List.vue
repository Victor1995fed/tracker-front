<template>
    <div>
        <md-table v-model="task" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Тема"><a :href="'#/task/view/'+item.id">{{ item.title }}</a></md-table-cell>
                <!-- <md-table-cell md-label="Проект">{{ item.project }}</md-table-cell> -->
                <md-table-cell md-label="Категория">{{ item.category.title }}</md-table-cell>
                <md-table-cell md-label="Приоритет">{{ item.priority.title }}</md-table-cell>
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
    import axios from 'axios';
    import repository from '@/settings.js';
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
            // if(this.currentPage === undefined){
            //     this.currentPage = 1;
            // }

            console.log(this.$refs.paginate)
            // this.$refs.paginate.selected = currentPage
            axios.get(repository.API+'task/index?page='+this.currentPage).then(response => {

                this.task = response.data.task
                this.pageCount = response.data.countPage

            })
        },
        methods:{
            clickCallback: function(page) {
                console.log(page)
                this.$router.push('/task/' + page);
                 axios.get(repository.API+'task/index?page='+page).then(response => {
                this.task = response.data.task
                this.pageCount = response.data.countPage
            })
                // location.reload()
            }
        },
    };
</script>
