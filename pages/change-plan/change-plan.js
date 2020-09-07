var app = getApp()

var date = new Date()
const years = date.getFullYear()
const month = date.getMonth() +1
const datees = date.getDate()
var monthsA = []
var datesA = []
var months
var dates

if(month < 10){
  monthsA.push(0);
  monthsA.push(month);
}
else{
  monthsA.push(month)
}
months = monthsA.join('');

if(datees < 10){
  datesA.push(0);
  datesA.push(datees);
}
else{
  datesA.push(datees);
}
dates = datesA.join('');




Page({

  /**
   * 页面的初始数据
   */
  data: {
    year : years,
    month: months,
    dates: dates,
    inputValue:'',
    startDate:"",
    endDate:"",
    time1:"08:00",
    time2:"17:00",
    time3:"20:00",

    isshow3:false,
  },
  //输入框
  bindinput:function(e){
    var val=e.detail.value
    this.setData({inputValue:val})
  },

  //开始日期滚轮
  bindDate1PickerChange:function(e){
    var val = e.detail.value
    this.setData({
      startDate:val,
    })
  },

  //结束日期滚轮
  bindDate2PickerChange:function(e){
    var val = e.detail.value
    this.setData({
      endDate:val
    })
  },


  //每日服用时间1，若分钟小于10则前面加0
  bindTime1PickerChange:function(e){
    const val=e.detail.value
    this.setData({time1:val})
  },

  //每日服用时间2
  bindTime2PickerChange:function(e){
    const val=e.detail.value
    this.setData({time2:val})
  },

  //每日服用时间3
  bindTime3PickerChange:function(e){
    const val=e.detail.value
    this.setData({time3:val})
  },

  //添加时间
  addtime:function(){
    this.setData({isshow3:true})
    console.log('hide')
  },

  //跳转
  onTapJump:function(){
    var startYear = (this.data.startDate)[0]*1000 + (this.data.startDate)[1]*100 + (this.data.startDate)[2]*10 + (this.data.startDate)[3]*1//开始日期年份
    var startMonth = (this.data.startDate)[5]*10 + (this.data.startDate)[6]*1//开始日期月份
    var startDate = (this.data.startDate)[8]*10 + (this.data.startDate)[9]*1//开始日期

    var endYear = (this.data.endDate)[0]*1000 + (this.data.endDate)[1]*100 + (this.data.endDate)[2]*10 + (this.data.endDate)[3]*1//结束日期年份
    var endMonth = (this.data.endDate)[5]*10 + (this.data.endDate)[6]*1//结束日期月份
    var endDate = (this.data.endDate)[8]*10 + (this.data.endDate)[9]*1//结束日期

    if((startYear > endYear)||((startMonth > endMonth)&&(startYear == endYear))||((startDate > endDate)&&(startYear == endYear)&&(startMonth == endMonth))){
      wx.showToast({
        title:'结束日期过早',
        icon:'none',
        duration:2000
      })
      console.log('1')
    }

    else if((this.data.inputValue == "")||(this.data.inputValue == undefined)){
      wx.showToast({
        title:'请输入药物名称',
        icon:'none',
        duration:2000
      })
    }
    else if((startYear < years)||((startYear == years)&&( startMonth < month))||((startYear == years)&&(startDate < datees)&&(startMonth == month))){
      wx.showToast({
        title:'开始日期过早',
        icon:'none',
        duration:2000
      })
    }

    else{
      app.globalData.nowMedicineNum++
      var thisMedicine={
        medicineName:this.data.inputValue,
        startTime:this.data.startDate,
        endTime:this.data.endDate,
        time:[this.data.time1,this.data.time2,[]],
        dhm:24,//下次服药小时数
        dminm:60, //下次服药分钟数
        dday:999999999,//下次服药天数
      }
      if(this.data.isshow3 == true){
        thisMedicine.time[2]=[this.data.time3]
      }
      app.globalData.nowMedicine.push(thisMedicine)
      console.log(app.globalData.nowMedicine)

      wx.redirectTo({
        url: '../medical-kit/medical-kit',
      })
    }
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputValue:options.message,
      startDate: years + '-' +months + '-' + dates,
      endDate: years + '-' +months + '-' + dates,
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