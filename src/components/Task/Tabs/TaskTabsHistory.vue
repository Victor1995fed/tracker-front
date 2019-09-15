<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
        <p>Какой-то контент</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task-tabs-history",
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
