<template>
  <section>
    <b-row class="match-height">
      <b-col lg="5">
        <b-card>
          <b-form-group label="Tahun Anggaran" label-cols-md="5">
            <v-select v-model="tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header class="align-items-baseline">
            <div>
              <b-card-title class="mb-25">
                DIPA
              </b-card-title>
              <b-card-text class="mb-0">
                TAHUN 2021 : Rp. 3000.000.000.00,-
              </b-card-text>
            </div>
            <feather-icon icon="SettingsIcon" size="18" class="text-muted cursor-pointer" />
          </b-card-header>

          <b-card-body class="pb-0">
            <!-- apex chart -->
            <vue-apex-charts type="line" height="240" :options="salesLine.chartOptions" :series="salesLine.series" />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol, BCard, BCardHeader, BCardTitle, BCardBody, BCardText } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    BRow,
    BCol,
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardText,
    BCardTitle,
    BCardBody,
  },
  data() {
    return {
      salesLine: {
        series: [
          {
            name: 'Sales',
            data: [10, 30, 40, 45, 60, 62, 65, 75, 80, 82, 0, 0],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            type: 'line',
            dropShadow: {
              enabled: true,
              top: 18,
              left: 2,
              blur: 5,
              opacity: 0.2,
            },
            offsetX: -10,
          },
          stroke: {
            curve: 'smooth',
            width: 4,
          },
          grid: {
            borderColor: '#ebe9f1',
            padding: {
              top: -20,
              bottom: 5,
              left: 20,
            },
          },
          legend: {
            show: false,
          },
          colors: ['#df87f2'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              inverseColors: false,
              gradientToColors: [$themeColors.primary],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: {
            size: 0,
            hover: {
              size: 5,
            },
          },
          xaxis: {
            labels: {
              offsetY: 5,
              style: {
                colors: '#b9b9c3',
                fontSize: '0.857rem',
              },
            },
            axisTicks: {
              show: false,
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
              show: false,
            },
            tickPlacement: 'on',
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.857rem',
              },
              formatter(val) {
                return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
              },
            },
          },
          tooltip: {
            x: { show: false },
          },
        },
      },
    }
  },
}
</script>
