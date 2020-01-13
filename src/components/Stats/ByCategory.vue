<template>
  <div>
    <clip-loader :loading="isLoading" />

    <div
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByCategory"
          ref="expensesByCategory"
          style="height: 200px;"
        />

        <h5 class="card-title">
          By Category
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Total
        </h6>
        <p class="card-text">
          All expenses by category
        </p>
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
import {CATEGORY} from "../../common/constants";

export default {
  name: 'ByCategory',
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

    this.chart = am4core.create(this.$refs.expensesByCategory, am4charts.PieChart);
    this.loadChartData();
  },
  methods: {
    loadChartData() {
      this.isLoading = true;

      this.stats.get(`/by-category`)
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
      this.chart.data = data.map(({total, category}) => ({
        total,
        category: category ? category.name : CATEGORY.DEFAULT
      }));

      // Add and configure Series
      let pieSeries = this.chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "total";
      pieSeries.dataFields.category = "category";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
