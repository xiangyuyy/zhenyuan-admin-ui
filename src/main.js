import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import '@/assets/css/global.css'
//导入字体图标
import '@/assets/font/iconfont.css'

import { formatDate } from "@/utils/date";

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' //  control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false
    //给时间添加全局过滤器
Vue.filter('formatDateTime', function(time) {
    if (time == null || time === "") {
        return " ";
    }
    let date = new Date(time);
    return formatDate(date, "yyyy-MM-dd hh:mm:ss");
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})