<template>
  <div class="news-list">
    <ul class="mui-tab-view">
        <router-link class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id" :to="'/home/newsList/' + item.id">
            <a href="javascript:;" >
              <img class="mui-media-object mui-pull-left" :src="item.img_url">
              <div class="mui-media-body">
                <p class="news-list-title mui-ellipsis">{{ item.title }}</p>
                <p class="mui-ellipsis">
                  <span>发表时间：{{ item.add_time | strTime }}</span>
                  <span>链接被点击了：{{ item.click }}</span>
                </p>
              </div>
            </a>
        </router-link>
    </ul>
  </div>
</template>
<script>
import global from '../commonComponent/global.vue'
  export default {
      data() {
          return {
              message: null,
              newsList: [],
              common: global.methods
          }
      },
      methods: {
          getNewsList () {
            this.message = '列表加载错误'
            this.$http.get('api/getnewslist', null).then(response => {
              // 取消等待
              this.common.cancelLoading()
              if (response.body.status !== 0) {
                this.common.ToastMessage()
              }
              this.newsList = response.body.message
            }, (error) => {
              this.common.ToastMessage()
            })
          }
      },
      created() {
         // 数据获取
        this.getNewsList()
      },
      mounted() {
        this.common.setLoading()
      },
  }
</script>
<style >
    .news-list .mui-tab-view {
      margin: 0px;
      padding: 0px;
    }
    .news-list .mui-media-body {
      padding-left: 4rem;
    }
    .news-list .mui-media-body > p {
      font-size: 12px;
      color:black;
    }
    .news-list .mui-tab-view .news-list-title {
      font-size: 14px;
    }
    .news-list .mui-tab-view .mui-ellipsis {
      display: flex;
      justify-content: space-between;
      padding: 5px 0px;
    }
    .news-list .mui-tab-view .mui-ellipsis > span{
       color: #222aff;
    }
    .news-list .mui-tab-view .mui-media-object {
      width: 50px;
      height: 50px;
    }
</style>