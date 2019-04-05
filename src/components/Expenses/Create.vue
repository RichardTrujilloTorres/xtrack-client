<template>
  <div>
    <div class="card">
        <error :errors="errors"></error>

            <vue-form :state="formstate" @submit.prevent="submit">

                <div class="card-header">
                    Expense Creation
                </div>

                <!-- denomination -->
                <div class="card card-body">
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <validate tag="label" class="form-group required-field" >
                                <label>Denomination *</label>
                                <input class="form-control" v-model="model.denomination" type="text" name="denomination" required />

                                <field-messages  show="$touched || $submitted" class="form-control-feedback">
                                    <div slot="required">Denomination required</div>
                                </field-messages>
                            </validate>

                        </div>
                    </div>

                    <!-- description -->
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <validate tag="label" class="form-group required-field" >
                                <span>Description</span>
                                <input class="form-control" v-model="model.description" name="description" type="text" required />

                                <field-messages show="$touched || $submitted" class="form-control-feedback">
                                    <div slot="required">Description is required</div>
                                    <div slot="description">Invalid description</div>
                                </field-messages>
                            </validate>
                        </div>
                    </div>

                </div>

                <button class="btn btn-primary" type="submit">Save</button>
            </vue-form>
    </div>
  </div>
</template>

<script>
    import api from '@/api'
    import formMixins from "../../utils/formMixins";
    import Error from "@/components/Base/Error";
    import Expense from '@/api/expense'


    export default {
  name: 'Create',
    components: {Error},
    mixins: [formMixins],
    data() {
      return {
          resource: Expense,
          formstate: {},
          model: {
              denomination: '',
              description: '...'
          },
          errors: [],
          expense: {
              denomination: null,
              description: null
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
              return;
          }


          this.resource.store(this.model)
              .then(res => this.onSuccess(res))
              .catch(res => this.onFailure(res))

      }
    }
}
</script>

