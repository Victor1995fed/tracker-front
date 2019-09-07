<template>
    <div>
        <!--        <md-progress-spinner disabled="true" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>-->
        <div>
     <h1>Выберите проект</h1>
            <div class="md-layout-item md-small-size-100 md-size-50">

            <label>Проект</label>
                <md-field>
            <md-select v-model="choice">
                <md-option
                        v-for="one in project"
                        :value="one.id"
                        v-bind:key="one.id"
                >{{ one.title }}</md-option>
            </md-select>
                </md-field>
<!--                @click="goCreate()"-->
                <md-button class="md-raised md-success" :href="'/#/task/create/4/' + this.choice" >Далее</md-button>
        </div>
        </div>
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
        name: 'project-choice',
        data: () => ({
            choice:null,
            url:'/#/category/create/4/',
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
        mounted() {

            // Vue.material.locale.dateFormat = 'dd/MM/yyyy'
            // console.log(Vue.material.locale.dateFormat);
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