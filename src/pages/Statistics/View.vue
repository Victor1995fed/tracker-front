<template>
    <div>
    <div class="small">
        <line-chart :chart-data="dataCollection" :options="options"></line-chart>
    </div>
        <div class="small">
            <h4>В этом месяце</h4>
            <bar-chart :chart-data="dataCollectionBar"></bar-chart>
        </div>
    </div>
</template>

<script>
    import  {LineChart, BarChart}  from "@/components";

    export default {
        components: {
            LineChart,
            BarChart
        },
        data () {
            return {
                dataCollection: null,
                dataCollectionBar: null,
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
                        this.dataCollectionBar = {
                            labels: ["Выполненные", "Новые", "Остальные"],
                            datasets: [
                                {
                                    label: "Data One",
                                    backgroundColor: ["#41B883", "#334ce4", "#ccca10"],
                                    data: [data['count_done'],data['count_new'],data['count_other']]
                                }
                            ]
                        }
                        let week = data['line_chart']['week']
                        let str = []
                        //TODO:: Раскидать все по отдельным методам
                        for( var key in week){
                            str.push(week[key][0]+'-'+ week[key][week[key].length - 1]);
                        }
                        console.warn('TEST',Object.values(
                            data['line_chart']['all']
                        ));
                        this.dataCollection = {
                            labels: str,
                            datasets: [
                                {
                                    label: 'Выполненные задачи',
                                    backgroundColor: '#22f830',
                                    data: Object.values(data['line_chart']['done'])
                                },
                                {
                                    label: 'Все задачи',
                                    backgroundColor: '#4c63f8',
                                    data: Object.values(data['line_chart']['all'])
                                },

                            ]
                        }

                        // this.dataCollectionBar.datasets.data = [];
                    });

            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>

<style>
    .small {
        width: 400px;
        height: 400px;
        float: left;
    }
</style>
