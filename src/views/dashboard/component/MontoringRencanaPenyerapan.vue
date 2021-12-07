<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Revenue</b-card-title>
      <feather-icon icon="SettingsIcon" size="18" class="text-muted cursor-pointer" />
    </b-card-header>

    <b-card-body class="pb-0">
      <!-- apex chart -->
      <vue-apex-charts type="bar" height="240" :options="revenueComparisonLine.chartOptions" :series="series" />
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardTitle, BCardBody } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
// import { $themeColors } from '@themeConfig'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
  },
  data() {
    return {
      revenue: {},
      revenueComparisonLine: {
        chartOptions: {
          dataLabels: {
            enabled: false,
          },
          chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            offsetX: -10,
          },
          legend: {
            show: true,
          },
          colors: ['#731c16', '#397485'],
          markers: {
            size: 0,
            hover: {
              size: 5,
            },
          },
          xaxis: {
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '1rem',
              },
            },
            axisTicks: {
              show: false,
            },
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGS', 'SEP', 'OKT', 'NOV', 'DES'],
            axisBorder: {
              show: false,
            },
            tickPlacement: 'on',
          },
          yaxis: {
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '1rem',
              },
              formatter(val) {
                return val > 999 ? `${(val / 1000).toFixed(0)}Jt` : val
              },
            },
          },
          grid: {
            padding: {
              top: -20,
              bottom: -10,
              left: 20,
            },
          },
          tooltip: {
            x: { show: false },
          },
        },
      },
    }
  },
  computed: {
    series() {
      return this.$store.getters['app-mak/getMonitoringRencanaRealisasi']
    },
  },
}
</script>
