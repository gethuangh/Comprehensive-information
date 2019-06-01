<template>
    <div class="shop-list">
        <ul >
            <li v-for="item in shopArr" :key="item.id">
                <div @tap="goDatail(item.id)" class="shopContent" :to="'/home/shop/commodityDetail/' + item.id" tag="div">
                    <img v-lazy="item.img_url" alt="">
                    <h3>{{ item.title }}</h3>
                    <div class="shopInfo">
                        <p class="price">
                            <em>￥{{ item.sell_price}}</em> 
                            <i>￥{{ item.market_price}}</i>
                        </p>
                        <p class="sell">
                            <em>热销中</em>
                            <i>剩余{{ item.stock_quantity }}件</i>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import global from '../commonComponent/global.vue'
    export default {
        data () {
            return {
                common: global.methods,
                pageOffset: 1,
                shopArr: []
            }
        },
        methods: {
            getShopArr () {
                this.common.requestGet.call(this, response => {
                    this.shopArr = response.body.message
                }, null , {
                    url: 'api/getgoods?pageindex=' ,
                    param: this.pageOffset,
                    message: '商品列表加载失败'
                })
            },
            goDatail (commodityId) {
                this.$router.push({ path: '/home/shop/commodityDetail/' + commodityId})
            }
        },
        created() {
            this.common.setLoading()
            this.getShopArr()
        },
    }
</script>
<style >
    img[lazy=loading] {
        width: 100%;
        height: auto;
        margin: auto;
        background: gray;
    }
    .shop-list ul {
        padding: 0px 5px;
        overflow: hidden;
    }
    .shop-list ul li {
        float: left;
        width: 50%;
        padding: 5px 3px;
    }
    .shop-list .shopContent {
        border: 1px solid #E6E6E5;
        vertical-align: middle;
    }
    .shop-list li img {
        width: 100%;
        height: 174.5px;
        display: block;
    }
    .shop-list li h3 {
        font-size: 14px;
        overflow: hidden;
        max-height: 28px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
    }
    .shopInfo {
        padding: 0px 5px;
        background-color: #F6F6F6;
    }
    .shop-list li p {
        padding-top: 5px;
    }
    .shop-list li .price {

    }
    .shop-list li .price em {
        color: #e83632;
    }
    .shop-list li .price i {
        font-size: 10px;
        text-decoration: line-through;
    }
    .shop-list li .sell {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
</style>