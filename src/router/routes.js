
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/equipment/fieldList.vue') },
      { path: '/fieldEq', component: () => import('pages/equipment/fieldList.vue') },
      { path: '/indoorEq', component: () => import('pages/equipment/indoorList.vue') },
      { path: '/login', component: () => import('pages/security/login.vue') },
      { path: '/mArea', component: () => import('pages/equipment/master/area.vue') },
      { path: '/mReg', component: () => import('pages/equipment/master/region.vue') },
      { path: '/mBuild', component: () => import('pages/equipment/master/building.vue') },
      { path: '/mPtst', component: () => import('pages/equipment/master/type-subtype.vue') },
      { path: '/mManBran', component: () => import('pages/equipment/master/manufacturer-brand.vue') },
      { path: '/mPSeries', component: () => import('pages/equipment/master/series.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
