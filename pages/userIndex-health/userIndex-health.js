// pages/userIndex-health/userIndex-health.js
var app = getApp();

// 血压多滚轮数据数组
const BirMultiArray=[[],[]]
for(let i = 1945;  i <= 2020; i++){
  BirMultiArray[0].push(i)
}
for(let i = 1; i <=12 ; i++){
  BirMultiArray[1].push(i)
}

//身高三滚轮数据数组
const heightTriArray=[[],[],[]]
for(let i=0; i<=2; i++){
  heightTriArray[0].push(i)
}
for(let i=0; i<=9; i++){
  heightTriArray[1].push(i)
}
for(let i=0; i<=9; i++){
  heightTriArray[2].push(i)
}

//体重双滚轮数组
const weightMulArray=[[],[]]
for(let i=1; i<=9; i++){
  weightMulArray[0].push(i)
}
for(let i=0; i<=9; i++){
  weightMulArray[1].push(i)
}

//血压双滚轮数组
const preMulArray=[[],[]]
for(let i = 50;  i <= 200; i++){
  preMulArray[0].push(i)
}
for(let i = 20; i <=120 ; i++){
  preMulArray[1].push(i)
}

//血糖单滚轮数组
const gluArray=[]
for(let i=2.1; i<=9.5; i+=0.1){
  var k = parseFloat(i).toFixed(1)
  gluArray.push(k)
}

//心率单滚轮数组
const heartArray=[]
for(let i=40; i<=170; i++){
  heartArray.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:"",
    pregnant:"",
    year:2000,
    month:7,
    
    illness:['无'],

    BirMultiArray:BirMultiArray,
    years:BirMultiArray[0],
    months:BirMultiArray[1],
    birthMonth:[55,6],
    maleChecked: false,
    femaleChecked:false,
    pregnantChecked:false,
    isshowGender: true,

    heightTriArray:heightTriArray,
    heightValue:[1,8,5],
    hund:1,
    ten:8,
    one:5,

    weightMulArray:weightMulArray,
    weightValue:[5,0],
    weightTen:6,
    weightOne:0,

    preMulArray:preMulArray,
    preValue:[70,60],
    high:120,
    low:80,

    gluArray:gluArray,
    glu:4.5,
    gluValue:24,

    heartArray:heartArray,
    heart:90,
    heartValue:50,


  },

    // 按下性别条状时调用
    bindTapGender:function(){
      this.setData({
        isshowGender:false
      })
      if(this.data.gender == true){
        this.setData({maleChecked:true})
      }
      else if(this.data.gender == false){
        this.setData({femaleChecked:true})
      }
      console.log(this.data.isshowName)
    },
    // 选择性别时调用
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      this.setData({gender:e.detail.value})
    },
    // 修改性别结束后调用
    changeGender: function(){
    this.setData({
      isshowGender:true
    })
    wx.showToast({
      title:'修改成功',
      icon:'success',
      duration:2000
    })
    console.log(this.data.isshowGender)
    if(this.data.gender == '男'){
      app.globalData.gender = true;    
      isPrag:false; 
    }else if(this.data.gender == '女'){
      app.globalData.gender = false;
      isPrag:false;
    }
    else{
      app.globalData.gender = false;
      isPrag:true;
    }
    
  },

  //修改出生年月后使用
  bindBirPickerChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    });
    console.log(val);
    app.globalData.age = date.getFullYear() - this.data.year;
  },

   //修改身高后使用
   bindHeightPickerChange: function (e) {
    const val = e.detail.value
    this.setData({
      hund: this.data.heightTriArray[0][val[0]],
      ten: this.data.heightTriArray[1][val[1]],
      one: this.data.heightTriArray[2][val[2]],
    })
    console.log(val);
    app.globalData.height = this.data.hund * 100 + 
                              this.data.ten * 10 +
                              this.data.one;
  },

  //修改体重后使用
  bindWeightPickerChange: function (e) {
    const val = e.detail.value
    this.setData({
      weightTen: this.data.weightMulArray[0][val[0]],
      weightOne: this.data.weightMulArray[1][val[1]],
    })
    console.log(this.data.weightTen+this.data.weightOne)
    app.globalData.weight = weightTen * 10 + weightOne;
  },

   //修改血压后使用
  bindPrePickerChange: function (e) {
     const val = e.detail.value
     this.setData({
       high: this.data.preMulArray[0][val[0]],
       low: this.data.preMulArray[1][val[1]],
     })
     console.log(this.data.high+this.data.low)
     app.globalData.blood_pressure_l = this.data.low;
     app.globalData.blood_pressure_h = this.data.high;
   },

   //修改血糖后使用
  bindGluPickerChange: function (e) {
    const val = e.detail.value
    this.setData({
      glu:this.data.gluArray[val],
    })
    console.log(this.data.glu)
    app.setData.blood_suger = this.data.glu * 1;
  },

  //修改心率后使用
  bindHeartPickerChange: function (e) {
    const val = e.detail.value
    this.setData({
      heart:this.data.heartArray[val],
    })
    console.log(this.data.heart)
    app.setData.heart_rate = this.data.heart;
  },

  //前往我的药箱
  onTapJump: function(){
    wx.redirectTo({
      url: '../medical-kit/medical-kit',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gender: app.globalData.gender?"男":"女",
      pregnant: app.globalData.isPrag,
      hund: parseInt(app.globalData.height/100),
      ten: parseInt((app.globalData.height - parseInt(app.globalData.height/100)*100)/10),
      one: app.globalData.height % 10, 
      weightTen: parseInt(app.globalData.weight/10),
      weightOne: app.globalData.weight % 10,
      high: app.globalData.blood_pressure_h,
      low: app.globalData.blood_pressure_l,
      glu: app.globalData.blood_suger,
      heart: app.globalData.heart_rate
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