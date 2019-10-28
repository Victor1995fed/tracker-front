<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Ваши заметки</h4>
                    </md-card-header>

                    <md-card-content>
                        <div class="radio-task">

                            <md-radio v-model="radio" value="today" class="md-primary">Сегодня</md-radio>
                            <md-radio v-model="radio" value="week" class="md-primary">Следующие 7 дней</md-radio>
                            <md-radio v-model="radio" value="all" class="md-primary">Все задачи</md-radio>
                            <md-button class="md-just-icon md-simple md-primary custom-button-task" :href="'/#/note/create/'">
                                <md-icon ><img src="@/assets/img/plus.svg" alt="plus"></md-icon>
                                <md-tooltip  md-direction="top">Добавить заметку</md-tooltip>
                            </md-button>
                        </div>

<div class="both"></div>
                        <div>
                            <md-menu md-size="medium"  :md-offset-x="127" :md-offset-y="-36">
                                <md-button class="md-primary" md-menu-trigger>Фильры</md-button>

                                <md-menu-content>
                                    <md-menu-item disabled ><a href="#">Сортировать по дате</a></md-menu-item>
                                    <md-menu-item><a href="#">Сортировать по статусу</a></md-menu-item>
                                    <md-menu-item><a href="#">Сортировать по названию</a></md-menu-item>
                                    <md-menu-item><a href="#">Сортировать по приоритету</a></md-menu-item>
                                </md-menu-content>
                            </md-menu>
                        </div>
                        <note-list table-header-color="green"></note-list>
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
    import { NoteList} from "@/components";

    export default {
        components: {
            NoteList
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
        margin-top: 5px;
        margin-right: 15px;

        float:right;
    }

.both {
    clear: both;
}

</style>
