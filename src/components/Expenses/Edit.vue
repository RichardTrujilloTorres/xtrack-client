<template>
  <div>
    <div class="card">
        <div v-if="errors.length" class="alert alert-danger" role="alert">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>

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
    import api from '@/api'
    import formMixins from "../../utils/formMixins";

    export default {
        created() {
            this.id = this.$route.params.id
            this.loadExpense()
        },


  name: 'Edit',
    mixins: [formMixins],
    data() {
      return {
          id: null,
          errors: [],
          expense: {
              denomination: null,
              description: null
          }
      }
    },
    methods: {
            loadExpense() {
                api.get(`/expenses/${this.id}`)
                    .then(res => {
                        console.log(res)
                        console.log(res.data.data)
                        this.expense = res.data.data.expenses
                    })
                    .catch(res => {
                        console.log(res)
                    })
            },

      submit() {
          this.validate(this.expense, this.errors)
          if (this.errors.length) {
              return
          }

          api.put(`/expenses/${this.id}`, this.expense)
              .then(res => {
                  console.log(res)
                  this.$swal('Success', 'Expense successfully created', 'success')
                  this.$router.push('/expenses')
              })
              .catch(res => {
                  console.log(res)
                  this.$swal('Error', 'Could not create expense', 'error')
              })
      }
    }
}
</script>

