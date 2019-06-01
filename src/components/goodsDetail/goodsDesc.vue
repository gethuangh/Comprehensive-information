<template>
    <div class="goods-desc">
        <div class="mui-card">
            <div class="mui-card-header">
                {{ goodsData.title }}
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-html="goodsData.content">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import global from '../commonComponent/global.vue'
    export default {
        data() {
            return {
              common: global.methods,
              goodId: this.$route.params['goodsId'],
              goodsData: {} 
            }
        },
        methods: {
            getGoodsData () {
                this.common.requestGet.call(this, response => {
                    this.goodsData = response.body.message[0]
                    
                }, null, {
                    url: 'api/goods/getdesc/',
                    param: this.goodId,
                    message: '商品详细数据加载失败'
                })
            }
        },
        created() {
            this.getGoodsData()
        },
    }
</script>
<style>
    .goods-desc .mui-card-header {
        color: #26a2ff;
    }
    .goods-desc .mui-card-content-inner img {
        width: 100%;
    }
</style>
