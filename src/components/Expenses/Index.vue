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
import Actions from '@/components/Expenses/Actions';
import Vue from 'vue';


Vue.component('actions', Actions)

export default {
  name: 'Dummy',
  components: {
    Actions,
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
        {
          name: '__component:actions',
          title: 'actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
