<template>
    <div>
        <md-table v-model="response" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="#">{{ item.catId }}</md-table-cell>
                <md-table-cell md-label="Название"><a :href="'#/category/view/'+item.catId">{{ item.catTitle }}</a></md-table-cell>
                <!-- <md-table-cell md-label="Проект">{{ item.project }}</md-table-cell> -->
                <md-table-cell md-label="Родительская категория" ><span v-if="item.parentId !== null">{{ item.parentTitle }}</span><span v-else>&mdash;</span> </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import repository from '@/settings.js';
    export default {
        data() {
            return {
                response: [],
            };
        },
        mounted() {
            axios.get(repository.API+'category/index').then(response => {
                this.response = response.data
            })
        },
    }
</script>

<style scoped>

</style>