import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/inside',
    name: 'inside',
    component: () => import('../views/StartiView.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../components/Users.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not found',
    component: {
      template: 'Not Found',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
