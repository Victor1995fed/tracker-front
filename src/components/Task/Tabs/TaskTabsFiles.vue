<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="link-files"  v-for="(data,index) in prop" :key="index">
                    <div class="md-layout md-layout-hover">
                        <div class="md-layout-item">{{index}}</div>
                        <div class="md-layout-item">{{data.title}}</div>
                        <div class="md-layout-item">{{data.date_create}}</div>
                        <div class="md-layout-item"><a class="download" :href="url+data.uuid" title="скачать"></a></div>
                        <div class="md-layout-item"><a class="delete" title="удалить" @click="deleteFile(data.uuid)"></a></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import repository from '@/settings.js';
    export default {
        name: "task-tabs-files",
        props: ['prop'],
        data() {
            return {
                url: repository.API+'file/download?uuid=',
                selected: [],
                users: [
                ]
            };
        },
        methods:{
            deleteFile(uuid){

                axios.get(repository.API + 'file/delete?uuid='+uuid).then(response => {
                    this.response = response.data
                    this.$router.go()
                })
            }
        }
    };
</script>

<style>
    .md-layout-hover:hover {
        background-color: #e6e6e8;
        cursor: pointer;

    }

    .md-layout-hover {
        font-size: 15px;
        border-bottom: 1px solid #e6e6e8;
    }
.download {
    display: block;
    width: 10px;
    height: 10px;
    background-image: url(https://tracker.yandex.ru/_/DpYFZqVGMARCz5ozVc20wztK98I.svg);
    background-repeat:no-repeat ;
    background-position: center center;
    margin-top: 6px;
}
    .delete {
        display: block;
        width: 10px;
        height: 10px;
        background-image: url(https://tracker.yandex.ru/_/doXakHG9Rx9txCwvIVzobK_3pZk.svg);
        background-repeat:no-repeat ;
        background-position: center center;
        margin-top: 6px;

    }

</style>
