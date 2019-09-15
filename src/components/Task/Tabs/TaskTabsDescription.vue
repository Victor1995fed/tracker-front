<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <h3>Описание</h3>
        <span v-html="prop"></span>
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
