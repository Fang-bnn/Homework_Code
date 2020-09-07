// pages/userIndex/userIndex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    userAvatar: '',
    touchDotX : 0,
    touchDotY : 0,
  },

  bindTapOption: function(){
    wx.navigateTo({
      url: '../userIndex-option/userIndex-option',
    })
  },

  bindTapHealth: function(){
    wx.navigateTo({
      url: '../userIndex-health/userIndex-health',
    })
  },
  touchStart: function(e) {
    this.setData({
      touchDotX:e.touches[0].pageX,
      touchDotY:e.touches[0].pageY
    })
  },
  touchEnd: function(e) {
    var touchMoveX = e.changedTouches[0].pageX;
    var touchMoveY = e.changedTouches[0].pageY;
    var tmX = touchMoveX - this.data.touchDotX;
    var tmY = touchMoveY - this.data.touchDotY;
    if((tmX<-100)&&(tmY<200)&&(tmY>-200)){
      wx.navigateTo({
        url: '../homepage/homepage',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: getApp().globalData.nickname,
      userAvatar: getApp().globalData.avatar

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})