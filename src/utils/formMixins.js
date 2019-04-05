let formMixins = {
    methods: {
        validate: (expense, errors) => {
            errors.splice(0, errors.length)
            if (!expense.description) {
                errors.push('Description required')
            }

            if (!expense.denomination) {
                errors.push('Denomination required')
            }
        },
        onSuccess(res) {
            this.$swal('Success', 'Operation successfully completed', 'success')

            this.$router.push('/')
        },
        onFailure(res) {
            let message = 'Error while attempting to perform the operation'
            if (res.hasOwnProperty('message')) {
                message = res.message
            }

            this.$swal('Error', message, 'error')
            console.log(res)
        },

    }
}

export default formMixins
