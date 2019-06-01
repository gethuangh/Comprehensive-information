<template></template>
<script>
// 导入MintIndicator
import { Indicator } from "mint-ui"
// 导入Toset组件
import { Toast } from "mint-ui"
import mui from '../../lib/mui/js/mui.min.js'
// 公共方法；
export default {
  data() {
    return {
      message: "加载失败"
    };
  },
  methods: {
    ToastMessage(message) {
      Toast({
        message: message || this.message,
        position: "bottom",
        duration: 1000
      });
    },
    setLoading() {
      this.timer = window.setTimeout(() => {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
      }, 200);
    },
    cancelLoading() {
      clearTimeout(this.timer)
      Indicator.close()
    },
    requestGet(succeedCaller, errorCaller, option) {
      option.param = option.param != null ? option.param : ''
      this.$http.get(option.url + option.param, null).then(
        response => {
          this.common.cancelLoading();
          if (response.body.status !== 0) {
            return this.common.ToastMessage(option.message)
          }
          succeedCaller && succeedCaller(response) 
        },
        error => {
          errorCaller && errorCaller()
          this.common.cancelLoading()
          return this.common.ToastMessage(option.message)
        }
      );
    },
    getMui () {
      return mui
    }
  }
};
</script>