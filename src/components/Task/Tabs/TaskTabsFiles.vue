<template>
    <div>
        <div class="md-layout md-centered file-tabs">
            <md-dialog :md-active.sync="showDialogDel">
                <md-dialog-title>Вы действительно хотите удалить этот файл?</md-dialog-title>

                <md-dialog-actions>
                    <md-button  @click="showDialogDel = false">Нет</md-button>
                    <md-button class="md-danger" @click="deleteFile">Да</md-button>
                </md-dialog-actions>
            </md-dialog>
            <div class="md-layout-item" v-if="prop.length > 0">
                <div class="link-files"   v-for="(data,index) in prop" :key="index">
                    <div class="md-layout md-layout-hover">
                        <div class="md-layout-item custom-div-files">{{index + 1}}</div>
                        <div class="md-layout-item custom-div-files">{{data.title}}</div>
                        <div class="md-layout-item custom-div-files">{{data.date_create}}</div>
                        <div class="md-layout-item">
                            <md-button
                                    :href="url+data.uuid"
                                    class="md-just-icon md-primary md-simple file-button"
                            >
                                <md-icon>vertical_align_bottom</md-icon>
                                <md-tooltip md-direction="top">Скачать</md-tooltip>
                            </md-button>
                        </div>
                        <div class="md-layout-item">
                            <md-button
                                    @click="deleteFileSetUuid(data.uuid)"
                                    class="md-just-icon md-simple md-danger file-button"
                            >
                                <md-icon>delete</md-icon>
                                <md-tooltip md-direction="top">Удалить</md-tooltip>
                            </md-button>
                        </div>
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
<!--    </div>-->
</template>

<script>
    export default {
        name: "task-tabs-files",
        props: ['prop'],
        data() {
            return {
                showDialogDel:false,
                url: this.$settings.API+'file/download?uuid=',
                selected: [],
                data: [
                ],
                uuidFile:null
            };
        },
        methods:{
            deleteFileSetUuid(uuid){
                this.uuidFile = uuid
                this.showDialogDel = true
            },
            deleteFile(){
                this.$http.delete(this.$settings.TASK_FILE_DELETE + '?uuid='+this.uuidFile+'&id='+this.$route.params.id).then(response => {
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

    .file-tabs {
        min-height: 300px;
    }

    .link-files {
        margin-bottom: 10px;
    }

    .file-button {
        margin: 0 !important;
        padding: 0 !important;
    }
    .custom-div-files {
        padding-top: 10px;
    }
</style>
