<template>
  <div>
      <div class="alert alert-info" role="alert" v-if="!expenses.length">
          <button type="button" class="close"
                  data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        No expenses yet.
      </div>

    <table class="table" v-if="expenses.length > 0">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Description</th>
        <th scope="col">Denomination</th>
        <th scope="col">Date</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="expense in expenses">
        <td>{{ expense.description }}</td>
        <td>{{ expense.denomination }}</td>
        <td>{{ expense.created_at }}</td>

        <td>
          <router-link :to="{ name: 'expenses-edit' , params: { id: expense.id }}">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

export default {
  name: 'List',
    mounted() {
      this.$store.dispatch('getExpenses')
        console.log(this.expenses)
    },
    computed: {
      // Not working:
        // mapState({expenses: state => state.expenses})
      // mapState(['expenses'])
        // similar...

        // Fixed: Work importing statement...
        /*
      expenses() {
          return this.$store.state.expenses
      }
      */
        ...mapState(['expenses'])
    },
    data() {
      return {
        }
    }
}
</script>

