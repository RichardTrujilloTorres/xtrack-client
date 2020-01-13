<template>
  <div
    v-if="summary"
    class="monthly-summary"
  >
    <div class="card-group">
      <!-- highest category -->
      <div
        v-if="summary.highestCategory"
        class="card"
        style="width: 18rem;"
      >
        <div class="card-body">
          <h5 class="card-title">
            Highest Category | This Month
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ summary.highestCategory.category }}
          </h6>
          <p class="card-text">
            {{ summary.highestCategory.total | round | euro }}
          </p>
        </div>
      </div>

      <!-- highest single expense -->
      <div
        v-if="summary.highestExpense"
        class="card"
        style="width: 18rem;"
      >
        <div class="card-body">
          <h5 class="card-title">
            Highest Expense | This Month
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ summary.highestExpense.category }} | {{ summary.highestExpense.denomination | round | euro }}
          </h6>
          <p class="card-text">
            {{ summary.highestExpense.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {ACTIONS} from "../../store";
export default {
  name: 'MonthlySummary',
  data: () => ({
    summary: null
  }),
  created() {
    this.getMonthlySummary()
      .then(res => {
        this.summary = res.data.data
      })
      .catch(res => console.log(res))
  },
  methods: {
    ...mapActions({
      getMonthlySummary: ACTIONS.STATS.MONTHLY_SUMMARY
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
