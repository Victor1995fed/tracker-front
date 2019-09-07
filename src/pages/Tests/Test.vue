<template>
    <div>
        <md-card v-for="(item, index) in response" md-medium>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">{{item.title}}</div>
                    <div class="md-subhead">{{item.desc}}</div>
                </md-card-header-text>
                <md-card-media>
                    <img src="/assets/examples/avatar-2.jpg" alt="People">
                </md-card-media>
            </md-card-header>

            <md-card-actions>
                <md-button>Перейти</md-button>
            </md-card-actions>
        </md-card>


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
    export default {
        name: 'Media',
        data: () => ({
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