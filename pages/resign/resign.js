const AV = require('../../libs/av-weapp-min');
var app=getApp();
Page({
  data:{
    disabled: true,
    btnstate: "default",
    mobile:"",
    phonenumber:"",
    Length:6,        //输入框个数
    Value:"",        //输入的内容
    ispassword:false, //是否密文显示 true为密文， false为明文。
    phonenumber:"",
    isshow: true,
  },
  mobileblur:function(e){
    var content = e.detail.value;
    if(content.length == 11){
      this.setData({disabled: false, btnstate: "primary", mobile: content});
    }else{
      this.setData({disabled: true,btnstate: "defalt", mobile: ""});
    }
  },
  PN_Finish: function() {
    var number= this.data.mobile;
    app.globalData.phonenumber = number;
    console.log("suck");
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: this.data.mobile,
      name: '登录验证码获取',
      op: '',
      ttl: 10 // 验证码有效时间为 10 分钟
   }).then(function(){
      // 调用成功
      console.log("suck it");
      wx.showToast({
        title: "发送成功"
      })
   }, function(err){
      // 调用失败
      wx.showToast({
        title: '发送失败',
      })
  })
  this.setData({
    isshow: false
  })
  },
  Focus(e){
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    this.setData({
      Value:inputValue,
    })
  },
  Tap(){
    this.setData({
      isFocus:true,
    })
  },
  // ontap(){
  //   this.setData({
  //     isshow: false
  //   })
  // },
  verifyCode: function() {
    AV.Cloud.verifySmsCode(this.data.Value, this.data.mobile).then(function () {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        success: function () {
          setTimeout(function() {
            wx.navigateTo({
              url: '../register-genderAge/register-genderAge',
            })
          }, 2000);
        }
      })
    }, function (err) {
      wx.showToast({
        title: '验证码错误',
      })
    })
  },
  
})
