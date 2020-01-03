<template>
  <div>
    <clip-loader :loading="isLoading" />

    <div
      v-show="!isLoading"
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByMonth"
          ref="expensesByMonth"
          style="height: 300px"
        />

        <h5 class="card-title">
          By Month
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
import {voices} from "../../common/constants";
import {getValueFromStringOrJSON} from "../../utils/str";

export default {
  name: 'ByMonth',
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

    this.chart = am4core.create(this.$refs.expensesByMonth, am4charts.XYChart);

    // Create axes
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    this.createSeries(this.chart, voices.GROCERIES.key, voices.GROCERIES.value);
    this.createSeries(this.chart, voices.OTHER.key, voices.OTHER.value);

    // Legend
    this.chart.legend = new am4charts.Legend();

    this.loadChartData();
  },
  methods: {
    loadChartData() {
      this.isLoading = true;

      this.stats.get(`/by-month`)
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
      let results = []

      data.map(({category, month, total}) => {
        category = getValueFromStringOrJSON(category, 'name');
        let result = {}
        let exists = results.filter(result => result.month === month)

        if (exists.length) {
          if (exists.hasOwnProperty(category)) {
            exists[0][category] = exists[0][category] + total

            return
          }

          exists[0][category] = total

          return
        }

        result[category] = total
        result.month = month
        results.push(result)
      })

      // set up month name
      results.map(result => {
        result.month = this.$i18n.t(`months.${result.month}`)
      });

      this.chart.data = results;
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
