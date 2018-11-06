<template>
  <div>
    <div class="card">
        <span class="alert-danger" v-if="errors">
          // shit
      </span>

        <form @submit.prevent="submit">

          <div class="card-header">
              <input v-model="expense.denomination" class="form-control" />
          </div>

          <div class="card card-body">
              <textarea v-model="expense.description" class="form-control"></textarea>
          </div>

            <button class="btn btn-primary" type="submit">Save</button>
            <button class="btn btn-default" type="reset">Reset</button>
        </form>
    </div>
  </div>
</template>

<script>
    const API_URL = 'http://localhost:8000/api'
    import axios from 'axios'

export default {
  name: 'Create',
    data() {
      return {
          errors: null,
          expense: {
              denomination: null,
              description: null
          }
      }
    },
    methods: {
      submit() {
          // validation either on edition or right before submission
          axios.post(`${API_URL}/expenses`, this.expense)
              .then(res => {
                  console.log(res)
                  // this.expense = res.data.data.expenses
              })
              .catch(res => {
                  // this.errors = res.data.errors
                  console.log(res)
              })

      },
    }
}
</script>

