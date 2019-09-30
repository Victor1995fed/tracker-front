<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <edit-category data-background-color="green" :form="form" :action="action"> </edit-category>
            </div>
        </div>
    </div>
</template>

<script>
    import  {EditCategory}  from "@/pages";
    import axios from 'axios';
    import repository from '@/settings.js';
    export default {
        components: {
            EditCategory
        },
        data() {
            return {
                form:[],
                action: 'category/update'
            };
        },
        mounted() {
            let id = this.$route.params.id;
            axios.get(repository.API+'category/update?id='+id).then(response => {
                this.form = response.data
            })

        }
    };
</script>
