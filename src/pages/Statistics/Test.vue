<template>
    <div>
        <div class="small">
            <h4>Задачи в этом месяце</h4>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },
        data () {
            return {
                dataCollection: {},
                dataCollectionBar: {},
                spending: {},
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                stepSize: 1,
                            },
                            scaleLabel: {
                                display: true
                            },
                        }]
                    }
                }
            }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            fillData () {

                this.$http.get( this.$settings.STATISTICS_INDEX).then(response => {

                    let data = response.data

                    // this.dataCollectionBar.datasets.data = [];
                });

            }
        }
    }
</script>

<style>

</style>
