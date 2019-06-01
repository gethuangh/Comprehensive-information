<template>
  <div class="cart-page">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-for="(item, offset) in carData" :key="item.id">
          <mt-switch v-model="isSelect[item.id]" @change="updatedSelect($event ,item.id)" ></mt-switch>
          <img v-lazy="item.thumb_path" alt>
          <div class="goodsInfo">
            <h4>{{ item.title  }}</h4>
            <div>
              <span class="red-color">￥{{ item.sell_price }}</span>
              <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" data-numbox-max="100" id="mui-numbox"  >
                <!-- "-"按钮，点击可减小当前数值 -->
                <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                <input class="mui-numbox-input" type="number" :value="selectionNum[item.id]" @change="updateCart($event, item.id)">
                <!-- "+"按钮，点击可增大当前数值 -->
                <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
              </div>
              <a href="#" class="removeSell" @tap.prevent="removeSell(item.id, offset)">删除</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <p>总计：（不含运费）</p>
        <div class="buy"> 
          <p>
            已勾选商品：
            <i class="red-color">{{  $store.getters.countPrice.sum }}</i>件
          </p>
          <p>
            总价：
            <i class="red-color">{{ $store.getters.countPrice.price }}</i>元
          </p>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import global from "../commonComponent/global.vue"
  import mui from '../..//lib/mui/js/mui.min.js'
  export default {
    data() {
      return {
        // 选中的数据
        selectData: null,
        isSelect: {},
        common: global.methods,
        selectDataId: [],
        carData: [],
        selectionNum: {}
      };
    },
    // 监视数量的变化，将实时的数据绘制到元素中
    watch: {
      "$store.getters.getCount": function (now) {
        this.selectionNum = now
      }
    },
    methods: {
          // 页面内容初始化
          pageInit () {
            this.getCartInfo()
            // 获取购物车数据
            this.selectionNum = this.$store.getters.getCount
            this.isSelect = this.$store.getters.backSelectSell
          },
          // 删除商品数据
          removeSell (goodsId, offset) { 
            // 本地数据删除
            this.carData.splice(offset, 1)
            // 此处应该后面进行有删除反馈
            var len = this.$store.state.selectSell
            this.$store.commit('reduceSell', goodsId)
            this.common.ToastMessage('删除成功')
          },
          updatedSelect(value, goodsId) {
            this.$store.commit('selectUpdated', { id: goodsId, select: !value  })
          },
          // 购物车本地数据反序列化
          parseCartData () {
            this.selectData = this.$store.state.selectSell
            if (this.selectData.length === 0) return 
            this.selectData.filter(item => {
              this.selectDataId.push(item.goodsId)
            })
          },
          // 获取购物车商品数据
          getCartInfo () {
            // 调用数据反序列化
            this.parseCartData()
            if (this.selectDataId.length === 0) return 
            this.common.requestGet.call(
              this,
              response => {
                this.carData = response.body.message      
              },
              null,
              {
                url: "api/goods/getshopcarlist/",
                message: "购物车为空或加载错误",
                param: this.selectDataId.toString()
              }
            )
          },
          updateCart (event ,id) {
              // 调用方法更新数据
              var value = event.srcElement.value
              this.$store.commit('updateNum', { id: id, uptateNum: value } )
          }
      },
      created () {
        this.pageInit();
      },
      mounted () {
      },
      // 购物输入框初始化，注意生命周期过程
      updated() {
        mui('.mui-numbox').numbox()
      },
  };
</script>
<style>
  .cart-page .mui-card-content-inner {
    display: flex;
    padding-top: 5px;
    justify-content: space-around;
    align-items: center;
  }

  .cart-page .goodsInfo {
    flex-wrap: wrap;
    display: flex;
    overflow: hidden;
  }

  .cart-page .mui-card-content-inner img {
    width: 50px;
    margin-right: 5px;
  }

  .cart-page .mui-card-content-inner h4 {
    font-size: 14px;
    margin-bottom: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cart-page .goodsInfo .mui-numbox {
    padding: 0px 5px;
  }

  .cart-page .red-color {
    color: #e83632;
  }

  .cart-page .mui-card-footer {
    display: block;
  }

  .cart-page .buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart-page .buy i {
    padding: 0px 5px;
    font-size: 16px;
    font-weight: 600;
  }
</style>