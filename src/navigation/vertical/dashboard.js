export default [
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    children: [
      {
        title: 'eCommerce',
        route: 'dashboard-ecommerce',
      },
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
      },
      {
        title: 'User',
        route: 'dashboard-user',
      },
    ],
  },
  {
    title: 'Dashboards User',
    icon: 'HomeIcon',
    resource: 'user',
    route: 'dashboard-user',
  },
  {
    title: 'Dashboards Umum',
    icon: 'HomeIcon',
    route: 'dashboard-umum',
    resource: 'admin_umum',
  },
  {
    title: 'Dashboards Keuangan',
    icon: 'HomeIcon',
    route: 'dashboard-keuangan',
    resource: 'admin_keuangan',
  },
  {
    title: 'Dashboards PPK',
    icon: 'HomeIcon',
    route: 'dashboard-ppk',
    resource: 'dashboard_ppk',
  },
  {
    title: 'Dashboards Bendahara',
    icon: 'HomeIcon',
    route: 'dashboard-bendahara',
    resource: 'dashboard_bendahara',
  },
]
