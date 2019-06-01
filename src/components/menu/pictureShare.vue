<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a v-for="category in allCategory" :key="category.id" @tap="getImageArr(category.id)" :class="['mui-control-item',category.id === 0 ? 'mui-active' : null ]" href="#item2mobile"
            data-wid="tab-top-subpage-2.html">
            {{ category.title }}
          </a>
        </div>
      </div>
    </div>
    <ul>
        <router-link :to="'/home/pictureShare/picDetail/' + item.id" tag="li" v-for="item in imagesArr">
          <img v-lazy="item.img_url">
          <div class="imagesList">
              <h3>{{ item.title }}</h3>
              <p>{{ item.zhaiyao }}</p>
          </div>
        </router-link> 
    </ul>
  </div>
</template>
<script>
  // 在使用的MUI的JavaScript插件时，应当引入MUi JavaScript文件
  import mui from '../../lib/mui/js/mui.min.js'
  import global from '../commonComponent/global.vue'
  export default {
    data() {
      return {
        common: global.methods,
        allCategory: [],
        imagesArr: []
      };
    },
    methods: {
      controlInit() {
        mui(".mui-scroll-wrapper").scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
      },
      getAllCategory() {
        this.common.requestGet.call(this, response => {
          // 获取数据渲染
          this.allCategory = response.body.message
          this.allCategory.unshift({ title: '全部', id: 0 })
        },null, { message: '分类列表加载失败',url: 'api/getimgcategory', param: null })
      },
      getImageArr (cateId) {
        this.common.requestGet.call(this, response => {
          this.imagesArr = response.body.message
        }, null, { param: cateId, message: '图片列表加载失败', url: 'api/getimages/'})
      }
    },
    created() {
      this.common.setLoading()
      this.getAllCategory()
      this.getImageArr(0)
    },
    mounted() {
      this.controlInit()
    },
  };
</script>
<style scoped>
.mui-scroll a {
  touch-action: pan-x;
}
ul {
  list-style: none;
  width: 100%;
  padding: 0px 10px;
}
img {
  width: 100%;
  display: block;
}
img[lazy=loading] {
  width: 100%;
  height: auto;
  margin: auto;
  background: gray;
}
ul li,ul li .imagesList {
  margin: 0px;
  padding: 0px;
}
ul li {
  position: relative;
  margin-bottom: 5px;
}
ul li .imagesList {
  position: absolute;
  color: white;
  bottom: 5px;
  padding: 0px 5px;
}
ul li,ul li .imagesList h3 {
  font-size: 16px;
  line-height: 20px;
}
ul li .imagesList p {
  color: white;
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
}
</style>