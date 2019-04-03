<template>
    <div>
        <div class="card">
            <div v-if="errors.length" class="alert alert-danger  alert-dismissible fade show" role="alert">
                <button @click.prevent="clear" type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Error',
        props: {
            errors: {
                type: Array,
                required: false,
                default: () => []
            }
        },
        data() {
            return {
            }
        },
        methods: {
            clear() {
                this.errors.splice(0, 1)
            }
        }
    }
</script>
