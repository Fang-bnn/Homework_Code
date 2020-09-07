var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageid: true

  },
  bindGetUserInfo(e){
    const that=this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
               app.globalData.nickname = res.userInfo.nickName;
               app.globalData.avatar = res.userInfo.avatarUrl;
               console.log(res.userInfo.nickName);
               console.log(getApp().globalData.avatar);
            }
          })
        }else{
          console.log("拒绝")
        }
      }
    })
    setTimeout(function () {
      wx.reLaunch({
        url: '../resign/resign',
      })
    }, 1500) 
    this.setData({
      imageid: false
    })
  },
})