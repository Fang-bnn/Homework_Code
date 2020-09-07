// pages/medical-kit/medical-kit.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowMedicine:app.globalData.nowMedicine,
  },

  //添加计划
  onTapAdd: function(){
    wx.navigateTo({
      url: '../change-plan/change-plan',
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
    if((tmX>100)&&(tmY<200)&&(tmY>-200)){
      wx.redirectTo({
        url: '../homepage/homepage',
      })
    }
  },

  //长按删除
  catchTap_0: function(){
    wx.showModal({
      title: '删除用药计划',
      content: '确定要删除'+app.globalData.nowMedicine[0].medicineName+'的用药计划？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
         if (res.cancel) {
            //点击取消,默认隐藏弹框
         } else {
            //点击确定
            app.globalData.nowMedicine.splice(0,1)
            app.globalData.nowMedicineNum--
            wx.showToast({
              title: '修改成功',
              durationa:2000,
              icon:'success'
            })
            wx.redirectTo({
              url: '../medical-kit/medical-kit',
            })
         }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
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
    this.setData({
      nowMedicine:app.globalData.nowMedicine
    })
    var date = new Date();
    const nowMedicine = this.data.nowMedicine;
    var dhm = [24]
    var dminm = [60]
    var dday = [999999]

    for(let k=0 ; k<app.globalData.nowMedicineNum;k++){
      var day = [];
      var hour = [];
      var min = [];
      for(let i=0 ; i<=2 ; i++){
        if(((nowMedicine[k].time)[i]).length < 1){
          break;
        }
        var Time1 = new Date(nowMedicine[k].startTime + ' ' + (nowMedicine[k].time)[i])
        var diff = Time1 - date;
        if(diff < 0){
          diff += 1000*60*60*24;
        }
        day.push(diff/(1000*24*60*60));
        day[i] = parseInt(day[i]);
        console.log(day[i])
        diff = diff%(1000*24*60*60);
        hour.push(diff/(1000*60*60));
        hour[i] = parseInt(hour[i]);
        diff = diff% (1000*60*60);
        min.push(diff/(1000*60));
        min[i] = parseInt(min[i]) + 1;
      }
      for(let i=0; i <=2 ; i++){
        if(day.length < i+1)
          break;
        if(day[i]<dday[k]){
          dday[k] = day[i];
          dhm[k] = hour[i];
          dminm[k] = min[i];
        }
        else if((hour[i]<dhm[k])&&(day[i] == dday[k])){
          dhm[k] = hour[i];
          dminm[k] = min[i];
        }
        else if((hour[i] == dhm[k])&&(day[i] == dday[k])&&(hour[i] == dhm[k])){
          if(min[i] < dminm[k]){
            dminm[k] = min[i];
          }
        }
      }
      dhm.push(24);
      dminm.push(60);
      dday.push(999999);
      this.setData({
        [`nowMedicine[${k}].dday`]:dday[k],
        [`nowMedicine[${k}].dhm`]:dhm[k],
        [`nowMedicine[${k}].dminm`]:dminm[k],
      })
    }
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