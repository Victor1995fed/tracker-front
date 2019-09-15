<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
        <h3>История</h3>
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
