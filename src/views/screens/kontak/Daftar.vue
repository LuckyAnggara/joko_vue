<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-card-header class="pb-50">
          <h4>
            Data Kontak
          </h4>
        </b-card-header>
        <b-card-body>
          <div>
            <!-- Add New Item Button -->
            <div class="flex justify-content-end">
              <b-form-group>
                <div class="d-flex align-items-center">
                  <b-button
                    variant="primary"
                    @click="toTambahScreen()"
                  >
                    <span class="text-nowrap">Add Kontak</span>
                  </b-button>
                </div>
              </b-form-group>
            </div>
            <!-- search input -->
            <div class="custom-search d-flex justify-content-end">
              <b-form-group>
                <div class="d-flex align-items-center">
                  <label class="mr-1">Search</label>
                  <b-form-input
                    v-model="searchTerm"
                    placeholder="Search"
                    type="text"
                    class="d-inline-block"
                  />
                </div>
              </b-form-group>
            </div>

            <vue-good-table
              :columns="columns"
              :rows="rows"
              :search-options="{
                enabled: true,
                externalQuery: searchTerm,
              }"
              :pagination-options="{
                enabled: true,
                perPage: pageLength,
              }"
            >
              <template
                slot="table-row"
                slot-scope="props"
              >
                <!-- Column: Action -->
                <span v-if="props.column.field === 'action'">
                  <div>
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      class="btn-icon"
                      @click="view(props.row.id)"
                    >
                      <feather-icon icon="Edit2Icon" />
                    </b-button>

                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      class="btn-icon"
                      @click="del(props.row.id)"
                    >
                      <feather-icon icon="TrashIcon" />
                    </b-button>
                  </div>
                </span>

                <!-- Column: Common -->
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
              <!-- pagination -->
              <template
                slot="pagination-bottom"
                slot-scope="props"
              >
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap ">
                      Showing 1 to
                    </span>
                    <b-form-select
                      v-model="pageLength"
                      :options="['3', '5', '10']"
                      class="mx-1"
                      @input="
                        value => props.perPageChanged({ currentPerPage: value })
                      "
                    />
                    <span class="text-nowrap">
                      of {{ props.total }} entries
                    </span>
                  </div>
                  <div>
                    <b-pagination
                      :value="1"
                      :total-rows="props.total"
                      :per-page="pageLength"
                      first-number
                      last-number
                      align="right"
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mt-1 mb-0"
                      @input="
                        value => props.pageChanged({ currentPage: value })
                      "
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </template>
            </vue-good-table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import router from '@/router'
import {
  BRow,
  BCol,
  BPagination,
  BFormGroup,
  BFormInput,
  BButton,
  BCard,
  BCardHeader,
  BFormSelect,
  BCardBody,
  // BDropdown,
  // BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BButton,
    BFormSelect,
    // BDropdown,
    // BDropdownItem,
    BCard,
    BCardHeader,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Nama',
          field: 'nama',
        },
        {
          label: 'Tipe Kontak',
          field: 'tipe',
        },
        {
          label: 'Alamat',
          field: 'alamat',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'No. Telepon',
          field: 'telepon',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    loadData() {
      axios
        .get('http://127.0.0.1:8000/api/kontak')
        .then(res => {
          this.rows = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    view(obj) {
      router.push({ name: 'screen-barang-detail', params: { id: obj } })
    },
    fieldFn(rows) {
      return `${rows.harga_1} <br> ${rows.harga_2} <br> ${rows.harga_3}`
    },
    edit(id) {
      return id
    },
    del(id) {
      this.$swal({
        title: 'Delete data ?',
        text: 'Data barang akan di hapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          axios.delete(`http://127.0.0.1:8000/api/barang/${id}`).then(res => {
            if (res.status === 200) {
              this.loadData()
              this.$swal({
                icon: 'success',
                title: 'Deleted!',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
        }
      })
    },
    toTambahScreen() {
      this.$router.push({
        name: 'screen-kontak-tambah',
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
