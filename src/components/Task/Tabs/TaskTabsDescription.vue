<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="ql-editor" v-html="prop"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task-tabs-description",
        props: ['prop'],
        data() {
            return {
                selected: [],
                users: [
                ]
            };
        }
    };
</script>
