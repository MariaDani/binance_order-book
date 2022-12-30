import { createRouter, createWebHistory } from 'vue-router';
import OrderBook from '@/components/OrderBook';
import CryptoCurrency from '@/components/CryptoCurrency';

const routes = [
  {
    path: '/',
    component: OrderBook
  },

  {
    path: '/currency',
    component: CryptoCurrency
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
