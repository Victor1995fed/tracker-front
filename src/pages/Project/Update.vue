<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <update-project data-background-color="green" :form="form"> </update-project>
            </div>
        </div>
    </div>
</template>

<script>
    import  {UpdateProject}  from "@/pages";
    import axios from 'axios';
    import repository from '@/settings.js';
    export default {
        components: {
            UpdateProject
        },
        data() {
            return {
                form:[]
            };
        },
        mounted() {
            let id = this.$route.params.id;
            axios.get(repository.API+'project/update?id='+id).then(response => {
                this.form = response.data
            })

        },
    };
</script>
