<template>
    <div>
        <clip-loader :loading="isLoading" />

        <!-- expenses by category -->
        <div
                v-show="!isLoading"
                class="card"
        >
            <div class="card card-body">
                <div id="expensesByCategory" ref="expensesByCategory" style="height: 200px;"></div>

                <h5 class="card-title">By Category</h5>
                <h6 class="card-subtitle mb-2 text-muted">Total</h6>
                <p class="card-text">All expenses by category</p>
            </div>
        </div>

        <!-- expenses by month -->
        <div
                v-show="!isLoading"
                class="card"
        >
            <div class="card card-body">
                <div id="expensesByMonth" ref="expensesByMonth" style="height: 300px"></div>

                <h5 class="card-title">By Month</h5>
                <h6 class="card-subtitle mb-2 text-muted">Current Year</h6>
            </div>
        </div>


        <!-- expenses timeline -->
    </div>
</template>

<script>
    import Expense from '@/api/expense';

    import ClipLoader from 'vue-spinner/src/ClipLoader';

    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import animated from '@amcharts/amcharts4/themes/animated';

    import axios from 'axios';


    export default {
        name: 'Dashboard',
        components: {
            ClipLoader,
        },
        computed: {
        },
        mounted() {

            // theme
            am4core.useTheme(animated);

            this.byCategory()
            this.byMonth()
        },
        data() {
            return {
                isLoading: true,
                expense: Expense
            }
        },
        methods: {
            byCategory() {
                // Expenses by category

                // Create chart instance
                let chart = am4core.create(this.$refs.expensesByCategory, am4charts.PieChart);

                // TODO set resource
                axios.get('http://localhost:8000/api/stats/by-category')
                    .then(res => {
                        //console.log(res)
                        chart.data = res.data.data

                        this.isLoading = false
                    })
                    .catch(res => {
                        console.log(res)
                    })

                // Add and configure Series
                let pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "total";
                pieSeries.dataFields.category = "category";
                pieSeries.slices.template.stroke = am4core.color("#fff");
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.slices.template.strokeOpacity = 1;

                // This creates initial animation
                pieSeries.hiddenState.properties.opacity = 1;
                pieSeries.hiddenState.properties.endAngle = -90;
                pieSeries.hiddenState.properties.startAngle = -90;

            },
            byMonth() {
                // Expenses by month for the current year

                // Create chart instance
                let chart = am4core.create(this.$refs.expensesByMonth, am4charts.XYChart);

                let results = []

                // TODO set resource to be consumed by the store
                axios.get('http://localhost:8000/api/stats/by-month')
                    .then(res => {
                        // console.log('by month')
                        // console.log(res.data.data)
                        // chart.data = res.data.data

                        let data = res.data.data

                        // build up data
                        data.map(({category, month, total}) => {
                            let result = {}

                            console.clear()
                            console.log(`${category}: ${total} (${month})`)

                            // already defined
                            // let exists = results.filter(result => (result.month === month) && (result[category] === category))
                            /*
                            let exists = results.filter(result => (result.month === month) &&
                                    result.hasOwnProperty(category)
                            )
                            */
                            let exists = results.filter(result => result.month === month)


                            // TODO clean this up and relocate it
                            if (exists.length) {
                                console.log(`month present : ${month}`)
                                console.log(`w/ category: ${category}`)

                                console.log('check for category for that month')
                                console.log(exists.hasOwnProperty(category))
                                // console.log(exists.category === category)

                                if (exists.hasOwnProperty(category)) {
                                    exists[0][category] = exists[0][category] + total

                                    console.log('adding up to total')
                                    return
                                }

                                console.log('new category for that month')
                                exists[0][category] = total
                                console.log(exists)
                                // result.month = month

                                return

                                /*
                                    console.log(`month present : ${month}`)
                                    console.log(`w/ category: ${category}`)
                                    */
                                    // results[category] = results[category] + total


                                // result.total = result.total + total
                            }



                            // new result

                            result[category] = total
                            result.month = month

                            results.push(result)
                        })

                        console.log('--- results')
                        console.log(results)

                        // set up month name
                        results.map(result => {
                            result.month = this.$i18n.t(`months.${result.month}`)
                        })

                        chart.data = results



                        this.isLoading = false
                    })
                    .catch(res => {
                        console.log(res)
                    })

                // Create axes
                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "month";
                categoryAxis.renderer.grid.template.location = 0;


                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.inside = true;
                valueAxis.renderer.labels.template.disabled = true;
                valueAxis.min = 0;

                // TODO eliminate hard-coding
                this.createSeries(chart, 'groceries', "Groceries");
                this.createSeries(chart, 'other', "Other");

                // Legend
                chart.legend = new am4charts.Legend();
            },

            createSeries(chart, field, name) {
                // Set up series
                let series = chart.series.push(new am4charts.ColumnSeries());
                series.name = name;
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "month";
                series.sequencedInterpolation = true;

                // Make it stacked
                series.stacked = true;

                // Configure columns
                series.columns.template.width = am4core.percent(60);
                series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

                // Add label
                let labelBullet = series.bullets.push(new am4charts.LabelBullet());
                labelBullet.label.text = "{valueY}";
                labelBullet.locationY = 0.5;

                return series;
            },

            logError(error) {
                console.log(`-- Error: ${error}`)
            }
        }
    }
</script>

