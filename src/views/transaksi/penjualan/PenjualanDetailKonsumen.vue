<template>
  <validation-observer
    #default="{ handleSubmit }"
    ref="refFormObserver"
  >
    <b-form
      class="list-view product-checkout"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <b-row>
        <b-col
          cols="12"
          md="7"
        >
          <!-- Left Form -->
          <b-card no-body>
            <b-card-header class="flex-column align-items-start">
              <b-card-title>Data Pelanggan</b-card-title>
            </b-card-header>
            <b-card-body>
              <b-row>
                <!-- Full Name -->
                <b-col cols="12">
                  <b-form-group
                    label="Pelanggan Lama"
                    label-for="nama-pelanggan-lama"
                    label-cols-md="4"
                    class="mb-2"
                  >
                    <v-select
                      v-model="namaPelanggan"
                      placeholder="Nama Pelanggan"
                      label="title"
                      :options="option"
                    >
                      <template #list-header>
                        <li
                          class="add-new-data-header d-flex align-items-center my-50"
                        >
                          <feather-icon
                            icon="PlusIcon"
                            size="16"
                          />
                          <span
                            class="align-middle ml-25"
                          >Tambah Pelanggan</span>
                        </li>
                      </template>
                    </v-select>
                    <p class="text-sm-left">
                      Kosongkan jika Pelanggan adalah
                      <strong><b>Pelanggan Baru</b></strong>
                    </p>
                  </b-form-group>
                </b-col>

                <hr>

                <!-- Nama Pelanggan -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    name="Nama Pelanggan"
                    rules="required"
                  >
                    <b-form-group
                      label="Nama Pelanggann"
                      label-for="nama-pelanggan"
                      class="mb-2"
                      label-cols-md="4"
                    >
                      <b-form-input
                        id="nama-pelanggan"
                        v-model="alamatDetail.namaPelanggan"
                        :state="getValidationState(validationContext)"
                        trim
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- Alamat -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    name="Alamat Pengiriman"
                    rules="required"
                  >
                    <b-form-group
                      label="Alamat Pelanggan"
                      label-for="alamat-pengiriman"
                      class="mb-2"
                      label-cols-md="4"
                    >
                      <b-form-textarea
                        id="alamat-pengiriman"
                        v-model="alamatDetail.alamat"
                        rows="4"
                        :state="getValidationState(validationContext)"
                        trim
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Nomor Telepon -->
                <b-col cols="12">
                  <b-form-group
                    label="Nomor Telepon"
                    label-for="nomor-telepon"
                    class="mb-2"
                    label-cols-md="4"
                  >
                    <b-form-input
                      id="nomor-telepon"
                      v-model="alamatDetail.nomorTelepon"
                      trim
                    />
                  </b-form-group>
                </b-col>

                <!-- Submit Button -->
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col
          cols="12"
          md="5"
        >
          <!-- Right Col -->
          <div class="customer-card">
            <b-card :title="alamatDetail.namaPelanggan">
              <b-card-text class="mb-1">
                {{ alamatDetail.namaPelanggan }}
              </b-card-text>
              <b-card-text style="white-space:pre-line;">
                {{ alamatDetail.alamat }}
              </b-card-text>
              <b-card-text class="mb-1">
                {{ alamatDetail.nomorTelepon }}
              </b-card-text>
              <b-col cols="6">
                <b-button
                  variant="primary"
                  type="submit"
                  block
                >
                  <!-- @click="$emit('next-step')" -->
                  Lanjut
                </b-button>
              </b-col>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import { required, integer } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'

export default {
  components: {
    // BSV
    BForm,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BFormInvalidFeedback,

    // Form Validation
    ValidationProvider,
    ValidationObserver,

    // 3rd party
    vSelect,
  },
  props: {
    alamatDetail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      namaPelanggan: null,
      option: [
        { title: 'Square' },
        { title: 'Rectangle' },
        { title: 'Rombo' },
        { title: 'Romboid' },
      ],
    }
  },
  setup(_, { emit }) {
    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(() => {})

    const onSubmit = () => {
      emit('next-step')
    }

    return {
      // Form
      onSubmit,
      // Form Validation
      refFormObserver,
      getValidationState,
      resetForm,
      // FOrm Validators
      required,
      integer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.add-new-data-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}
</style>
