import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import PlacePage from '@/components/pages/PlacePage.vue'
import HomePage from '@/components/pages/HomePage.vue'
import NotFoundPage from '@/components/pages/NotFoundPage.vue'
import DocumentationPage from '@/components/pages/DocumentationPage.vue'
import AboutPage from '@/components/pages/AboutPage.vue'
import LandingPage from '@/components/pages/LandingPage.vue'
import ContactPage from '@/components/pages/ContactPage.vue'

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: LandingPage,
    name: 'landing'
  },
  {
    path: '/search',
    component: HomePage,
    name: 'home',
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/places/:placeId',
    component: PlacePage,
    name: 'place',
    props: true
  },
  {
    path: '/documentation',
    component: DocumentationPage,
    name: 'documentation'
  },
  {
    path: '/about',
    component: AboutPage,
    name: 'about'
  },
  {
    path: '*',
    component: NotFoundPage,
    name: 'notfound'
  },
  {
    path: '/contact',
    component: ContactPage,
    name: 'contact'
  }

]

const rootUrl = `${process.env.VUE_APP_ROOT_URL}`

export const createRouter = () => new VueRouter({
  base: rootUrl,
  mode: 'history',
  routes: createRoutes()
})
