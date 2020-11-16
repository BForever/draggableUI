import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import render from '@/components/render'
import preview from '@/components/preview'
import photoGallary from "../components/custom_form/components/photoGallary";

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/render',
    name: 'render',
    component: render
  }, {
    path: '/preview',
    name: 'preview',
    component: preview
  },{
    path:'/gallary',
    name:'gallary',
    component:photoGallary
  }]
})
