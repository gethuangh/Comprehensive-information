<template>
    <div class="shop-detail">
        <transition 
            @before-enter="before_enter_func"
            @enter="enter_func"
            @after-enter="after_enter_func"
        >
            <i  class="addCartball" ref="ball" v-show="addFlag"></i>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :swipeImgArr="commodityImages" :isFull="'goods'" @swipeChange="handleChange"></swipe>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ commodityDetail.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <p class="price">
                         <i>市场价：</i><span class="old">￥{{ commodityDetail.market_price }}</span>
                        <i>销售价：</i><span class="now">￥{{ commodityDetail.sell_price  }}</span>
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">
                <div class="sell-handler">
                    <span>购买数量：</span>
                    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='commodityDetail.stock_quantity'>
                        <!-- "-"按钮，点击可减小当前数值 -->
                        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                        <input class="mui-numbox-input" type="number"  ref="sell_num"  v-model="sellNum"  />
                        <!-- "+"按钮，点击可增大当前数值 -->
                        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                    </div>
                </div>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="default" class="addCart" size="small" @tap.native="addCart">加入购物车</mt-button>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">
                商品参数
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品的货号：{{ commodityDetail.goods_no }}</p>
                    <p >库存情况：{{ commodityDetail.stock_quantity }}</p>
                    <p >上架时间：{{ commodityDetail.add_time | strTime }}</p>
                </div>
            </div>
            <div class="mui-card-footer">                                                                    
                <a class="mui-card-link" @tap="toGoodsDetail">
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </a>
                <a class="mui-card-link" @tap="toGoodsComment">
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import swipeComponent from '../subComponent/swipe.vue'
    import global from '../commonComponent/global.vue'
    var mui = global.methods.getMui()
    export default {
        data () {
            return {
                common: global.methods,
                commodityId: this.$route.params['commodityId'],
                commodityImages: [],
                commodityDetail: {},
                sellNum: 0,
                addFlag: false
            }
        },
        methods: {
            pageInit () {
                this.getCommodityImages()
                this.getGoods()
            },
            getCommodityImages () {
               if (this.commodityId === null) {
                  return this.common.ToastMessage('参数错误')
               }
               this.common.requestGet.call(this, response => {
                    response.body.message.filter(item => {
                       item.img = item.src
                   } )
                   this.commodityImages = response.body.message
               }, null, {
                   url: 'api/getthumimages/',
                   param: this.commodityId,
                   message: '获取商品图片失败'
               })
            },
            getGoods () {
                if (this.commodityId === null) return 
                this.common.requestGet.call(this, response => {
                    this.commodityDetail = response.body.message[0]
                }, null, {
                    url: 'api/goods/getinfo/',
                    param: this.commodityId,
                    message: '商品信息加载失败'
                })
            },
            // swipe用户滑动时触发
            handleChange (index) {

            },
            toGoodsDetail () {
                if (this.commodityId === null) return false
                this.$router.push({ name: 'goodsDesc', params: { goodsId: this.commodityId }  })
            },
            toGoodsComment () {
                if (this.commodityId === null) return false
                this.$router.push({ name: 'goodsComment', params: { goodsId: this.commodityId } })
            },
            addCart () {
                this.sellNum = mui('.mui-numbox').numbox().getValue()
                if (this.sellNum === null || !parseInt(this.sellNum)) return this.common.ToastMessage('请输入数量') 
                // pusu到购物车
                this.$store.commit('incrementCart', { goodsId: this.commodityId, price: this.commodityDetail.sell_price, sell_num: this.sellNum, select: true })
                 this.addFlag = true
            },
            // 球动画函数
            before_enter_func (el) {
                // 获取位置值以及设置位置
                el.style.transform = 'translate(0px,0px)'
            },
            enter_func (el, done) {
                el.offsetWidth // 激活动画
                // 获取badge的位置 ,通过mui的选择器来获取
                var rectClient = mui('.mui-badge')[0].getBoundingClientRect()
                var TheClient = el.getBoundingClientRect()
                var x = rectClient.left - TheClient.left
                var y = rectClient.top - TheClient.top
                el.style.transform = 'translate('+ x +'px,' + y + 'px)'
                el.style.transition = 'all 1s linear 0s'
                done()
            },
            after_enter_func (el) {
                // 终止下半场动画
                this.addFlag = !this.addFlag
            }
        },
        created () {
            // 组件数据初始化
            this.pageInit()
        },
        mounted () {
            // 购物输入框初始化
            mui('.mui-numbox').numbox()
        },
        components: {
            swipe: swipeComponent
        }
    }
</script>
<style>
    .shop-detail {
        position: relative;
    }
    .shop-detail .price span {
        padding: 0px 8px;
    }
    .shop-detail .price i {
        color: black;
    }
    .shop-detail .now {
        color: #e83632;
    }
    .shop-detail .old {
        text-decoration: line-through;
    }
    .addCart {
        background-color: orange;
        color: white;
    }
    .shop-detail .sell-handler {
        margin-bottom: 10px;
    }
    .shop-detail .mui-card-footer {
        text-align: left;
        justify-content: left;
        display: block;
    }
    .shop-detail .mint-button--small {
        margin: 0px 5px;
    }
    .shop-detail .mui-card-footer .mui-card-link {
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .shop-detail .addCartball {
        display: block;
        width: 10px;
        height: 10px;
        background-Color: #e83632;
        position: absolute;
        left: 155px;
        top: 358px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
         transform: translate(0px,0px);
         z-index: 100;
    }
</style>