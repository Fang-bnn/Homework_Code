// pages/homepage/homepage.js
var keyHeight = 0;
const txt="我有点头痛，我能吃阿司匹林吗？";
let plugin = requirePlugin("chatbot");
var plugin_si= requirePlugin("WechatSi");
let manager = plugin_si.getRecordRecognitionManager();
const app = getApp();
let Med_Dis = [];
const AV = require('../../libs/av-weapp-min.js');
const query = new AV.Query("Medicine");
var score_all = [0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0, 0];
var Med_Number = 20;
var res = {
  name: '',
  ename: '',
  content: '',
  apply: '',
  method: '',
  adverse: '',
  ban: '',
  keep: '',
  others: '',
}
Page({
  data: {
    CAnimate: '',
    WAnimate: '',
    VAnimate: '',
    CAnimate_1: '',
    WAnimate_1: '',
    VAnimate_1: '',
    Function2: false, 
    inputvalue: null,
    userwords:'',
    UAnimate: '',
    answer: '',
    answer_1: '',
    answer_2:'',
    AnAnimate: '',
    judge: 1,
    judge_1:0,
    divided: "分词",
    value: "我还没说话呢",
    touchDotX : 0,
    touchDotY : 0,
  },
  
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      inputBottom: keyHeight + 'px'
    })
  },//键盘聚焦

  blur: function(e) {
    this.setData({
      inputBottom: '40rpx'
    })
  },//键盘失去聚焦

  sendMes:function(e){
    var that = this;
    this.trigger2();
    this.trigger4();
    this.setData({
      userwords: '"' + e.detail.value + '"', 
      inputvalue: null,
    })
    this.trigger3();
    plugin.api.nlp("tokenize", {q : that.data.userwords}).then((res)=>{
      var Fulword=[];       //改成数组
      that.Delete_ele(res.words, res.POSs, res.entity_types, res.entities);
      Fulword = res.words;
      
      for(var i = 0; i < Med_Dis.length; i++){
        Fulword[Fulword.length] = Med_Dis[i];
      }
      console.log(Fulword);
      for(var j = 0; j < Fulword.length; j ++){
        that.Search_Med(Fulword[j]);
      }
      var index = 0;
      for (var k = 0; k < 17; k ++){
        index = score_all[k]>score_all[index]?k:index;
      }
      if (score_all[index] == 0){
        that.converSation(e.detail.value);
        
      }else{
        console.log(score_all);
        that.ansMes("您可以试一试", app.globalData.medicineList[index].name, app.globalData.medicineList[index].Contents);
      }
      Med_Number = app.globalData.medicineList[index].number;
      console.log(Med_Number);
      score_all = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  })
    // setTimeout(() => {
    //   this.ansMes();
    // }, 1000);
  },//发送信息

  ansMes:function(answers, answer_1, answer_2){
    this.setData({
      answer:answers,
      answer_1: answer_1,
      answer_2: answer_2,
    })
    this.trigger5();
  },//系统回答



  scanCode:function() {
    var that = this;
    var scan_result;
     wx.scanCode({
      success (res) {
        console.log(res)
        scan_result = that.searchBarcode(res.result);
        console.log(scan_result);     
        setTimeout(() => {
          that.ansMes(scan_result);
          for(var n = 0; n <17; n ++){
            if(app.globalData.medicineList[n].number == Med_Number){
              that.ansMes("您可以试一试", scan_result, app.globalData.medicineList[n].Contents);
              break;
            }
          }
          
          
        }, 1000);
        
      },
    });
    
    
  },//扫码

  stdvoice:function(){
    this.setData({
      judge_1: 1,
      judge:3,
      userwords: ""
    })
    manager.start({
      lang:'zh_CN',
    })
    wx.showToast({
      title: "正在录音",
      duration: 60000,
    })
  },//开始接受语音

  endvoice:function(){
    var that = this;
    var kk;
    this.setData({
      judge_1: 0,
      judge:1
    })
    this.trigger2();
    this.trigger4();
    manager.stop();
    wx.hideToast();
    that.initRecord();
    setTimeout(function () {
      console.log("延迟调用");
      plugin.api.nlp("tokenize", {q : that.data.userwords}).then((res)=>{
        var Fulword=[];       //改成数组
        that.Delete_ele(res.words, res.POSs, res.entity_types, res.entities);
        Fulword = res.words;
        
        for(var i = 0; i < Med_Dis.length; i++){
          Fulword[Fulword.length] = Med_Dis[i];
        }
        console.log(Fulword);
        that.setZero(score_all);
        for(var j = 0; j < Fulword.length; j ++){
          that.Search_Med(Fulword[j]);
        }
        var index = 0;
        for (var k = 0; k <17; k ++){
          index = score_all[k]>score_all[index]?k:index;
        }
        if (score_all[index] == 0){
          that.converSation(that.data.userwords);
        }else{
          console.log(score_all);
          that.ansMes("您可以试一试", app.globalData.medicineList[index].name, app.globalData.medicineList[index].Contents);
        }
        Med_Number = app.globalData.medicineList[index].number;
        console.log(Med_Number);
        score_all = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }) 
    }, 1500);
  },//语音接受结束



    trigger() {
      let option = {
        duration: 200, // 动画执行时间
        timingFunction: 'ease-in-out' // 动画执行效果
      };
      var Canimation = wx.createAnimation(option); // 创建动画
      var Vanimation = wx.createAnimation(option);
      var Wanimation = wx.createAnimation(option);
      var Canimation_1 = wx.createAnimation(option); // 创建动画
      var Vanimation_1 = wx.createAnimation(option);
      var Wanimation_1 = wx.createAnimation(option);
      // 相机_1
      Canimation_1.translateX(0).step();
      // 语音_1
      Vanimation_1.translateX(0).step();
      // 文字_1
      Wanimation_1.translateY(0).step();
      // 相机
      Canimation.translateX(-80).step();
      // 语音
      Vanimation.translateY(80).step();
      // 文字
      Wanimation.translateX(80).step();
      this.setData({
        CAnimate: Canimation.export(),// 开始执行动画
        VAnimate: Vanimation.export(),// 开始执行动画
        WAnimate: Wanimation.export(), // 开始执行动画
      })
      setTimeout(() => {
        this.setData({
          Function2: true,
          CAnimate_1: Canimation_1.export(),// 开始执行动画
          VAnimate_1: Vanimation_1.export(),// 开始执行动画
          WAnimate_1: Wanimation_1.export(), // 开始执行动画
          judge:2
        })
      }, 400);

    },  //功能栏动画  ->_1



    trigger1() {
      let option = {
        duration: 200, // 动画执行时间
        timingFunction: 'ease-in-out' // 动画执行效果
      };
      var Canimation_1 = wx.createAnimation(option); // 创建动画
      var Vanimation_1 = wx.createAnimation(option);
      var Wanimation_1 = wx.createAnimation(option);
      var Canimation = wx.createAnimation(option); // 创建动画
      var Vanimation = wx.createAnimation(option);
      var Wanimation = wx.createAnimation(option);
      // 相机_1
      Canimation_1.translateX(-80).step();
      // 语音_1
      Vanimation_1.translateX(80).step();
      // 文字_1
      Wanimation_1.translateY(80).step();
      // 相机
      Canimation.translateX(0).step();
      // 语音
      Vanimation.translateY(0).step()
      // 文字
      Wanimation.translateX(0).step();
      this.setData({
        CAnimate_1: Canimation_1.export(),// 开始执行动画
        VAnimate_1: Vanimation_1.export(),// 开始执行动画
        WAnimate_1: Wanimation_1.export(), // 开始执行动画
      })
      setTimeout(() => {
        this.setData({
          Function2: false,
          CAnimate: Canimation.export(),// 开始执行动画
          VAnimate: Vanimation.export(),// 开始执行动画
          WAnimate: Wanimation.export(), // 开始执行动画
          judge:1
        })
      }, 400);

    },  //功能栏动画 _1->



    trigger2() {
      let option = {
        duration: 0.1, // 动画执行时间
        timingFunction: 'step-start' // 动画执行效果
      };
      var Uanimation= wx.createAnimation(option); // 创建动画
      Uanimation.opacity(0).translateY(60).step();
      this.setData({
        UAnimate: Uanimation.export()// 开始执行动画
      })
    },//用户对话消失

    trigger3() {
      let option = {
        duration: 200, // 动画执行时间
        timingFunction: 'ease-in-out' // 动画执行效果
      };
      var Uanimation = wx.createAnimation(option); // 创建动画
      Uanimation.opacity(1).translateY(-60).step();
      this.setData({
        UAnimate: Uanimation.export()// 开始执行动画
      })//用户对话出现

    },

    trigger4() {
      let option = {
        duration: 0.1, // 动画执行时间
        timingFunction: 'step-start' // 动画执行效果
      };
      var Ananimation= wx.createAnimation(option); // 创建动画
      Ananimation.opacity(0).translateY(60).step();
      this.setData({
        AnAnimate: Ananimation.export()// 开始执行动画
      })
    },//系统对话消失

    trigger5() {
      let option = {
        duration: 200, // 动画执行时间
        timingFunction: 'ease-in-out' // 动画执行效果
      };
      var Ananimation = wx.createAnimation(option); // 创建动画
      Ananimation.opacity(1).translateY(-60).step();
      this.setData({
        AnAnimate: Ananimation.export()// 开始执行动画
      })//系统对话出现

    },

    initRecord: function(){
      manager.onRecognize = (res) =>{
        let text = res.result;
        this.setData({
          userwords: text,
        })
      }
      manager.onStop = (res) =>{
        let text = res.result;
        if(text == ""){
          wx.showToast({
            title: '张大嘴巴啊啊啊',
          })
          return;
        }
  
        this.setData({
          userwords: text,
        })
        this.trigger3();
      }
    },
    onLoad:function(){
      wx.login({
        success: function(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://exp.zjubiomedit.com/expdev/v1.0/util/wx/openid/five',
              data: {
                appid:"wx324cae274b2ff794",
                secret:"9cf8e34a6aaa3d1880e5176bd5767ad3",
                code: res.code
              },
              success: function(res){
                wx.setStorageSync('openId', res.data.result);
                
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
   
      plugin.init({
        appid:"P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
        openid:wx.getStorageSync('openId'),
        success:()=>{console.log("Init success!")},
        fail:(error) => {console.log("Init fail")}
      })
    },
    Delete_ele: function (words, POSs, entitytypes,entity){
      var j = 0;
      for(let i = 0; i < words.length; i++){
      if((POSs[i] == 5)||(POSs[i] == 7)||(POSs[i] == 8)||(POSs[i] == 24)||(POSs[i] == 25)||(POSs[i] == 26)||(POSs[i] == 27)||(POSs[i] == 28)||(POSs[i] == 30)||(POSs[i] == 34)||(POSs[i] == 36)||(POSs[i] == 47)||(POSs[i] == 15)){
          words.splice(i,1);
          POSs.splice(i,1);
          i--;
        }
      }
      for(let k = 0; k < words.length; k++){
        if((entitytypes[k] == 100000020) || (entitytypes[k] ==100000021)){
          Med_Dis[j] = entity[k];
          j++;
        }
      }
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
        url: '../userIndex/userIndex',
      })
    }
    else if((tmX<-100)&&(tmY<200)&&(tmY>-200)){
      wx.redirectTo({
        url:'../medical-kit/medical-kit',
      })
    }
  },
  Search_Med: function(Fulword){
    var k = 0;
    for (k = 0; k <17; k ++){
      if(app.globalData.medicineList[k].name.indexOf(Fulword)>=0){
        score_all[k] += 5;
      }
      if(app.globalData.medicineList[k].Ordi_name.indexOf(Fulword)>=0){
        score_all[k] += 5;
      }
      if(app.globalData.medicineList[k].App_Disease.indexOf(Fulword)>=0){
        score_all[k] += 12;
      }
      if(app.globalData.medicineList[k].Contents.indexOf(Fulword)>=0){
        score_all[k] += 2;
      }
    }
  },
  setZero: function(score_all){
    for(var s = 0; s < score_all.length; s ++){
      score_all[s] = 0;
    }
  },
  searchBarcode: function(barcode){
    for (var i = 0; i < 17; i ++){
      if(app.globalData.medicineList[i].Barcode == barcode){
        Med_Number = app.globalData.medicineList[i].number;
          console.log(Med_Number);
        return app.globalData.medicineList[i].name;
      }
      if(i == 15) return "别逗小药丸啦，您扫描的好像不是药品哦~";
    }
  },
  Med_onTap: function(){
    
    console.log("We tapped");
    const query  = new AV.Query('Medicine');
    query.equalTo('No', Med_Number);
    query.find().then((Medicines) =>{
      res.name = Medicines[0].attributes.name;
      res.ename = Medicines[0].attributes.Ordi_name;
      res.content = Medicines[0].attributes.Contents;
      res.apply = Medicines[0].attributes.App_Disease;
      res.method = "成人： " + Medicines[0].attributes.Adult_Usage_Dos + " " + Medicines[0].attributes.Dos_Unit + 
                   "/次；" + "一日 " + Medicines[0].attributes.Adult_Usage_Time + "次";
      res.adverse = Medicines[0].attributes.Ad_React;
      res.ban = Medicines[0].attributes.Taboo;
      res.keep = Medicines[0].attributes.Storage;
      res.others = Medicines[0].attributes.Others;
    })
    wx.showToast({
      title: '跳转中',
      icon: 'loading',
      success: function(){
        setTimeout(function(){
          console.log(res.name);
          wx.navigateTo({
            url: '../medicine/medicine?name=' + res.name + '&ename=' + res.ename + '&content=' + res.content
                 + '&apply=' + res.apply + '&adverse=' + res.adverse + '&ban=' + res.ban + '&keep=' + res.keep    
                 + '&others=' + res.others + '&method=' + res.method
          })
        }, 3000);
      }
    })
  },
  converSation: function(text) {
    let that = this,
    key='7df980bb823b4ce79d5c93ba7f8a9f3f';
    wx.request({
      url: 'http://www.tuling123.com/openapi/api?key='+key+'&info='+text,
      success:function(res){
        let tuling = res.data.text;
        console.log(tuling);
        setTimeout(() => {
          that.ansMes("", "", tuling);
          that.trigger5();
        }, 1000);
    }})
  }
})


