<template>
  <div class="base-datatable">
    <!-- base datatable -->
    <vuetable
      :ref="elementRef"
      :api-url="apiUrl"
      :http-options="httpOptions"
      :fields="fields"
      pagination-path=""
      :per-page="10"
      :css="datatableCss.table"
      @vuetable:pagination-data="onPaginationData"
    />
    <vuetable-pagination-info
      ref="paginationInfo"
    />
    <vuetable-pagination
      ref="pagination"
      :css="datatableCss.pagination"
      @vuetable-pagination:change-page="onChangePage"
    />
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import datatableCss from '@/datatable.config';
import {vueAuth} from "../../main";

export default {
  name: 'Datatable',
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    elementRef: {
      type: String,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      datatableCss: datatableCss,
    }
  },
  computed: {
    httpOptions() {
      let headers = {
        headers: {}
      }
      if (vueAuth.isAuthenticated()) {
        headers.headers.Authorization = [
          vueAuth.options.tokenType, vueAuth.getToken()
        ].join(' ')
      }

      return headers
    }
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs[this.elementRef].changePage(page)
    }
  }
}
</script>
