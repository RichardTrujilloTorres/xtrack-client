<template>
  <div>
      <a href="#"
         @click.prevent="showConfirmationModal"
         class="text-danger"
      >
          <i class="fa fa-trash"></i>
      </a>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmationModal',
  props: {
    callback: {
      type: Function,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    showConfirmationModal() {
      this.$swal.fire({
        title: this.$i18n.t('actions.confirm'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$i18n.t('actions.delete'),
        cancelButtonText: this.$i18n.t('actions.cancel'),
      }).then((result) => {
        if (result.value) {
          this.callback(this.id)
        }
      })
    }
  }
}
</script>
