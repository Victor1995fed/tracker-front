<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <edit-project data-background-color="green" :form="form" :action="this.$settings.PROJECT_UPDATE"> </edit-project>
            </div>
        </div>
    </div>
</template>

<script>
    import  {EditProject}  from "@/pages";

    export default {
        components: {
            EditProject
        },
        data() {
            return {
                action:'project/update',
                form:[]
            };
        },
        mounted() {
            let id = this.$route.params.id;
            this.$http.get(this.$settings.PROJECT_VIEW+'?id='+id).then(response => {
                this.form = response.data.project
            })

        },
    };
</script>
