import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import UpdatePerf from '../views/UpdatePerf.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/update-perf'
  },
  {
    path: '/update-perf',
    component: UpdatePerf
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
