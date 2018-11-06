<template>
  <div>


      <p v-if="!expense">Loading</p>
    <div class="card" v-if="expense">
        <span class="alert-danger" v-if="errors">
          // shit
      </span>

        <form @submit.prevent="submit">

          <div class="card-header">
              <input v-model="expense.denomination" class="form-control" />
          </div>

          <div class="card card-body">
              <textarea v-model="expense.description" class="form-control">{{ expense.description }}</textarea>
          </div>

            <button class="btn btn-primary" type="submit">Save</button>
            <button class="btn btn-default" type="reset" @click.prevent="reset">Reset</button>
        </form>
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
  name: 'Edit',
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
          errors: null,
          expense: {
              denomination: null,
              description: null
          }
      }
    },
    methods: {
      reset() {
          this.getExpense()
      },
      submit() {
          // validation either on edition or right before submission
          axios.put(`${API_URL}/expenses/${this.id}`, this.expense)
              .then(res => {
                  console.log(res)
                  this.expense = res.data.data.expenses
                  this.message = "Expense saved"
              })
              .catch(res => {
                  // this.errors = res.data.errors
                  console.log(res)
              })

      },
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

