<template>
    <div>
         <div v-for="one in comment" class="custom-layout clear-fix">
                    <div class="clear-fix">
                        <div class="comment-icon"><md-icon>comment</md-icon></div>
                        <div class="comment-date">{{one.date_create}}</div>
                    </div>
                    <div class="clear-fix">
                        <div class="comment-content"><p>{{one.content}} </p></div>
                    </div>
                        <div class="comment-button">
                            <md-button class="md-just-icon md-simple md-primary">
                            <md-icon>edit</md-icon>
                            <md-tooltip md-direction="top">Edit</md-tooltip>
                        </md-button>
                            <md-button class="md-just-icon md-simple md-danger">
                                <md-icon>delete</md-icon>
                                <md-tooltip md-direction="top" class="md-danger">удалить</md-tooltip>
                            </md-button>
                        </div>
                </div>
            </div>
</template>

<script>
    export default {
        name: "task-tabs-comment",
        props: ['prop'],
        data() {
            return {
                selected: [],
                comment: [
                ]
            };
        },
        mounted() {
            let id = this.$route.params.id;
            this.$http.get(this.$settings.COMMENT_LIST+'?id='+id).then(response => {
                this.comment = response.data
            })
        },
        methods: {
            onSelect: function(items) {
                this.selected = items;
            }
        }
    };
</script>

<style scoped>
    .custom-layout {
        border-bottom: 1px #ccc solid;
        margin-bottom: 40px;
        padding: 5px;
    }
    .comment-content, .comment-icon, .comment-button {
        float:left;
        /*margin-left: 10px;*/
    }
    .comment-button {
        margin-left: -5px;
    }
    .comment-content {
        margin-top: 10px;
    }
    .comment-date {
        float:right;
    }

    .clear-fix::after {
        content: '';
        display: block;
        clear: both;
        height: 0px;
        visibility: hidden;
    }



</style>
