<template>
    <div class="goodsCom" >
         <comments :articleId="goodsId"></comments>
    </div>
</template>
<script>
    import comments from '../subComponent/comment.vue'
    export default {
        data() {
            return {
                goodsId: this.$route.params['goodsId']
            }
        },
        components: {
            comments: comments
        }
    }
</script>