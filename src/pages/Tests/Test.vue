<template>
    <div class="pagination-custom">
    <paginate

            :page-count="page"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Предыдущая'"
            :next-text="'Следующая'"
            :container-class="'pagination'"
            :page-class="'page-item'">
    </paginate>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'

    export default {
        name: 'App',
        components: {
            Paginate
        },
        data: function () {
            return {
                page:5,
                arrayData: [
                    {
                        data: 'Page № 1'
                    },
                    {
                        data: 'Page № 2'
                    },
                    {
                        data: 'Page № 3'
                    },
                    {
                        data: 'Page № 3'
                    },
                    {
                        data: 'Page № 3'
                    },
                ]
            }
        },
        computed: {
            settings: function () {
                return {
                    arrayData: this.arrayData,
                    PaginationControlSettings:{maxButtons:2}
                }
            },

            set :function () {
                return {
                    arrayData: this.arrayData,
                    PaginationControlSettings:{maxButtons:2, color:"#57af5b"}
                }
            },

        },
        methods:{
            clickCallback: function(page) {
                console.log(page)
                this.$router.push('/test/' + page);
            }
        },
    }
</script>
