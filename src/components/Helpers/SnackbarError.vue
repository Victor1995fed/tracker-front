<template>

    <form novalidate @submit.stop.prevent="showSnackbar = false">
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{message}}</span>
            <md-button @click="showSnackbar = false"  class="md-just-icon md-simple md-danger ">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Скрыть</md-tooltip>
            </md-button>
        </md-snackbar>
    </form>
</template>

<script>
    export default {
        name: 'snackbar-error',
        props: {
            message: {
                type: String,
                default: null
            },
        },
        data: () => ({
            showSnackbar: false,
            position: 'center',
            duration: 4000,
            isInfinity: false,
            // message: "",
        })
    }
</script>
<style>
    .md-snackbar {
        background-color: #f00 !important   ;
    }
    .md-snackbar .md-button-content i {
       color: #fff !important;
    }
</style>
