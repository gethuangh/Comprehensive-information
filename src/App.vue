<template>
  <div class="app-container">
    <!-- 顶部-->
   <mt-header title="" fixed>
        <mt-button icon="back" slot="left" @tap.native="backPage" v-if="flag">返回</mt-button>
    </mt-header>
    <!-- 组件动画 -->
    <transition>
     <!-- 路由组件-->
      <router-view></router-view>
    </transition>
    <!-- 底部导航-->
    <nav class="mui-bar mui-bar-tab">
      <router-link  tag="div" class="mui-tab-item-ball" to="/home">
				 <span class="mui-icon mui-icon-home"></span>
				 <span class="mui-tab-label">首页</span>
      </router-link>
			<router-link tag="div" class="mui-tab-item-ball" to="/member" >
				  <span class="mui-icon mui-icon-person"></span>
				  <span class="mui-tab-label">消息</span>
      </router-link>
      <router-link tag="div" class="mui-tab-item-ball" to="/cart">
				 <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">{{ $store.getters.backSellNum }}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
      </router-link>
			<router-link tag="div" class="mui-tab-item-ball"  to="/search">
				  <span class="mui-icon mui-icon-search"></span>
				  <span class="mui-tab-label">搜索</span>
      </router-link>
		</nav>
  </div>
</template>
<script>
  // 导入MUI style sheet
  import './lib/mui/css/mui.min.css'
  //组件数据
  export default {
      data() {
        return {
          selectNum: 0,
          addSellCart: [],
          flag: false
        }
      },
      methods: {
        // 页面返回
        backPage () {
          this.$router.go(-1)
        }
      },
      mounted() {
        
      },
      watch: {
        // 监听路由地址并判断地址变化
        "$route.path": function (now, old) {
          if (now.split('/').length === 2) {
            this.flag = false
          } else {
            this.flag = true
          }
        }
      },
      created() {
         // 判断是否为一级路由
         if (this.$route.path.split('/').length === 2) {
           this.flag = false
         } else {
           this.flag = true
         }
      },
  }
</script>
<style>
  em,i {
    font-style: normal;
  }
  body {
    background-color: white !important;
  }
  .app-container {
    /* 留出上下距离 */
    padding-top: 40px;
    padding-bottom: 50px;
    /* 防止以为切换造成的滚动条 */
    overflow-x: hidden;
    /* 基础字号 */
    font-size: 12px;
    max-width: 750px;
    margin: 0px auto;
  }
  .app-container p {
    margin-bottom: 0px;
  }
  /* 组件动画 */
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%)
  }
  .v-enter-active,
  .v-leave-active {
    opacity: 1;
    transition: all 0.5s ease-in;
  }
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
  .app-container .mui-bar-tab {
    box-shadow:0 0 1px  #cfcfcf;
    -webkit-box-shadow: 0 0 1px #cfcfcf;
  }
  .mui-bar-tab .mui-tab-item-ball {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    line-height: 21px;
  }
  .mui-bar-tab .mui-active {
      color: #007aff;
  }
  .mui-tab-item-ball .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-ball .mui-icon-extra {
    font-family: MuiiconSpread;
  }
  .mui-tab-item-ball .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>