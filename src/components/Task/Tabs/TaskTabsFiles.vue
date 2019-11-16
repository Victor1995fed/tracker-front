<template>
    <div>
        <div class="md-layout md-centered">
            <div class="md-layout-item" v-if="prop.length > 0">
                <div class="link-files"   v-for="(data,index) in prop" :key="index">
                    <div class="md-layout md-layout-hover">
                        <div class="md-layout-item">{{index}}</div>
                        <div class="md-layout-item">{{data.title}}</div>
                        <div class="md-layout-item">{{data.date_create}}</div>
                        <div class="md-layout-item"><a class="download" :href="url+data.uuid" title="скачать"></a></div>
                        <div class="md-layout-item"><a class="delete" title="удалить" @click="deleteFile(data.uuid)"></a></div>
                    </div>

                </div>
            </div>

            <div class="md-layout-item" v-if="prop.length < 1">
                <div class="link-files">
                    <h6>Файлы не загружены</h6>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task-tabs-files",
        props: ['prop'],
        data() {
            return {
                url: this.$settings.API+'file/download?uuid=',
                selected: [],
                data: [
                ]
            };
        },
        methods:{
            deleteFile(uuid){

                this.$http.get(this.$settings.API + 'file/delete?uuid='+uuid).then(response => {
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

    .link-files {
        min-height: 300px;
    }

</style>
