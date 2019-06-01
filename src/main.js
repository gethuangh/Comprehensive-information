// 导入Vue
import Vue from 'vue'
// 导入VueRouter
import VueRouter from 'vue-router'
// 导入路由模块
import router from './router/routes.js'
// 导入Vue-resource
import vueSource from 'vue-resource'


// 导入基本Vue组件
import baseComponent from '../src/App.vue'

// 按需导入组件
import mintUI from 'mint-ui'
Vue.use(mintUI)


// 安装预览插件
import VuePreview from 'vue2-preview'
// 使用vue2-preview
Vue.use(VuePreview)

// 使用Vue-source
Vue.use(vueSource)
// 配置Vue-source
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// Vue.http.options.emulateJSON = true


import Vuex from 'vuex'

 // 使用Vue路由
Vue.use(VueRouter)
 // 使用vuex
 Vue.use(Vuex)


import vuexModule from './js/vuex.js'
 

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex) ----------------> Vuex
const store = new Vuex.Store(vuexModule)
// 定义全局过滤器
Vue.filter('strTime', function (utcTime) { 
    // 因为异步数据没有加载时，其过滤器和数据也会渲染，此时应当判断其是否有数据，有则进行过滤，无则直接返回空
    if (!utcTime) return utcTime
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utcTime.indexOf('T')
    var Z_pos = utcTime.indexOf('Z')
    // 截取当前的年月日，以及时分秒
    var year_month_day = utcTime.substr(0,T_pos)
    var hour_minute_second = utcTime.substr(T_pos+1, Z_pos-T_pos-1)
    var new_datetime = year_month_day+" "+hour_minute_second
 
    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime))
    timestamp = timestamp.getTime()
 
    // 增加8个小时，北京时间比utc时间多八个时区，注意这点；
    var timestamp = timestamp + 8 * 60 * 60 * 1000
    // 时间戳转为时间

    var beijing_datetime = new Date(parseInt(timestamp)).toLocaleString().replace(/\/|\//g, "-").replace(/日/g, " ")
    // 返回北京事件；
    return beijing_datetime 
})

var vm = new Vue({
    el: '#app',
    data: {
        
    },
    methods: {
        
    },
    components: {
        
    },
    // 渲染基本模块引擎
    render: cs => cs(baseComponent),
    router: router,
    //将数据添加到Vue实例中 
    store
})
