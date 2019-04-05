<template>
  <div>
    <div class="card">
      <vue-form
        :state="formstate"
        @submit.prevent="submit"
      >
        <div class="card-header">
          {{ $t('expenses.create') }}
        </div>

        <!-- denomination -->
        <div class="card card-body">
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <validate
                tag="label"
                class="form-group required-field"
              >
                <label>{{ $t('expenses.denomination') }}*</label>
                <input
                  v-model="model.denomination"
                  class="form-control"
                  type="text"
                  name="denomination"
                  required
                >

                <field-messages
                  show="$touched || $submitted"
                  class="form-control-feedback"
                >
                  <div slot="required">
                    {{ $t('fields.required') }}
                  </div>
                </field-messages>
              </validate>
            </div>
          </div>

          <!-- description -->
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <validate
                tag="label"
                class="form-group required-field"
              >
                <label>{{ $t('expenses.description') }}</label>
                <input
                  v-model="model.description"
                  class="form-control"
                  name="description"
                  type="text"
                  required
                >

                <field-messages
                  show="$touched || $submitted"
                  class="form-control-feedback"
                >
                  <div slot="required">
                    {{ $t('fields.required') }}
                  </div>
                  <div slot="description">
                    {{ $t('fields.invalid') }}
                  </div>
                </field-messages>
              </validate>
            </div>
          </div>
        </div>

        <button
          class="btn btn-primary"
          type="submit"
        >
          {{ $t('actions.save') }}
        </button>
      </vue-form>
    </div>
  </div>
</template>

<script>
import formMixins from "../../utils/formMixins";
import Expense from '@/api/expense'


export default {
  name: 'Create',
  mixins: [formMixins],
  data() {
    return {
      resource: Expense,
      formstate: {},
      model: {
        denomination: '',
        description: '...'
      }
    }
  },
  methods: {
    onSuccess(res) {
      this.$swal('Success', 'Expense successfully created', 'success')

      this.$router.push('/expenses')
    },
    onFailure(res) {
      this.$swal('Error', 'Could not create expense', 'error')

      console.log(res)
    },
    submit() {
      if (this.formstate.$invalid) {
        this.$swal('Error', 'Please correct the errors before submitting', 'error')
        return
      }


      this.resource.store(this.model)
        .then(res => this.onSuccess(res))
        .catch(res => this.onFailure(res))
    }
  }
}
</script>

