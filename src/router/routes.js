
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/equipment/list.vue') },
      { path: '/equipment', component: () => import('pages/equipment/list.vue') },
      { path: '/inactive', component: () => import('pages/inactive/list.vue') },
      { path: '/node', component: () => import('pages/node.vue') },
      { path: '/uploadNode', component: () => import('pages/uploadNode.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
