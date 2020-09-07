// pages/register-genderAge/register-genderAge.js

// 都是选择年月要用到的变量
const date = new Date()
const years = []
const months = []
var app=getApp();
for (let i = 1945; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}


Page({

  data: {
    // 性别单选要用到的数据
    items: [
      { name: 'MALE', value: '男',checked:true},
      { name: 'FEMALE', value: '女'},
    ],
    seleted : "",

    // 出生年月滚轮要用到的数据
    years: years,
    year: years[50],
    months: months,
    month: months[2],
    value: [50, 2],

    //判断是否为孕妇用到的变量
    preChecked:false,
    nopreChecked:true,
    pregnantOne:false,
    ismale:true,
  },

  // 性别单选触发的函数
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if(e.detail.value === 'FEMALE'){
      app.globalData.gender = false
      this.setData({
        ismale:false
      })
    }
    else{
      app.globalData.gender = true
    }
  },

  // 选择出生年月滚轮触发的函数
  bindChange: function (e) {
    var date = new Date();
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
    console.log(val)
    app.globalData.age = date.getFullYear() - this.data.year;
  },

  //判断是否为孕妇的弹窗
  preRadioChange:function(e){
    if(e.detail.value=="是孕妇"){
      this.setData({pregnantOne:true})
    }
    else{
      this.setData({pregnantOne:false})
    }
  },
  //弹窗关闭运行
  bindPreConfirm:function(){
    this.setData({ismale:true})
    
  },

  // 点击下一步按钮触发的跳转函数
  onTapJump:function(event){
    wx:wx.redirectTo({
      url: '../weight-height/weight-height',
    })
    if(app.globalData.gender){
      app.globalData.isPrag = false;
    }else{
      app.globalData.isPrag = this.data.pregnantOne;
    }
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