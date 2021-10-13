<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="9" md="12">
        <card-analytic-sale-line-chart />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

// import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
// import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
// import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
// import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'
// import AnalyticsTimeline from './AnalyticsTimeline.vue'
// import AnalyticsSalesRadarChart from './AnalyticsSalesRadarChart.vue'
// import AnalyticsAppDesign from './AnalyticsAppDesign.vue'
// import CardAnalyticRevenue from './CardAnalyticRevenue.vue'
import CardAnalyticSaleLineChart from './CardAnalyticSaleLineChart.vue'

export default {
  components: {
    BRow,
    BCol,
    // AnalyticsCongratulation,
    // AnalyticsAvgSessions,
    // StatisticCardWithAreaChart,
    // AnalyticsSupportTracker,
    // AnalyticsTimeline,
    // AnalyticsSalesRadarChart,
    // AnalyticsAppDesign,
    // CardAnalyticRevenue,
    CardAnalyticSaleLineChart,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/analytics/data').then(response => {
      this.data = response.data
    })
    localStorage.name = 'Lucky'
  },
  methods: {
    kFormatter,
  },
}
</script>
