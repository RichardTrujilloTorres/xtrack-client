<template>
  <div>
    <!-- expenses listing -->
    <datatable
      element-ref="expenses-datatable"
      api-url="http://localhost:8000/api/expenses"
      :fields="fields"
    />
  </div>
</template>

<script>
import Datatable from '@/components/Base/Datatable';

export default {
  name: 'Dummy',
  components: {
    Datatable
  },
  data() {
    return {
    }
  },
  computed: {
    fields() {
      return [
        {
          name: 'description',
          title: "Description",
          sortField: 'description',
        },
        {
          name: 'denomination',
          title: "Denomination",
          sortField: 'denomination',
          dataClass: 'right aligned',
        },
        {
          name: 'category',
          title: "Category", // TODO update fields to support internationalization
          sortField: 'category'
        },
      ]
    }
  },
  methods: {
  }
}
</script>
