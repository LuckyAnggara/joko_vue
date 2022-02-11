export default [
  {
    path: '/superuser/manajemen/user',
    name: 'superuser-manajemen-user',
    component: () => import('@/views/superuser/user/Daftar.vue'),
    meta: {
      resource: 'super_user',
      pageTitle: 'Manajemen User',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
]
