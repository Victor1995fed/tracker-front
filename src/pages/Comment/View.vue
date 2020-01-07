<template>
    <div class="content">
        <p  v-html="response.comment.content"></p>
        <p><strong>Дата создания: </strong>{{response.comment.date_create}}</p>
        <a :href="'/#/task/view/'+response.taskId">Просмотреть задачу</a>
    </div>
</template>

<script>

    export default {
        data: () => ({
            response: {
            },
        }),
        mounted() {
            let id = this.$route.params.id;
            this.$http.get(this.$settings.COMMENT_VIEW + "?id=" + id).then(response => {
                this.response = response.data;
            });
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>

</style>
