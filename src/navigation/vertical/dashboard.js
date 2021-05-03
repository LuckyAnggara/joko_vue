export default [
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    tag: '2',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'eCommerce',
        route: 'dashboard-ecommerce',
      },
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
      },
    ],
  },
  {
    title: 'Login',
    route: 'auth-login-new',
    icon: 'ShieldIcon',
    // acl: {
    action: 'read',
    resource: 'ACL',
    // },
  },
]
