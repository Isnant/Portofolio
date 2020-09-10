
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/equipment/fieldList.vue') },
      { path: '/fieldEq', component: () => import('pages/equipment/fieldList.vue') },
      { path: '/indoorEq', component: () => import('pages/equipment/indoorList.vue') },
      { path: '/networkEq', component: () => import('pages/equipment/networkList.vue') },
      { path: '/mAreaRegion', component: () => import('pages/equipment/master/area-region.vue') },
      { path: '/mReg', component: () => import('pages/equipment/master/region.vue') },
      { path: '/mBuild', component: () => import('pages/equipment/master/building.vue') },
      { path: '/mPtst', component: () => import('pages/equipment/master/type-subtype.vue') },
      { path: '/mManBran', component: () => import('pages/equipment/master/manufacturer-brand.vue') },
      { path: '/mPSeries', component: () => import('pages/equipment/master/series.vue') },
      { path: '/mOthers', component: () => import('pages/equipment/master/others.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/security/login.vue') }
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
