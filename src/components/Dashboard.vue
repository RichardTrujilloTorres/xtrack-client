<template>
  <div>
    <clip-loader :loading="isLoading" />

    <!-- expenses by category -->
    <div
      v-show="!isLoading"
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByCategory"
          ref="expensesByCategory"
          style="height: 200px;"
        ></div>

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

    <!-- expenses by month -->
    <div
      v-show="!isLoading"
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByMonth"
          ref="expensesByMonth"
          style="height: 300px"
        ></div>

        <h5 class="card-title">
          By Month
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Current Year
        </h6>
      </div>
    </div>


    <!-- expenses timeline -->
    <div
      v-show="!isLoading"
      class="card"
    >
      <div class="card card-body">
        <div
          id="expensesByDate"
          ref="expensesByDate"
          style="height: 300px"
        ></div>

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
  data() {
    return {
      isLoading: true,
      expense: Expense
    }
  },
  computed: {
  },
  mounted() {

    // theme
    am4core.useTheme(animated);

    this.byCategory()
    this.byMonth()
    this.byDay()
  },
  methods: {
    buildUpDaysData(data) {
      let days = []

      data.map(result => {
        let date = new Date(result.day)
        // date.setHours(0,0,0,0);

        // TODO set this according to locale
        days.push({
          day: date,
          total: result.total
        })
      })

      return days
    },
    byDay() {
      let chart = am4core.create("expensesByDate", am4charts.XYChart);

      // TODO set resource
      axios.get('http://localhost:8000/api/stats/by-day')
        .then(res => {
          let data = res.data.data

          chart.data = this.buildUpDaysData(data);

          this.isLoading = false
        })
        .catch(res => {
          console.log(res)
        })


      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "total";
      series.dataFields.dateX = "day";
      series.tooltipText = "{total}"

      series.tooltip.pointerOrientation = "vertical";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.snapToSeries = series;
      chart.cursor.xAxis = dateAxis;

      //chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarX = new am4core.Scrollbar();
    },
    // Expenses by category
    byCategory() {
      // Create chart instance
      let chart = am4core.create(this.$refs.expensesByCategory, am4charts.PieChart);

      // TODO set resource
      axios.get('http://localhost:8000/api/stats/by-category')
        .then(res => {
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
    buildUpMonthData(data) {
      let results = []

      data.map(({category, month, total}) => {
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
      })

      return results
    },
    // Expenses by month for the current year
    byMonth() {
      // Create chart instance
      let chart = am4core.create(this.$refs.expensesByMonth, am4charts.XYChart);

      // TODO set resource to be consumed by the store
      axios.get('http://localhost:8000/api/stats/by-month')
        .then(res => {
          let data = res.data.data

          chart.data = this.buildUpMonthData(data)

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
    }
  }
}
</script>

