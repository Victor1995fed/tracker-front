<template>
    <div>
        <div class="small">
            <h4>Задачи в этом месяце</h4>
            <line-chart :chart-data="dataCollection" :options="options"></line-chart>
        </div>
        <div class="small">
            <h4>Общее количество задач за все время</h4>
            <bar-chart :chart-data="dataCollectionBar"></bar-chart>
        </div>

        <div class="small">
            <h4>Общее количество трудозатрат по проектам</h4>
            <bar-chart :chart-data="spending"></bar-chart>
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
                dataCollection: {},
                dataCollectionBar: {},
                spending: {},
                color:[],
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
                    for( let key in week){
                        str.push(week[key][0]+'-'+ week[key][week[key].length - 1]);
                    }
                    this.dataCollection = {
                        labels: str,
                        datasets: [
                            {
                                label: 'Выполненные задачи',
                                backgroundColor: '#22f830',
                                data: Object.values(data['line_chart']['done'])
                            },
                            {
                                label: 'Созданные задачи',
                                backgroundColor: '#4c63f8',
                                data: Object.values(data['line_chart']['all'])
                            },

                        ]
                    }
                    let projectTitle = []
                    let sumSpending = []
                    for( let key in data.spending){
                        projectTitle.push(data.spending[key].title);
                        sumSpending.push(data.spending[key].sum_spending)
                    }
                    let colorArr = this.genArrayColor(data.spending.length);
                    this.spending = {
                        labels: projectTitle,
                        datasets: [
                            {
                                label: "Data One",
                                backgroundColor: colorArr,
                                data: sumSpending
                            }
                        ]
                    }

                    // this.dataCollectionBar.datasets.data = [];
                });

            },
            genColor(){
                return  '#' + Math.floor(Math.random() * 16777215).toString(16)

            },
            genArrayColor(count){
                if(localStorage.colorStatistics && localStorage.colorStatistics.length >= count){
                    return  JSON.parse(localStorage.colorStatistics);
                }

                let color = '';
                let colorArr = [];
                while (colorArr.length < count) {
                    color  = this.genColor()
                    if(!colorArr.includes(color))
                        colorArr.push(color)


                }
                localStorage.colorStatistics = JSON.stringify(colorArr);
                return colorArr
            }
        }
    }
</script>

<style>
    .small {
        width: 300px;
        height: 300px;
        float: left;
    }
</style>
