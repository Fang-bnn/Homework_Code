// pages/userIndex-option/userIndex-option.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"用户名",
    phoneNumber:"11111111111",

    isshowName:true,
    userAvatar:"https://s1.ax1x.com/2020/08/19/d17Wbn.png",
  },

  // 按下姓名条状时调用
  bindTapUsername:function(){
    this.setData({
      isshowName:false
    })
    console.log(this.data.isshowName)
  },

  // 修改姓名结束后调用
  changeName: function(){
    this.setData({
      isshowName:true
    })
    console.log(this.data.isshowName)
  },

  // 修改姓名跳出弹窗时调用函数
  nameBlur:function(e){
    var content = e.detail.value;
    if(content.length > 0){
      this.setData({username:content})
    }
    else{
      this.setData({username:'无'})
    }
    console.log(this.data.username+'222')
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: getApp().globalData.nickname,
      phoneNumber: getApp().globalData.phonenumber,
      isshowName:true,
      userAvatar:getApp().globalData.avatar,
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