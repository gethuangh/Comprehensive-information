<template>
  <mt-swipe @change="handleChange">
      <mt-swipe-item v-for="(item, index) in swipeImgArr" :key="index">
          <a :href="item.url" :class="isFull">
            <img  v-lazy="item.img">
          </a>
      </mt-swipe-item>
  </mt-swipe>
</template>
<script>
    export default {
        data() { 
            return {
            }
        },
        props: ['swipeImgArr','isFull'],
        methods: {
            handleChange (index) {
                this.$emit('swipeChange', index)
            }
        },
        created() {
        },
    }
</script>
<style>
  .mint-swipe {
    height: 200px;
  }
  .mint-swipe-item a {
    display: block;
    height: 100%;
  }
  .mint-swipe-item a img {
    margin: 0px auto;
    display: block;
  }
  .full img {
    width: 100% !important;
    height: 100%;
  }
  .goods img {
    height: 100%;
    width: auto;
  }
</style>