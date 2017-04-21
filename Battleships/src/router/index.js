import Vue from 'vue'
import Router from 'vue-router'

import Game from '@/components/Game'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
