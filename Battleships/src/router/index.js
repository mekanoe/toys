import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Game from '@/components/Game'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/game',
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
