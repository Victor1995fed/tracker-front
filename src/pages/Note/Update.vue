<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <edit-note data-background-color="green" :form="form" :action="action"> </edit-note>
            </div>
        </div>
    </div>
</template>

<script>
    import  {EditNote}  from "@/pages";
    import axios from 'axios';
    import repository from '@/settings.js';

    export default {
        components: {
            EditNote
        },
        data() {
            return {
                form:[],
                action: 'note/update'
            };
        },
        mounted() {
            let id = this.$route.params.id;
            axios.get(repository.API+'note/view?id='+id).then(response => {
                this.form = response.data.note
                //Сброс трудозатрат
            })

        },
    };
</script>
