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
                            <md-button class="md-just-icon md-simple md-primary custom-button-task" :href="'/#/note/create/'">
                                <md-icon ><img src="@/assets/img/plus.svg" alt="plus"></md-icon>
                                <md-tooltip  md-direction="top">Добавить заметку</md-tooltip>
                            </md-button>
                        </div>

<div class="both"></div>
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
