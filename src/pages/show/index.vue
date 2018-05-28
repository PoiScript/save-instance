
<template>
    <div :style="background">
        <div class="show"><img src="../../../static/picture/示例图.jpg" class="showBody showImage"></div>
        <div class="show"><p class="showBody showText">今天真是个好日子</p></div>
        <div class="show"><p class="showBody showAddress">广州市白云区广源大道中151号</p></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            time:'',
            image:'',
            text:'',
            address:'',
            isStorage:0,//当isStorage为0时，即缓存不存在，否则缓存存在，从缓存中读取数据
            background:'',//想把上传的图片作为背景 
        }
    },
    onLoad:function(){
    // 页面初始化
        wx.getStorage({
            key: 'key',
            success: function(res) {
                this.isStorage=1
                console.log(res.data)
            },
            fail:function(res){
                this.isStorage=0
                console.log('fail')
            }
        })
        if(this.isStorage===0){
            wx.request({
                url: '../show/getdata', //仅为示例，并非真实的接口地址
                data: {
                    image: '' ,
                    text: '',
                    address:''
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    console.log('success')
                    console.log(res.data)
                }
            })
        }
    },
}
</script>
<style scoped>
.show{
    margin: 0 auto;
    padding: 0;
    border: 0;
    width: 100%;
}
.showBody{
    margin-left: 10%;
    margin-right: 10%;
    margin-top:5%;
    width: 80%;
}
.showImage{
    margin-left: 10%;
    margin-right: 10%;
    margin-top:5%;
    width: 80%;
}
.showText{
    text-align: center;
    font-size: 28rpx;
    color: #000000;
}
.showAddress{
    text-align: center;
    font-size: 28rpx;
    color: #000000;
}
</style>
