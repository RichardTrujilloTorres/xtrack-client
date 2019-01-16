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
  name: 'Create',
    mixins: [formMixins],
    data() {
      return {
          errors: [],
          expense: {
              denomination: null,
              description: null
          }
      }
    },
    methods: {
      submit() {
          this.validate(this.expense, this.errors)
          if (this.errors.length) {
              return
          }

          api.post('/expenses', this.expense)
              .then(res => {
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

