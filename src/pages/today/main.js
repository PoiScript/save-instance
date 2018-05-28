import Vue from 'vue';
import App from './index';


const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '今日',
  },
  data () {
    return {
      userInfo:[],
      myDate:new Date(),
      curr_date:'',
      curr_month:'',
      curr_year:'',
      time:'',    //今天的日 如2018.05.26则返回20180526
      istoday:"1"   //istoday 如果为1，则今日未拍照，否则就是今日已经拍照了
    }
  },
  onLanch:function(e){
    //1、把用户个人信息上传给后台
    //2、然后后台返回用户今天上传的内容，判断有无 wx.request 提交了userInfo time,后台返回istoday
    //3、根据判断给用户返回不同的页面
    _this=this
    //获取当前日，通过判断日是否大于可以判断是否是今日
    _this.curr_date=_this.myDate.getDate()
    _this.curr_month=_this.myDate.getMonth() + 1
    _this.curr_year=_this.myDate.getFullYear()
    string(_this.curr_month).length<2?(_this.curr_month= "0" + _this.curr_month):_this.curr_month
    string(_this.curr_date).length<2?(_this.curr_date= "0" + _this.curr_date):_this.curr_date
    _this.time=_this.curr_year + _this.curr_month+ _this.curr_date
    console.log(_this.time)
    if(istoday){
      wx.getUserInfo({
        success:function(res){
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:function(res){
                _this.userInfo=res.userInfo
                console.log(_this.userInfo)
              }
            })
          }
        }
      })
      wx.request({
        url:"pages/today/judge",
        data:{
          userInfo:_this.userInfo,
          time:_this.time
        },
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          _this.istoday=istoday
        }
      })
      if(istoday){
        wx.redirectTo({
          url:"pages/today/main"
        })
      }else{
        wx.redirectTo({
          url:"pages/show/main"
        })
      }
    }
  }
}
