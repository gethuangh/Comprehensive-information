<template>
  <div class="home-page">
    <swipe :swipeImgArr="swipeImg" @swipeChange="handleChange" isFull="full"></swipe>
    <div class="menu">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/newsList">
          <a href="#">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/pictureShare">
          <a href="#">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/shop">
          <a href="#">
            <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/leaveMessage">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/video">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" to="/home/contactMe">
          <a href="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import global from '../commonComponent/global.vue'
  import swipeComponent from '../subComponent/swipe.vue'
  export default {
      data() {
          return {
              swipeImg: [],
              common: global.methods
          }
      },
      methods: {
          // 获取轮播图的数据
          getSwipeImg () {
            this.$http.get('api/getlunbo',null).then(response => {   // 注意这里的地址不能以 '/' 开头
              if (response.body.status === 0) {
                this.swipeImg = response.body.message
              } else {
                this.common.ToastMessage('轮播图加载失败.....')
              }
            })
          },
          handleChange(index) {
             
          },
      },
      components: {
        swipe: swipeComponent
      },
      created () {
          // 在created时调用获取swipe图片资源
          this.getSwipeImg()
      },
  }

</script>
<style scoped>
  /* menu部分 */
  .menu .mui-grid-9 {
    background: white;
  }
  .menu  .mui-grid-9 .mui-table-view-cell {
    border: none;
  }
  .menu .mui-grid-9 .mui-media-body {
    font-size: 12px !important;
  }
  .menu .mui-grid-9 .mui-table-view-cell {
    padding-top: 0px;
    padding-bottom: 0px;
  }  
  .menu .mui-grid-view.mui-grid-9 .mui-table-view-cell > a {
    padding: 5px 0px;
  }
  .menu .mui-grid-9 .mui-table-view-cell img {
    width: 60px;
    height: 100%;
  }
</style>