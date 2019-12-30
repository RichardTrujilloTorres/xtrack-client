<template>
  <div>
    <!-- login -->
    <div class="card">
      <vue-form
        :state="formstate"
        @submit.prevent="submit"
      >
        <div class="card-header">
          {{ $t('auth.login') }}
        </div>

        <!-- email -->
        <div class="card card-body">
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <validate
                tag="label"
                class="form-group required-field"
              >
                <label>{{ $t('user.email') }}*</label>
                <input
                  v-model="model.user.email"
                  class="form-control"
                  type="email"
                  name="email"
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
        </div>

        <!-- password -->
        <div class="card card-body">
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <validate
                tag="label"
                class="form-group required-field"
              >
                <label>{{ $t('user.password') }}*</label>
                <input
                  v-model="model.user.password"
                  class="form-control"
                  type="password"
                  name="password"
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
        </div>



        <button
          class="btn btn-primary"
          type="submit"
        >
          {{ $t('actions.submit') }}
        </button>
      </vue-form>
    </div>
  </div>
</template>

<script>

import formMixins from '@/utils/formMixins';
import {ACTIONS} from "../../store";

export default {
  name: 'Login',
  components: {
  },
  mixins: [formMixins],
  data() {
    return {
      formstate: {},
      model: {
        user: {
          email: '',
          password: ''
        }
      },
    }
  },
  methods: {
    submit() {
      if (this.formstate.$invalid) {
        this.$swal('Error', this.$i18n.t('form.toCorrect'), 'error')
        return
      }

      this.$store.dispatch(ACTIONS.USER.LOGIN, {
        user: this.model.user
      })
        .then(res => {
          this.onSuccess(res)
        })
        .catch(res => {
          this.onFailure(res)
        })
    }
  }
}
</script>
