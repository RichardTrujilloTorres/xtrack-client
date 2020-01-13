<template>
  <div>
    <clip-loader :loading="isLoading" />

    <!-- expenses timeline -->
    <div
      v-show="!isLoading"
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByDay"
          ref="expensesByDay"
          style="height: 300px"
        />

        <h5 class="card-title">
          By Day
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Current Year
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import animated from '@amcharts/amcharts4/themes/animated';
import Stats from "../../api/stats";
import ClipLoader from 'vue-spinner/src/ClipLoader';

export default {
  name: 'ByDay',
  components: {
    ClipLoader,
  },
  data: () => ({
    isLoading: true,
    stats: Stats,
    chart: null
  }),
  mounted() {
    am4core.useTheme(animated);

    this.chart = am4core.create(this.$refs.expensesByDay, am4charts.XYChart);


    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "total";
    series.dataFields.dateX = "day";
    series.tooltipText = "{total}"

    series.tooltip.pointerOrientation = "vertical";

    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.snapToSeries = series;
    this.chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    this.chart.scrollbarX = new am4core.Scrollbar();

    this.loadChartData();
  },
  methods: {
    loadChartData() {
      this.isLoading = true;

      this.stats.get(`/by-day`)
        .then(res => {
          this.isLoading = false;

          this.buildUpChartData(res.data.data);
        })
        .catch(res => {
          this.isLoading = false;
          console.log(res)
        })
    },
    buildUpChartData(data) {
      let days = [];

      data.map(result => {
        let date = new Date(result.day);
        let dateExists = days.find(single => (new Date(single.day)).getTime() === date.getTime())

        if (dateExists) {
          return days[days.indexOf(dateExists)].total += result.total
        }

        days.push({
          day: date,
          total: result.total
        })
      });

      this.chart.data = days;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
