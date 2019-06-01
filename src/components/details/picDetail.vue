<template>
    <div class="pic-detail">
        <h3>{{ picDetail.title }}</h3>
        <p class="pic-info">
            <span>发表时间：{{ picDetail.add_time | strTime }}</span>
            <span>点击次数：{{ picDetail.click }}</span>
        </p>
        <ul class="pic-list">
            <vue-preview
                :list="thumbnailArr"
                :thumbImageStyle="{width: '33.3%', height: 'auto'}"
                :previewBoxStyle="{border: '1px solid #eee'}"
                :tapToClose="true"
            />
        </ul>
        <p v-html="picDetail.content"></p>
        <comment :articleId="picId"></comment>
    </div>
</template>
<script>
    import global from '../commonComponent/global.vue'
    import comment from '../subComponent/comment.vue'
    export default {
        data() {
            return {
               picId: this.$route.params['picId'],
               common: global.methods,
               picDetail: {},
               thumbnailArr: []
            }
        },
        methods: {
            // #获取页面异步数据
            initData () {
                // 预览图时刷新出错
                var hash = window.location.hash.split('&')
                if (hash.length > 2) {
                    // 为了防止预览图片时用户刷新地址栏造成hash无法匹配，必须在刷新时判断地址栏参数，如果超出合法参数，进行location矫正,注意光地址矫正没有作用
                    // 还需要进行数据清空）,因为picId还是之前的数据
                    var paramsArr =  hash[0].split('/')
                    this.picId = paramsArr[paramsArr.length - 1]
                    window.location.href = window.location.origin + hash[0]
                }
                this.common.setLoading()
                this.getPicDetail()
                this.getThumbnail()
            },
            // #获取图片详情数据
            getPicDetail () {
                this.common.requestGet.call(this, response => {
                   
                    this.picDetail = response.body.message[0]
                }, null, { url: 'api/getimageInfo/', param: this.picId, message: '图片详情加载失败' })
            },
            // #获取缩略图数据并且过滤
            getThumbnail () {
                this.common.requestGet.call(this, response => {
                    // ##数据过滤
                    this.thumbnailArr = response.body.message.filter(function (item) {
                        item.w = 400, item.h =  400
                        return item
                    })
                }, null, { url: 'api/getthumimages/', param: this.picId, message: '缩略图加载失败' })
            }
        },
        created() {
            this.initData()
        },
        components: {
            comment: comment
        }
    }
</script>
<style >
    .pic-detail {
        padding: 0px 5px;
    }
    .pic-detail h3 {
        line-height: 30px;
    }
    .pic-info {
        display: flex;
        justify-content: space-between;
        padding: 7px 0px;
        border-bottom: 1px solid gray;
    }
</style>