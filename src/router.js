import Vue from 'vue'
import Router from 'vue-router'
import Artists from './components/Artists.vue'
import Tracks from './components/Tracks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/css-animations-demo/',
      name: 'artists',
      component: Artists
    },
    {
      path: '/css-animations-demo/:id',
      name: 'tracks',
      component: Tracks
    }
  ]
})
