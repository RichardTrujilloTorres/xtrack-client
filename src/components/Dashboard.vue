<template>
  <div>
    <monthly-summary />
    <by-category></by-category>
    <by-month></by-month>
    <by-day></by-day>
  </div>
</template>

<script>
import MonthlySummary from "./Stats/MonthlySummary";
import ByCategory from "./Stats/ByCategory";
import ByMonth from "./Stats/ByMonth";
import ByDay from "./Stats/ByDay";


export default {
  name: 'Dashboard',
  components: {
    ByDay,
    ByMonth,
    ByCategory,
    MonthlySummary,
  },
  data() {
    return {
    }
  }
}
</script>

