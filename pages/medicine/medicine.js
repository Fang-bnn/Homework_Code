//medicine.js
const AV = require('../../libs/av-weapp-min.js'); 
var apply="1.降低急性心肌梗死疑似患者的发病风险\n2.预防心肌梗死复发中风的二级预防降低短暂性脑缺血发作(TIA)及其继发脑卒中的风险\n3.降低稳定性和不稳定性心绞痛患者的发病风险";
var method="口服，应饭前用适量水送服，必须整片服用。在治疗心肌梗死时，第一片应捣碎或嚼碎后服用。\n服用剂量和次数：\n1.不稳定性心绞痛建议每天1片拜阿司匹灵。\n2.急性心肌梗死时，建议每天1片阿司匹灵。\n3.预防复发心肌梗死时，建议每天3片拜阿司匹灵。\n4.预防大脑一过性的血流减少，和已出现早期症状后预防脑梗死，建议每天1片拜阿司匹灵。";
var adverse="1.胃肠道反应，如腹痛和胃肠道轻微出血，偶尔出现恶心、呕吐和服泻。\n2.胃出血和胃溃疡，以及主要在哮喘患者出现的过敏反应(呼吸困难和皮肤反应)极少见。\n3.小剂量乙酸水杨酸能减少尿酸的排泄，对易感者可引起痛风发作。\n极少数病例在长期服用阿司匹肠溶片后由于胃肠道隐匿性出血导致贫血，出现黑便。\n4.出现眩晕和耳鸣(特别是儿童和老人)可能为严重的中毒症状。 ";
var ban="1.对乙酰水杨酸和含水杨酸的物质过敏；\n2.胃十二指肠溃疡；\n3.出血倾向(出血体质)。";
var keep="密封，25℃以下保存";
var others="1.该药不宜用作止痛剂。\n2.患哮喘、花粉性鼻炎、或慢性呼吸道感染(特别是过敏性症状)患者，和对所有类型的镇痛药、抗炎药和抗风湿药过敏者，在使用阿司匹肠溶片有引起哮喘发作的危险(即镇痛药不耐受/镇痛药诱发的哮喘)。在使用前应咨询医生。对其它物质有过敏反应如皮肤反应、瘙痒、风疹的患者同样也应在用药前咨询医生。\n3.手术前服用请通知医生和牙科医生。\n4.长期大剂量服用阿司匹肠溶片应在医生的指导下进行。\n5.下列情况应慎用拜阿司匹灵： (1)对其它镇痛剂、抗炎药或抗风湿药过敏，或存在其它过敏反。 (2)同时使用抗凝药物(如香豆素衍生物、肝素，低剂量肝素治疗例外)。 (3)支气管哮喘。 (4)慢性或复发性胃十二脂肠病变。 (5)肾损害。 (6)严重的肝功障碍。 6.少服或忘服后，下次服药时不要服用双倍的量，而继续按规定和医生的处方服用。请仔细阅读说明书并遵医嘱使用。";
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
   name:"",
   Ename:"",
   content:"",
   bcolor_1:"white",
   bcolor_2:"white",
   bcolor_3:"white",
   bcolor_4:"white",
   bcolor_5:"white",
   bcolor_6:"white",
   wcolor_1:"black",
   wcolor_2:"black",
   wcolor_3:"black",
   wcolor_4:"black",
   wcolor_5:"black",
   wcolor_6:"black",
   Med_Number: "",
  },
  
  trigger_1(){
   
   this.setData({
    content:apply,
    bcolor_1:"grey",
    bcolor_2:"white",
    bcolor_3:"white",
    bcolor_4:"white",
    bcolor_5:"white",
    bcolor_6:"white",
    wcolor_1:"white",
    wcolor_2:"black",
    wcolor_3:"black",
    wcolor_4:"black",
    wcolor_5:"black",
    wcolor_6:"black"
   })
  },
  trigger_2(){
    
    this.setData({
      content:method,
      bcolor_1:"white",
      bcolor_2:"grey",
      bcolor_3:"white",
      bcolor_4:"white",
      bcolor_5:"white",
      bcolor_6:"white",
      wcolor_1:"black",
      wcolor_2:"white",
      wcolor_3:"black",
      wcolor_4:"black",
      wcolor_5:"black",
      wcolor_6:"black"
    })
  },
  trigger_3(){
    
    this.setData({
      content:adverse,
      bcolor_1:"white",
      bcolor_2:"white",
      bcolor_3:"grey",
      bcolor_4:"white",
      bcolor_5:"white",
      bcolor_6:"white",
      wcolor_1:"black",
      wcolor_2:"black",
      wcolor_3:"white",
      wcolor_4:"black",
      wcolor_5:"black",
      wcolor_6:"black"
    })
  },
  trigger_4(){
   
    this.setData({
      content:ban,
      bcolor_1:"white",
      bcolor_2:"white",
      bcolor_3:"white",
      bcolor_4:"grey",
      bcolor_5:"white",
      bcolor_6:"white",
      wcolor_1:"black",
      wcolor_2:"black",
      wcolor_3:"black",
      wcolor_4:"white",
      wcolor_5:"black",
      wcolor_6:"black"
    })
  },
  trigger_5(){
    
    this.setData({
      content:keep,
      bcolor_1:"white",
      bcolor_2:"white",
      bcolor_3:"white",
      bcolor_4:"white",
      bcolor_5:"grey",
      bcolor_6:"white",
      wcolor_1:"black",
      wcolor_2:"black",
      wcolor_3:"black",
      wcolor_4:"black",
      wcolor_5:"white",
      wcolor_6:"black",
    })
  },
  trigger_6(){
    
    this.setData({
      content:others,
      bcolor_1:"white",
      bcolor_2:"white",
      bcolor_3:"white",
      bcolor_4:"white",
      bcolor_5:"white",
      bcolor_6:"grey",
      wcolor_1:"black",
      wcolor_2:"black",
      wcolor_3:"black",
      wcolor_4:"black",
      wcolor_5:"black",
      wcolor_6:"white"
    })
  },

  //添加服用计划跳转
  onTapJump: function(){
    wx.navigateTo({
      url: '../change-plan/change-plan?message='+this.data.name,
    })
  },
  onLoad: function (options) {
    console.log(options.method);
    this.setData({
      name: options.name,
      Ename: options.ename,
      content: options.content
    })
    apply = options.apply;
    method = options.method;
    adverse = options.adverse;
    ban = options.ban;
    keep = options.keep;
    others = options.others;
    
  },
})
