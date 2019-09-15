<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="link-files"  v-for="(data,index) in prop" :key="index">
                    <p>
                        <a :href="url+data.uuid">{{data.title}}</a>
                    </p>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task-tabs-files",
        props: ['prop'],
        data() {
            return {
                url: 'http://tracker.zz/files/download?uuid=',
                selected: [],
                users: [
                ]
            };
        }
    };
</script>
