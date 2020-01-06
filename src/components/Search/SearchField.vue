<template>
    <md-field class="search" >
        <label>Поиск...</label>
        <md-input v-on:keyup.enter="submit" v-model="selectedEmployee"></md-input>
    </md-field>
</template>

<script>
    export default {
        name: "search-field",
        data() {
            return {
                selectedEmployee: null,
            };
        },

        methods: {
            submit() {
                this.$router.push({ path: '/search/'+this.selectedEmployee })
            },

        }
    }

</script>

<style scoped>

</style>
