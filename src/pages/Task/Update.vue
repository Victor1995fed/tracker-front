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

    export default {
        components: {
            EditTask
        },
        data() {
            return {
                form:[],
                action: this.$settings.TASK_UPDATE
            };
        },
        mounted() {
            let id = this.$route.params.id;
            this.$http.get(this.$settings.TASK_VIEW+'?id='+id).then(response => {
                this.form = response.data.task
                //Сброс трудозатрат
                this.form.spending = 0
                //Замена формата даты
                // console.warn('DATA',this.$options.filters.setFormatDate(this.form.date_end))
                this.form.date_end = this.$options.filters.setFormatDate(this.form.date_end)
                this.form.date_start = this.$options.filters.setFormatDate(this.form.date_start)
            })

        },
    };
</script>
