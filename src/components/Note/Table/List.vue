<template>
    <div class="md-table-custom">
        <md-table v-model="note" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Действия">
                <md-button class="md-just-icon md-simple md-primary" :href="'/#/note/update/'+ item.id">
                    <md-icon>edit</md-icon>
                    <md-tooltip  md-direction="top">Редактировать</md-tooltip>
                </md-button>
                    <md-button class="md-just-icon md-simple md-primary" :href="'/#/note/view/'+ item.id">
                        <md-icon ><img src="@/assets/img/view.svg" alt="view"></md-icon>

                        <md-tooltip  md-direction="top">Просмотреть</md-tooltip>
                    </md-button>
                </md-table-cell>
                <md-table-cell md-label="Название">{{ item.title }}</md-table-cell>

                <md-table-cell md-label="Дата создания">{{ item.date_create }} </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="pagination-custom">
            <paginate
                    v-model="currentPage"
                    ref="paginate"
                    :force-page="2"
                    v-if="pageCount > 1"
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
        name: "note-list",
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
                note: [],
                selected: [],
                users: []
            };
        },

        mounted() {

             this.currentPage = (this.$route.params.page !== undefined) ?  Number(this.$route.params.page) : 1;
            this.$http.get(this.$settings.NOTE_LIST+'?page='+this.currentPage).then(response => {

                this.note = response.data.note
                this.pageCount = response.data.countPage

            })
        },
        methods:{
            clickCallback: function(page) {
                console.log(page)
                this.$router.push('/note/' + page);
                this.$http.get(this.$settings.NOTE_LIST+'?page='+page).then(response => {
                this.note = response.data.note
                this.pageCount = response.data.countPage
            })
                // location.reload()
            }
        },
    };
</script>

<style scoped>
    a.title-link {
        color: black !important;
    }
</style>
