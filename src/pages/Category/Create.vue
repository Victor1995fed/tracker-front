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

    export default {
        components: {
            EditCategory
        },
        data() {
            return {
                form:{
                    title:null,
                },
                action: 'category/create'
            };
        },
    };
</script>
