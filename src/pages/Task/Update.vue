<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <edit-task data-background-color="green" :form="form" :action="action"> </edit-task>
            </div>
        </div>
    </div>
</template>

<script>
    import  {EditTask}  from "@/pages";
    import axios from 'axios';
    import repository from '@/settings.js';

    export default {
        components: {
            EditTask
        },
        data() {
            return {
                form:[],
                action: 'task/update'
            };
        },
        mounted() {
            let id = this.$route.params.id;
            axios.get(repository.API+'task/view?id='+id).then(response => {
                this.form = response.data.task
                //Сброс трудозатрат
                this.form.spending = 0
            })

        },
    };
</script>
