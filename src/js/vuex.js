// ##数据反序列
var sellCart = window.localStorage.getItem('cartData') || ''
sellCart = sellCart.trim() ? JSON.parse(sellCart) : [];
// 创建模块对象
var modules = {
    state: {
        selectSell: sellCart ,
        sellCart: []
    },
    mutations: { 
        incrementCart(state, addCartData) { 
            var offset = state.selectSell.some(item => { 
                if (item.goodsId === addCartData.goodsId) { 
                     return item.sell_num += addCartData.sell_num
                }
            })
            // 储存在locaStorage中
            if (offset) {
                var carData = JSON.stringify(state.selectSell)
                return window.localStorage.setItem('cartData', carData)
            }
            state.selectSell.push(addCartData)
            var carStr = JSON.stringify(state.selectSell)
            return window.localStorage.setItem('cartData', carStr)
        },
        // 删除购物车商品
        reduceSell(state, reduSellId) { 
            var offset = null
            state.selectSell.some((item, index) => { 
                if (parseInt(item.goodsId) === reduSellId) { 
                    offset = index
                }
            })
            if (offset === null) return 
            state.selectSell.splice(offset, 1)
            var carStr = JSON.stringify(state.selectSell)
            window.localStorage.setItem('cartData', carStr)
        },
        // 修改购物车数据
        updateNum(state, updataInfo) { 
            state.selectSell.some(item => { 
                if (parseInt(item.goodsId) === updataInfo.id) { 
                    item.sell_num = updataInfo.uptateNum
                    // 终止循环
                    return true 
                }
            })
            // 重新储存
            var carStr = JSON.stringify(state.selectSell)
            window.localStorage.setItem('cartData', carStr)
        },
        // 修改购物车选中状态中
        selectUpdated(state, updateInfo) { 
            state.selectSell.some(item => { 
                if (parseInt(item.goodsId) === updateInfo.id) { 
                    item.select = updateInfo.select
                    return true
                }
            })
            // 重新储存
            var carStr = JSON.stringify(state.selectSell)
            window.localStorage.setItem('cartData', carStr)
        }
    },
    getters: {  //  你不需要调用 $store.getters.joinSell，他会自动返回处理后的值
        // 测试项目
        joinSell(state) { 
            return '这是经过拼接的数据' + state.count
        },
        // 返回购物车数量
        backSellNum(state) {
            var amount = 0
            state.selectSell.forEach(item => { 
                if (item.select) { 
                    amount += parseInt(item.sell_num)
                }
            })
            return amount
        },
        // 返回本地购物车的购买数据（以Id为键）
        getCount(state) { 
            var seletcion = {}
            state.selectSell.forEach(item => { 
                seletcion[item.goodsId] = parseInt(item.sell_num)
            })
            return seletcion
        },
        // 获取购买总数以及件数
        countPrice(state) { 
            var cartInfo =  { price: 0, sum: 0 } 
            state.selectSell.forEach(item => { 
                if (item.select) { 
                    var single  = parseFloat(item.price * item.sell_num) 
                    cartInfo.price += single
                    cartInfo.sum += parseInt(item.sell_num)
                }
            })
            return cartInfo
        },
        // 返回购物车是否被选中
        backSelectSell(state) {
            var selectObj = {}
            state.selectSell.forEach(item => { 
                selectObj[item.goodsId] = item.select
            }) 
            return selectObj
        }
    }
}
export default modules