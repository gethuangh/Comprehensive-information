<template>
    <div class="comment">
        <h5 class="comment-title">评论</h5>
        <textarea col="30" max-length="120" class="comment-import" v-model="commentText"></textarea>
        <button type="button" class="mui-btn mui-btn-primary" @tap="pushComments">提交</button>
        <ul class="com-list">
            <li v-for="(item, index) in commentList" :key="index">
                <p class="comment-info">
                    <span>第{{ index }} 楼</span>
                    <em>用户：{{ item.user_name }}</em>
                    <span>发表时间：{{ item.add_time | strTime }}</span>
                </p>
                <p>
                    {{ item.content }}
                </p>
            </li>
            <li class="loading-more">
                <button type="button" class="mui-btn mui-btn-danger" @tap="getComMore">加载更多</button>
            </li>
        </ul>
    </div>
</template>
<script>
    import global from '../commonComponent/global.vue'
    export default {
        data() {
            return {
                commentList: [],
                pageOffset: 1,
                common: global.methods,
                commentText: ''
            }
        },
        // 接收父组件数据
        props: ['articleId'],
        methods: {
            // 获取评论的列表
            getComList () {
                this.$http.get('api/getcomments/'+ this.articleId +'?pageindex=' + this.pageOffset , null).then(response => {
                    // 结束动画
                    this.common.cancelLoading()
                    if (response.body.status !== 0) {
                        return this.common.ToastMessage('评论加载失败') 
                    }
                    // 如果加载更多则相加
                    this.commentList = this.pageOffset === 1 ? this.commentList = response.body.message : this.commentList.concat(response.body.message)
                }, error => {
                    // 结束动画
                    this.common.cancelLoading()
                })
            },
            getComMore () {
                // 加载动画
                this.common.setLoading()
                this.pageOffset ++
                
                this.getComList()
            },
            pushComments () {
                // 验证是否为合适的请求
                 this.commmenText = this.commentText.trim()
                if (!this.commentText || !this.articleId) {
                    return this.common.ToastMessage('请填写评论内容')
                }
                // 发起添加的请求
                this.$http.post('api/postcomment/' + this.articleId, { content: this.commentText }, {emulateJSON:true}).then(response => {
                    if (response.body.status !== 0) return this.common.ToastMessage('评论失败')
                    // 评论成功提示并重新加载页面
                    this.common.ToastMessage('评论成功')
                    //先手动添加然后更新数据，并制定为一页
                    console.log({ user_name: '匿名用户', add_time: new Date().toString(), content: this.commentText })
                    // 将页数变为1，并且只加载一页（将手动的值覆盖）
                    this.pageOffset = 1
                    this.getComList() 
                }, response => {
                    return this.common.ToastMessage('评论失败')
                })
            }
        },
        created() {
            // 调用获取评论列表
            this.getComList()
        }
    }
</script>
<style >
    .comment-title {
        font-size: 16px;
        color: blue;
        padding-bottom: 8px;
        border-bottom: 1px solid gray;
    }
    .comment-import {
        resize: none;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 100px;
        font-size: 14px;
    }
    .comment .mui-btn-primary, .comment .mui-btn-danger {
        width: 100%;
        margin-bottom: 8px;
    }
    .comment-info {
        color: black;
        background: gray;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -ms-border-raidus: 5px;
    }
    .comment .loading-more {
        margin-bottom: 8px;
    }
    .comment .com-list p:last-child {
        text-indent: 1rem;
    }
    .com-list p span, .com-list p em {
        padding: 0px 5px;
        font-style: normal;
    }
</style>