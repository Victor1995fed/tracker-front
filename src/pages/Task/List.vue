<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >

                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Список ваших задач</h4>
<!--                        <p class="category">Сортировка по активным</p>-->
                    </md-card-header>

                    <md-card-content>
                        <div class="radio-task">

                            <md-radio v-model="radio" value="today" class="md-primary">Сегодня</md-radio>
                            <md-radio v-model="radio" value="week" class="md-primary">Следующие 7 дней</md-radio>
                            <md-radio v-model="radio" value="all" class="md-primary">Все задачи</md-radio>
                            <md-switch v-model="done" class="md-primary">Показать выполненные</md-switch>
                            <md-button class="md-just-icon md-simple md-primary custom-button-task" :href="'/#/task/create/'">
                                <md-icon ><img src="@/assets/img/plus.svg" alt="plus"></md-icon>
                                <md-tooltip  md-direction="top">Добавить задачу</md-tooltip>
                            </md-button>
                        </div>

<div class="both"></div>
                        <div>
                            <form novalidate class="md-layout" @submit.prevent="validateUser">
                                <md-card class="md-layout-item md-size-100 md-small-size-100">
                                    <md-card-header>
                                        <div class="md-title">Фильтры</div>
                                    </md-card-header>

                                    <md-card-content>

                                        <div class="md-layout-item md-small-size-100 md-size-100">
                                            <md-field>
                                                <label>Проект</label>
                                                <md-select name="project" id="project" v-model="form.project_id">
                                                    <md-option
                                                            v-for="one in response.project"
                                                            :value="one.id"
                                                            v-bind:key="one.id"
                                                    >{{ one.title }}
                                                    </md-option>
                                                </md-select>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100 md-size-100">
                                            <md-field>
                                                <label>Статус</label>
                                                <md-select name="status" id="project" v-model="form.project_id">
                                                    <md-option
                                                            v-for="one in response.project"
                                                            :value="one.id"
                                                            v-bind:key="one.id"
                                                    >{{ one.title }}
                                                    </md-option>
                                                </md-select>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100 md-size-100">
                                            <md-field>
                                                <label>Приоритет</label>
                                                <md-select name="priority " id="project" v-model="form.project_id">
                                                    <md-option
                                                            v-for="one in response.project"
                                                            :value="one.id"
                                                            v-bind:key="one.id"
                                                    >{{ one.title }}
                                                    </md-option>
                                                </md-select>
                                            </md-field>
                                        </div>


                                    </md-card-content>

                                    <md-progress-bar md-mode="indeterminate" v-if="sending" />

                                    <md-card-actions>
                                        <md-button type="submit" class="md-primary" :disabled="sending">Применить</md-button>
                                    </md-card-actions>
                                </md-card>

                                <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
                            </form>
<!--                            <md-menu md-size="medium"  :md-offset-x="127" :md-offset-y="-36">-->
<!--                                <md-button class="md-primary" md-menu-trigger>Фильры</md-button>-->

<!--                                <md-menu-content>-->
<!--                                    <md-menu-item disabled ><a href="#">Сортировать по дате</a></md-menu-item>-->
<!--                                    <md-menu-item><a href="#">Сортировать по статусу</a></md-menu-item>-->
<!--                                    <md-menu-item><a href="#">Сортировать по названию</a></md-menu-item>-->
<!--                                    <md-menu-item><a href="#">Сортировать по приоритету</a></md-menu-item>-->
<!--                                </md-menu-content>-->
<!--                            </md-menu>-->
                        </div>
                        <task-list table-header-color="green"></task-list>
                    </md-card-content>
                </md-card>
            </div>

            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
            </div>
        </div>
    </div>
</template>

<script>
    import { TaskList} from "@/components";

    export default {
        components: {
            TaskList
        },
        data: () => ({
            radio: 'today',
            done: false,
            form: {
                project_id: 0
            },
            response: {
                project:{
                    1:{
                        title:'sdsd',
                        id:1
                    },
                    2:{
                        title:'sdsddfd',
                        id:11
                    },

                }
            }
        })
    };
</script>

<style scoped>
    .button-task {
        clear: both;
    }

    .custom-button-task {
        /*width: 100px;*/
        /*font-size: 9px;*/
        /*margin-left: -5px;*/
        margin-top: 5px;
        margin-right: 15px;

        float:right;
    }

.both {
    clear: both;
}

</style>
