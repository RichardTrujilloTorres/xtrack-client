<template>
  <div>
    <router-link :to="{ name: 'expenses-edit' , params: { id: rowData.id }}">
      Edit
    </router-link>
    <delete-confirmation-modal
      :id="rowData.id"
      :callback="removeExpense"
    />
  </div>
</template>

<script>

import DeleteConfirmationModal from "../Base/DeleteConfirmationModal";
import Expense from "../../api/expense";
import formMixins from "../../utils/formMixins";

export default {
  name: 'Actions',
  components: {DeleteConfirmationModal},
  mixins: [formMixins],
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  data() {
    return {
      resource: Expense
    }
  },
  methods: {
    removeExpense(id) {
      this.resource.delete(id)
        .then(res => this.onSuccess(res))
        .catch(res => this.onFailure(res))

    }
  }
}
</script>
