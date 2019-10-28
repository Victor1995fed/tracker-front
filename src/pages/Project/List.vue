<template>
    <div>
<!--        <md-progress-spinner disabled="true" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>-->
        <div>

        <md-card v-for="(item, index) in project" md-medium  class="md-primary" md-theme="md-theme">
            <md-card-header style=" background-color: #fff;">
                <md-card-header-text>
                    <div @click="clearData()"  class="md-title">{{item.title}}</div>
                </md-card-header-text>
                <md-card-media>
<!--                    <img src="/img/card-weather.png" alt="People">-->
<!--                    <img src="@/assets/img/card-weather.png" alt="People">-->
                </md-card-media>
            </md-card-header>

            <md-card-actions>
                <md-button class="md-raised md-success" :href="'#/project/view/'+item.id">Перейти</md-button>
            </md-card-actions>
        </md-card>

        </div>
        <md-button class="md-success"  href="/#/project/create" >Добавить проект</md-button>
    </div>
</template>

<style lang="scss" scoped>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>

<script>
    import axios from "axios";
    import repository from "@/settings.js";
    export default {
        name: 'Media',
        data: () => ({
            project:[],
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

            // Vue.material.locale.dateFormat = 'dd/MM/yyyy'
            // console.log(Vue.material.locale.dateFormat);
            let id = this.$route.params.id;
            axios.get(repository.API + "project/index").then(response => {
                this.project = response.data;
            });
        }
    }
</script>

<style>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 50px!important;
    }
</style>
