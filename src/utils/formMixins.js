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
        }
    }
}

export default formMixins