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

          <!-- category -->
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <validate
                      tag="label"
                      class="form-group required-field"
              >
                <label class="type__label">{{ $t('expenses.category') }}</label>
                <multiselect
                        v-model="model.category"
                             :options="categories"
                             :searchable="false"
                             :close-on-select="true"
                             :show-labels="false"
                             :placeholder="$t('requests.select', { selection: 'category' })">
                </multiselect>

                <field-messages
                        show="$touched || $submitted"
                        class="form-control-feedback"
                >
                  <div slot="required">
                    {{ $t('fields.required') }}
                  </div>
                  <div slot="category">
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
import Multiselect from 'vue-multiselect';


export default {
  name: 'Create',
  components: {Multiselect},
  mixins: [formMixins],
  data() {
    return {
      resource: Expense,
      formstate: {},
      model: {
        denomination: '',
        description: '...',
        category: null
      },
      // TODO BE based
      categories: [
        'groceries',
        'medicines',
        'transportation',
        'other'
      ],
    }
  },
  methods: {
    submit() {
      if (this.formstate.$invalid) {
        this.$swal('Error', this.$i18n.t('form.toCorrect'), 'error')
        return
      }

      this.resource.store(this.model)
        .then(res => this.onSuccess(res))
        .catch(res => this.onFailure(res))
    }
  }
}
</script>
<style>
  .multiselect {
    width: fit-content !important;
  }

  .multiselect__content-wrapper {
    width: fit-content !important;
  }

  /*
  .multiselect__element {
    width: fit-content !important;
  }
  */
</style>

