<template>
    <div class="content">
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Добавление метки</md-dialog-title>
            <div class="md-layout-item md-size-100">
                <md-field>
                    <label>Название</label>
                    <md-input
                            v-model="newTagForm.title"
                            autocomplete="given-name"
                    ></md-input>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-default" @click="showDialog = false"
                >Закрыть
                </md-button
                >
                <md-button class="md-primary" @click="saveTag">Сохранить</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog :md-active.sync="showDialogDel">
            <md-dialog-title>Вы действительно хотите удалить эту метку?</md-dialog-title>

            <md-dialog-actions>
                <md-button  @click="showDialogDel = false">Нет</md-button>
                <md-button class="md-danger" @click="deleteTag">Да</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-card>
            <md-card-header data-background-color="green">
                <h4 class="title">Список ваших меток</h4>
            </md-card-header>
            <md-card-content>
                <div>
                    <div class="md-layout" v-for="(data,index) in tag" :key="index"><!--{{data.title}}-->
                        <div class="md-layout-item md-size-20">
                            <md-field ref="tagTitle">
                                <label>Название метки</label>
                                <md-input
                                        @focus="edit(data)"
                                        @blur="update(data)"

                                        v-model="data.title"
                                        autocomplete="given-name"
                                ></md-input>

                            </md-field>
                        </div>

                        <div class="md-layout-item custom-layout">
                            <md-button
                                    class="md-just-icon md-simple md-primary"
                                    :href="'/#/task/list' + '?tags='+data.id"
                            >
                                <md-icon>list_alt</md-icon>
                                <md-tooltip md-direction="top">Показать задачи</md-tooltip>
                            </md-button>
                            <md-button
                                    class="md-just-icon md-simple md-danger"
                                    @click="setDeleteParams(data)"
                            >
                                <md-icon>delete</md-icon>
                                <md-tooltip md-direction="top">Удалить</md-tooltip>
                            </md-button>
                        </div>
                    </div>


                </div>
                <md-button class="md-success" @click="showDialog = true">Добавить метку</md-button>
            </md-card-content>
        </md-card>
        <snackbar-success ref="snackbarSuccess" :message="message"></snackbar-success>
    </div>
</template>

<script>

    import  {SnackbarSuccess} from "@/components";
    export default {
        components:{
            SnackbarSuccess
        },
        data: () => ({
            showDialog: false,
            tag: [],
            form: {
                title: null
            },
            isEdit: {},
            objReadonly: {},
            message:'Обновлено!',
            showDialogDel:false,
            deleteTagId: null,
            newTagForm:{},
        }),

        mounted() {
            let _this = this
            this.$http.get(this.$settings.TAG_LIST)
                .then(function (response) {
                    if (response.data) {
                        // console.warn(this)
                        _this.tag = response.data;
                    } else {
                        alert('error')
                    }
                })
        },
        methods: {
            saveTag: function () {
                //TODO:: Вынести функцию в глобальный объект, избавиться от дублирования
                let _this = this;
                let formData = new FormData();
                for (var key in this.newTagForm) {
                    if (this.newTagForm[key] !== undefined && this.newTagForm[key] !== null) {
                        formData.append(key, this.newTagForm[key]);
                    }
                }
                const options = {
                    method: "POST",
                    responseType: "json",
                    url:
                    this.$settings.TAG_CREATE,
                    data: formData,
                    transformResponse: [
                        data => {
                            if (data) {
                                this.showDialog = false;
                                _this.$router.go(_this.$router.path)
                            } else {
                                alert("error" + data.message);
                            }
                        }
                    ]
                };
                this.$http(options);
            },
            edit: function (item) {
                this.oldTitle = item.title
                console.warn('title', this.oldTitle);
            },
            update: function (item) {
                console.warn('ITEMS', item.title)
                if (this.oldTitle != item.title) {
                    this.form.title =  item.title;
                    let _this = this;
                    let formData = new FormData();
                    for (var key in this.form) {
                        if (this.form[key] !== undefined && this.form[key] !== null) {
                            formData.append(key, this.form[key]);
                        }
                    }
                    const options = {
                        method: "PUT",
                        responseType: "json",
                        url:
                        this.$settings.TAG_UPDATE+'?id='+item.id,
                        data: formData,
                        transformResponse: [
                            data => {
                                if (data) {
                                    this.$refs.snackbarSuccess.showSnackbar = true;
                                } else {
                                    alert("error" + data.message);
                                }
                            }
                        ]
                    };
                    this.$http(options);
                }
                else {
                    console.warn("Значение не изменилось")
                }
            },
            deleteTag: function () {
                const options = {
                    method: "DELETE",
                    responseType: "json",
                    url:
                        this.$settings.TAG_DELETE+'?id='+this.deleteTagId,
                    transformResponse: [
                        data => {
                            if (data) {
                                this.showDialogDel = false;
                                this.$router.go(this.$router.path)
                            } else {
                                alert("error" + data.message);
                            }
                        }
                    ]
                };
                this.$http(options);
            },
            setDeleteParams: function (item) {
                this.deleteTagId = item.id
                this.showDialogDel = true;
            }
        }
    }
</script>

<style scoped>
    .custom-layout {
        /*margin-left: 15px;*/
        margin-top: 11px;
    }
</style>
