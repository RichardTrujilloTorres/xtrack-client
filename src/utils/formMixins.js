
let formMixins = {
  data: () => ({
    errors: []
  }),
  methods: {
    validate: (expense, errors) => {
      // errors.splice(0, errors.length)
      errors.splice(0, 1)
      if (!expense.description) {
        errors.push('Description required')
      }

      if (!expense.denomination) {
        errors.push('Denomination required')
      }
    },
    onSuccess(res) {
      this.$swal(
        this.$i18n.t('status.success'),
        this.$i18n.t('operation.success'),
        'success'
      )

      this.$router.push('/')
    },
    onFailure(res) {
      let message = this.$i18n.t('operation.error')
      if (res.hasOwnProperty('message')) {
        message = res.message
      }

      this.$swal('Error', message, 'error')
      console.log(res)
    },

  }
}

export default formMixins
