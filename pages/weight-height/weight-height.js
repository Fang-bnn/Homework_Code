// pages/weight-height/weight-height.js
const wTens = []
const wOnes = []
var app=getApp();

for (let i = 2; i <= 9; i++) {
  wTens.push(i)
}

for (let i = 0; i <= 9; i++) {
  wOnes.push(i)
}

const hTens = []
const hOnes = []
const hHunds = [0,1,2]

for (let i = 0; i <= 9; i++) {
  hTens.push(i)
}

for (let i = 0; i <= 9; i++) {
  hOnes.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wTens: wTens,
    wTen: wTens[3],
    wOnes: wOnes,
    wOne: 0,
    valueWeight: [3, 0],

    hHunds: hHunds,
    hHund: hHunds[1],
    hTens: hTens,
    hTen: hTens[6],
    hOnes: hOnes,
    hOne: hOnes[5],
    valueHeight: [1, 6, 5],
  },

  bindChangeWeight: function (e) {
    const val = e.detail.value
    this.setData({
      wTen: this.data.wTens[val[0]],
      wOne: this.data.wOnes[val[1]],
    })
    
  },

  bindChangeHeight: function (e) {
    const val = e.detail.value
    this.setData({
      hHund: this.data.hHunds[val[0]],
      hTen: this.data.hTens[val[1]],
      hOne: this.data.hOnes[val[2]],
    })
    
  },

  // 点击下一步按钮触发的跳转函数
  onTapJump:function(event){
    app.globalData.weight = this.data.wTen*10 + this.data.wOne*1;
    app.globalData.height = this.data.hHund*100 + this.data.hTen*10 + this.data.hOne*1;
    wx:wx.redirectTo({
      url: '../register-bloodHeart/register-bloodHeart',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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