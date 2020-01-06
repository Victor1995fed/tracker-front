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

    </div>
<!--    TODO: Добавить навигацию!-->
<!--    TODO: Разработать ссылку для комментариев-->
<!--    TODO: Выводить сообщение что ничего не найдено-->
</template>

<script>
    export default {

        data: () => ({
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
                let url = this.$settings.APP_SEARCH+'?str='+this.$route.params.str
                let _this = this
                this.response = null;
                console.warn(url);
                this.$http.get(url)
                    .then(function(response){
                        if (response.data) {
                            console.warn(this)
                            _this.response = response.data.rows;
                        }
                        else{
                            alert('error')
                        }
                    })
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
    em {
        background-color: #FCFD8D;
    }
</style>

