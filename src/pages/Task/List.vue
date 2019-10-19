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
<!--                        <div class="button-task">-->
<!--                            Добавить задачу-->
<!--                            <md-button class="md-just-icon md-simple md-primary" :href="'/#/task/create/'">-->
<!--                                <md-icon ><img src="@/assets/img/plus.svg" alt="plus"></md-icon>-->
<!--                                <md-tooltip  md-direction="top">Добавить задачу</md-tooltip>-->
<!--                            </md-button>-->

<!--&lt;!&ndash;                                                    <md-button class="md-success custom-button-task" href="/#/task/create">Добавить задачу</md-button>&ndash;&gt;-->
<!--                            &lt;!&ndash;                        <md-button class="md-success" href="/#/category/create">Добавить категорию</md-button>&ndash;&gt;-->
<!--                            &lt;!&ndash;                        <md-button class="md-success"  href="/#/category/list" >Список категорий</md-button>&ndash;&gt;-->
<!--                        </div>-->
                        <div class="radio-task">

                            <md-radio v-model="radio" value="today" class="md-primary">Сегодня</md-radio>
                            <md-radio v-model="radio" value="week" class="md-primary">Следующие 7 дней</md-radio>
                            <md-radio v-model="radio" value="all" class="md-primary">Все задачи</md-radio>
                            <md-button class="md-just-icon md-simple md-primary custom-button-task" :href="'/#/task/create/'">
                                <md-icon ><img src="@/assets/img/plus.svg" alt="plus"></md-icon>
                                <md-tooltip  md-direction="top">Добавить задачу</md-tooltip>
                            </md-button>
                        </div>

<div class="both"></div>
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
            radio: 'today'
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
