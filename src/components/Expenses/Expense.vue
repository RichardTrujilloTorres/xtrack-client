<template>
  <div>
      <p v-if="!expense">Loading</p>
    <div class="card" v-if="expense">
      <div class="card-header">
          <h1>{{ expense.denomination | currency('&euro;') }}</h1>
      </div>

      <div class="card card-body">
          <p>{{ expense.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
    // TODO reposition all of this
    // - global variables
    // - services
    // - configuration (use dedicated files and its managing packages/libraries)
    // - [...]
    const API_URL = 'http://localhost:8000/api'
    import axios from 'axios'

export default {
  name: 'Expense',
    mounted() {
        this.getExpense()
    },
    computed: {
      id() {
          return this.$route.params.id
      },
    },
    data() {
      return {
          expense: null
      }
    },
    methods: {
      getExpense() {
        axios.get(`${API_URL}/expenses/${this.id}`)
            .then(res => {
                this.expense = res.data.data.expenses
            })
            .catch(res => {
                console.log(res)
            })
    }
    }
}
</script>

