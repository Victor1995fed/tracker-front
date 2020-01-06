<template>
    <div>
        <div class="md-layout md-gutter preloader-view" v-if="loader" :class="`md-alignment-center-center`">
            <DoubleBounce></DoubleBounce>
        </div>
        <div>
<div v-if="!loader">
        <md-card v-for="(item, index) in project" md-medium  class="md-primary" md-theme="md-theme">
            <md-card-header style=" background-color: #fff;">
                <md-card-header-text>
                    <div @click="clearData()"  class="md-title">{{item.title}}</div>
                </md-card-header-text>
                <md-card-media>
<!--                    <img src="/img/card-weather.png" alt="People">-->
                    <img src="@/assets/img/card-weather.png" alt="People">
                </md-card-media>
            </md-card-header>

            <md-card-actions>
                <md-button class="md-raised md-success" :href="'#/project/view/'+item.id">Перейти</md-button>
            </md-card-actions>
        </md-card>
            <md-card class="custom-card">
                <md-card-content>
                    <div style="text-align:center;">
                        <md-button id="custom-button-project-add" class="md-just-icon md-success" href="/#/project/create" >
                            <md-icon>add</md-icon>
                            <md-tooltip md-direction="top">Добавить проект</md-tooltip>
                        </md-button>
                    </div>
                </md-card-content>
            </md-card>
</div>
        </div>
    </div>
</template>


<script>
    import {DoubleBounce} from 'vue-loading-spinner'
    export default {
        name: 'Media',
        components: {
            DoubleBounce
        },
        data: () => ({
            project:[],
            loader: true,
            response:[
                {
                    title: "Текст1",
                    desc:"Описанией1"
                },
                {
                    title: "Текст2",
                    desc:"Описание2"
                },
                {
                    title: "Текст3",
                    desc:"Описание3"
                },
                {
                    title: "Текст3",
                    desc:"Описание3"
                },

            ]

        }),
        methods: {
          clearData(){
              this.project = []
            }
        },
        mounted() {
            let id = this.$route.params.id;
            this.$http.get( this.$settings.PROJECT_LIST).then(response => {
                this.loader = false
                this.project = response.data;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 50px!important;
    }
    .custom-card {
        background:none!important;
        box-shadow: none !important;
        /*border: 1px solid #ccc;*/
    }
    #custom-button-project-add .md-button-content i {
      color: #fff !important;
    }
    #custom-button-project-add:hover {
        color: #fff !important;
    }
</style>
