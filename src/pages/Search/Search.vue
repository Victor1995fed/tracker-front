<template>
    <div class="content-search">
        <h3>Найдены следующие совпадения:</h3>
        <div v-for="one in response" class="custom-layout clear-fix">
            <div class="result-div-search">
<!--                <p>{{one['content']}}</p>-->
                <p  v-html="one['content']"></p>
                <a :href="'/#/'+one['index']+'/view/'+one['id']">перейти...</a>

            </div>
        </div>
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
<!--    TODO: Добавить навигацию!-->
<!--    TODO: Разработать ссылку для комментариев-->
<!--    TODO: Выводить сообщение что ничего не найдено-->
</template>

<script>
    import Paginate from 'vuejs-paginate'
    export default {
        components: {
            Paginate
        },
        data: () => ({
            pageCount:5,
            currentPage : 1,

           response:null
        }),
        mounted(){
            this.getResultSearch()
        },
        watch:{
            $route (to, from){
                this.getResultSearch()

            }
        },
        methods:{
            getResultSearch(){
                let url = this.$settings.APP_SEARCH+'?str='+this.$route.params.str+'&page='+this.currentPage
                let _this = this
                this.response = null;
                console.warn(url);
                this.$http.get(url)
                    .then(function(response){
                        if (response.status == 200) {
                            console.warn(this)
                            _this.response = response.data.rows;
                            _this.pageCount = response.data.totalPage
                        }
                    })
                    .catch((error) => {
                      if(error.status == 404)
                          alert('Ничего не найдено')
                    })
            },

            clickCallback: function(page) {
                this.$router.push('/search/' + page+'/'+this.$route.params.str);
                this.getResultSearch()
            }
        }
    }


</script>

<style>
    .result-div-search {
        min-height: 50px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
    .content-search
    {
        margin-left: 30px;
    }
    highlight-string {
        background-color: #FCFD8D;
    }
</style>

