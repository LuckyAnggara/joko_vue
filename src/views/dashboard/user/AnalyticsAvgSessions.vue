<template>
  <b-card v-if="data">
    <b-row class="pb-50">
      <!-- text and button -->
      <b-col sm="6" order-sm="1" order="2" class="d-flex justify-content-between flex-column mt-1 mt-sm-0">
        <div>
          <h2 class="font-weight-bolder mb-25">
            {{ kFormatter(data.sessions) }}
          </h2>
          <b-card-text class="font-weight-bold mb-2">
            Avg Sessions
          </b-card-text>
        </div>
      </b-col>

      <!-- dropdown and chart -->
      <b-col sm="6" cols="12" order-sm="2" order="1" class="d-flex justify-content-between flex-column text-right">
        <!-- apex chart -->
        <vue-apex-charts type="bar" height="300" :options="salesBar.chartOptions" :series="data.salesBar.series" />
      </b-col>
    </b-row>
    <hr />

    <!-- progress bar -->
    <b-row class="avg-sessions pt-50">
      <b-col cols="6" class="mb-2">
        <b-card-text class="mb-50"> DIPA: ${{ data.goal }} </b-card-text>
        <b-progress value="50" max="100" height="6px" />
      </b-col>
    </b-row>
    <b-row class="avg-sessions pt-50">
      <b-col cols="6" class="mb-2">
        <b-card-text class="mb-50"> Realisasi: {{ kFormatter(data.users) }} </b-card-text>
        <b-progress value="60" max="100" height="6px" variant="warning" />
      </b-col>
    </b-row>
    <b-row class="avg-sessions pt-50">
      <b-col cols="6">
        <b-card-text class="mb-50"> Unrealisasi: {{ data.retention }}% </b-card-text>
        <b-progress value="70" max="100" height="6px" variant="danger" class="mt-25" />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  // BButton,
  // BDropdown,
  // BDropdownItem,
  BProgress,
  BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'
import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
    // BButton,
    BCardText,
    // BDropdown,
    // BDropdownItem,
    BProgress,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      salesBar: {
        chartOptions: {
          chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: 'none',
            },
          },
          colors: ['#ebf0f7', '#ebf0f7', $themeColors.primary, '#ebf0f7', '#ebf0f7', '#ebf0f7'],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              endingShape: 'rounded',
            },
          },
          tooltip: {
            x: { show: false },
          },
          xaxis: {
            type: 'numeric',
          },
        },
      },
    }
  },
  methods: {
    kFormatter,
  },
}
</script>
