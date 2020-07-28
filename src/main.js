// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview';
import 'iview/dist/styles/iview.css'
import cascaderMulti from 'cascader-multi';
import iviewArea from 'iview-area';
import custom_form from './components/custom_form';
import {MdCard, MdButton, MdSwitch, MdSubheader, MdList, MdTable,MdContent,MdIcon} from "vue-material/dist/components";
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/theme/default-dark.css'
// import 'vue-material/dist/theme/black-green-dark.css'
// import 'vue-material/dist/theme/black-green-light.css'


import VueMaterial from 'vue-material'

import axios from 'axios';

Vue.config.productionTip = false
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdSwitch);
Vue.use(MdSubheader);
Vue.use(MdList);
Vue.use(MdTable);
Vue.use(MdContent);
Vue.use(MdIcon);
Vue.use(VueMaterial);

Vue.use(iview);
Vue.use(cascaderMulti);
Vue.use(custom_form);
Vue.use(iviewArea);

// axios.defaults.baseURL = '/apis';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
