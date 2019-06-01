<template >
  <div class="news-detail">
      <h4 class="news-title">{{ newsInfo.title  }}</h4>
      <p class="news-info">
         <span>发表时间：{{ newsInfo.add_time | strTime }} </span>
         <span>点击次数：{{ newsInfo.click }} </span>
      </p>
      <div class="news-content" v-html="newsInfo.content">
      </div>
      <comment :articleId="newsId"></comment>
  </div>
</template>
<script>
  // 导入公共组件（方法）
  import global from '../commonComponent/global.vue'
  // 导入评论子组件；
   import comment  from '../subComponent/comment.vue'
  export default {
      data() {
          return {
              newsId: this.$route.params['id'],
              message: '新闻详情加载失败',
              // 对于异步传递的数据并且渲染到页面，不能为null或者空字符串，或者将会报错，应该是空对象的方式
              newsInfo: {},
              common: global.methods
          }
      },
      methods: {
        getNewsDetail () {
           // 请求地址详情数据；
             this.$http.get('api/getnew/' + this.newsId, null).then(response => {
                this.common.cancelLoading()
                if (response.body.status !== 0) {
                  return this.common.ToastMessage()
                }
                this.newsInfo = response.body.message[0]
             } ,error => {
               
                return this.common.ToastMessage()
             }) 
         }
      },
      components: {
        comment: comment
      },
      created() {
        // 请求数据；
         this.common.setLoading()
         this.getNewsDetail()
      },
      mounted() {
      },
  }
</script>
<style lang="css">
  .news-detail {
    padding: 0px 5px;
  }
  .news-detail p {
    font-size: 12px;
  }
  .news-title {
    text-align: center;
    padding: 10px 0px;
    color: red;
    margin: 0px;
  }
  .news-detail .news-info {
    display: flex;
    justify-content: space-between;
    padding: 5px 0px;
    color: gray;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
</style>