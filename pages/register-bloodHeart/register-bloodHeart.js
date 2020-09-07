// pages/register-bloodHeart/register-bloodHeart.js

// 血糖数据滚轮设置
const AV = require('../../libs/av-weapp-min');
const gluArray=[];
gluArray.push("···");
var app=getApp();
for(let i=2.1; i<=9.5; i+=0.1){
  var k = parseFloat(i).toFixed(1)*1;
  gluArray.push(k)
}

// 血压多滚轮数据设置
const PrMultiArray=[[],[]]
PrMultiArray[0].push("···")
PrMultiArray[1].push("···")
for(let i = 50;  i <= 200; i++){
  PrMultiArray[0].push(i)
}
for(let i = 20; i <=120 ; i++){
  PrMultiArray[1].push(i)
}

// 心率滚轮数据设置
const heartArray=[]
heartArray.push("···")
for(let i=40; i<=170; i++){
  heartArray.push(i)
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
  // 血糖初始数据
  gluArray:gluArray,
  gluIndex:0,

  // 血压初始数据
  value: [0, 0],
  PrMultiIndex:[0,0],
  PrMultiArray:PrMultiArray,

  // 心率初始数据
  heartArray:heartArray,
  heartIndex:0,

  firstTap:1,
  },

  // 血糖滚轮函数
  bindGluPickerChange:function(e){
    console.log('Glupicker发送选择改变，携带值为',e.detail.value);
    this.setData({
      gluIndex:e.detail.value
    })
    app.globalData.blood_sugar = this.data.gluArray[this.data.gluIndex];
  },

  // 血压滚轮函数
  bindBPPickerChange: function (e) {
    const val = e.detail.value
    console.log("bindBPchange")
    this.setData({
      PrMultiIndex: e.detail.value
    })
    console.log(val)
    app.globalData.blood_pressure_h = this.data.PrMultiArray[0][this.data.PrMultiIndex[0]];
    app.globalData.blood_pressure_l = this.data.PrMultiArray[1][this.data.PrMultiIndex[1]];

  },

  // 心率滚轮函数
  bindHeartPickerChange:function(e){
    console.log('heartpicker发送选择改变，携带值为',e.detail.value);
    this.setData({
      heartIndex:e.detail.value
    })
    app.globalData.heart_rate = this.data.heartArray[this.data.heartIndex]; 
  },
  onTapJump: function(){
    const peoples = AV.Object.extend("User_Info");
    const people = new peoples;
    var nn = getApp().globalData.blood_sugar;
    var blosu = (getApp().globalData.blood_sugar[0] + getApp().globalData.blood_sugar[2]*0.1)*1;
    console.log(typeof blosu);
    console.log(typeof getApp().globalData.nickname);
    console.log(typeof getApp().globalData.avatar);
    console.log(typeof (getApp().globalData.phonenumber * 1));  //phonenumber是string
    console.log(typeof getApp().globalData.age);
    console.log(typeof getApp().globalData.blood_pressure_l);
    console.log(typeof getApp().globalData.blood_pressure_h);
    console.log(typeof getApp().globalData.blood_sugar);
    console.log(typeof getApp().globalData.cur_medicine);
    console.log(typeof getApp().globalData.gender);
    console.log(typeof getApp().globalData.heart_rate);
    console.log(typeof getApp().globalData.height);
    console.log(typeof getApp().globalData.weight);
    console.log(typeof getApp().globalData.his_medicine);
    console.log(typeof getApp().globalData.isPrag);
    // -------------------------
    people.set('Nickname', getApp().globalData.nickname);
    people.set('Avatar', getApp().globalData.avatar);
    people.set('phonenumber', getApp().globalData.phonenumber*1);
    people.set('Age', getApp().globalData.age);
    people.set('Blood_Pressure_L', getApp().globalData.blood_pressure_l);
    people.set('Blood_Pressure_H', getApp().globalData.blood_pressure_h);
    people.set('Blood_Suger', getApp().globalData.blood_sugar);
    people.set('Cur_Medicine', getApp().globalData.cur_medicine);
    people.set('Gender', getApp().globalData.gender);
    people.set('Heart_Rate', getApp().globalData.heart_rate);
    people.set('Height', getApp().globalData.height);
    people.set('Weight', getApp().globalData.weight);
    people.set('His_Medicine', getApp().globalData.his_medicine);
    people.set('isPrag', getApp().globalData.isPrag);
    people.save().then((people) => {
      // 成功保存之后，执行其他逻辑
      console.log("保存成功");
    }, (error) => {
      // 异常处理
      console.log("wdnmd")
    });
    console.log(nn);
    wx.redirectTo({
      url: '../homepage/homepage',
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
    // 显示过场弹窗
        wx.showModal({
          title: "提示",
          confirmText:"否",
          content: '是否连接智能手环以获取您的血糖/血压/心率信息？',
          success: function (res) {
            if (res.confirm) {  
              console.log('点击确认回调')
            } else {   
              console.log('点击取消回调')
            }
          }
        })
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