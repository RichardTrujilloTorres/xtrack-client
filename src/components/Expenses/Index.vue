<template>
  <div>
    <!-- expenses listing -->
    <datatable
      element-ref="expenses-datatable"
      :api-url="datatableUrl"
      :fields="fields"
    />
  </div>
</template>

<script>
import Datatable from '@/components/Base/Datatable';
import Actions from '@/components/Expenses/Actions';
import Vue from 'vue';


const datatableUrl = `${process.env.VUE_APP_API_URL}/expenses`;

Vue.component('actions', Actions)

export default {
  name: 'Index',
  components: {
    Actions,
    Datatable
  },
  data() {
    return {
      datatableUrl
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
          sortField: 'category.slug',
          callback: (value) => {
            return value
              ? value.name
              : '';
          }
        },
        {
          name: '__component:actions',
          title: 'actions',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
