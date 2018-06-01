<template>
<div>
  <div class="show" v-if="istoday==1">
    <div class="show">
        <div class="show"><img :src="photo" class="showBody showImage"></div>
        <div class="show"><p class="showBody showText">今天真是个好日子</p></div>
        <div class="show"><p class="showBody showAddress">广州市白云区广源大道中151号</p></div>
    </div>
  </div>
  <div class="userbackground" v-if="istoday==0">
    <form report-submit="true" @submit="formSubmit">
      <button form-type="submit">
        <div class="updiv"></div>
      </button>
      <div class="imgdiv" @click="navigate">
        <ripple type="circle">
         <img src="/static/icons/pic.png" class="img">
        </ripple>
      </div>
      <div class="btndiv" @click="navigate">
        <ripple type="circle" >
          <button>点击上传今日记忆～</button>
        </ripple>
      </div>
      <button form-type="submit">
        <div class="bottomdiv"></div>
      </button>

    </form>
  </div>
</div>
</template>

<script>
  import ripple from 'mpvue-ripple'
  import config from '../../config.js'
  import store from '../../store.js'

  export default {
    components: {
      ripple
    },
    data() {
      return {
        curr_time:'',//用户现在的时间
        createDate:'',//用户上一次上传图片的时间
        photo:'../../../static/picture/shiLiTu.jpg',
        descript:'',
        location:'',
        url:'',
        openId:'',//用户的唯一id，需要把session传给后台，由后台返回ID，再通过ID获取用户上传到后台的信息
        istoday:0,
      }
    },
    onLoad:function(){
      // 页面初始化
      this.openId=store.state.openId
      this.url=config.api_url+"timeline/"+this.openId
      console.log('openId='+this.openId)
      console.log('api_url='+this.url)
      //发起请求用于判断是否是今日
      wx.request({
        url:this.url,
        data:{},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          console.log('success get createDate')
          //增加时间判断
          //获取用户时间 curr_time 20180601
          let myDate=new Date()
          let curr_date=myDate.getDate()
          let curr_month=myDate.getMonth()+1
          let curr_year=myDate.getFullYear()
          String(curr_month).length<2?(curr_month= "0" + curr_month):curr_month
          String(curr_date).length<2?(curr_date= "0" + curr_date):curr_date
          this.curr_time=curr_year + curr_month+ curr_date
          console.log(this.curr_time)
          //处理获得的createDate
          let time=res[0].createDate
          this.createDate = time.substr(0,10).replace(/-/g,'')
          console.log(this.createDate)
          if(this.curr_time>this.createDate){
            this.istoday=1
            console.log('istoday='+this.istoday)
            //获取用户今天上传的信息
          }else{
            this.istoday=0
            console.log('istoday='+this.istoday)
          }
        },
        fail: () => {
          console.log('fail to get createDate')
        }
      })
    },
    methods: {
      navigate(){
        wx.navigateTo({
          url:"/pages/update/main",
          success: () => {
            console.log("success")
          }
        })
      },
    }
  }
</script>

<style>
  .userbackground{
    background-color: #FFFFFF;
    height:100%;
    width:750rpx;
    position: fixed;
    overflow-x:hidden;

  }
  .btndiv{
    margin-top: 15px;
    margin-left: 97.5px;
    margin-right: 97.5px;
  }
  .updiv{
    height:157.5px;
  }
  .bottomdiv{
    height: 165px;
  }
  .imgdiv{
    margin-left: 117.5px;
    width:130px;
    height:130px;
  }
  .img{
    width:140px;
    height:140px;
  }
  button, button::after {

    margin-left: 0;
    margin-right: 0;
    padding: 0;
    box-sizing: unset;
    border:none;
    border-radius: 0;
    background-color: transparent;
    text-align: center;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }
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
    font-size: 14px;
    color: #000000;
}
.showAddress{
    text-align: center;
    font-size: 14px;
    color: #000000;
}
</style>
