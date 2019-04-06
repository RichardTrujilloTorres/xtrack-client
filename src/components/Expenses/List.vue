<template>
  <div>
    <div
      v-if="!expenses.length"
      class="alert alert-info"
      role="alert"
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      No expenses yet.
    </div>

    <table
      v-if="expenses.length"
      class="table"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Denomination
          </th>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses">
          <td>{{ expense.description }}</td>
          <td>{{ expense.denomination }}</td>
          <td>{{ expense.created_at }}</td>

          <td>
            <router-link :to="{ name: 'expenses-edit' , params: { id: expense.id }}">
              Edit
            </router-link>
            <delete-confirmation-modal
              :id="expense.id"
              :callback="removeExpense"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import formMixins from "@/utils/formMixins";
import DeleteConfirmationModal from '@/components/Base/DeleteConfirmationModal'
import Expense from "../../api/expense";

export default {
  name: 'List',
  components: {DeleteConfirmationModal},
  mixins: [formMixins],
  mounted() {
    this.$store.dispatch('getExpenses')
    console.log(this.expenses)
  },
  methods: {
    removeExpense(id) {
      this.resource.delete(id)
        .then(res => this.onSuccess(res))
        .catch(res => this.onFailure(res))
    }
  },
  computed: {
    ...mapState(['expenses'])
  },
  data() {
    return {
      resource: Expense,
    }
  }
}
</script>

