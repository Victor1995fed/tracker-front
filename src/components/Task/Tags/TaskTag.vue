<template>

<div>
    <div class="tag-list">
<!--    <h4>Ваши метки</h4>-->
    <md-chip md-clickable md-deletable>Clickable1</md-chip>
    <md-chip md-clickable md-deletable>Clickable2</md-chip>
    <md-chip md-clickable md-deletable>Clickable3</md-chip>
        <md-button
                class="md-just-icon md-simple md-primary"
        >
            <md-icon>add</md-icon>
            <md-tooltip md-direction="top">Добавить метку</md-tooltip>
        </md-button>
    </div>

    <div class="tag-choice">
        <h4>Выбранные метки</h4>
        <md-button
                class="md-just-icon md-simple md-danger"
        >
            <md-icon>clear</md-icon>
            <md-tooltip md-direction="top">Сбросить выбор</md-tooltip>
        </md-button>
        <md-chip md-clickable md-deletable>Clickable1</md-chip>
        <md-chip md-clickable md-deletable>Clickable2</md-chip>
    </div>
</div>


</template>

<script>
    export default {
        name: "TaskTag"
    }
</script>

<style scoped>

</style>
