const AV = require('./libs/av-weapp-min.js');
// const adapters = require('./libs/leancloud-adapters-weapp.js');
AV.init({
  appId: "LexKHT8f3WxY3HbsBineLyaa-gzGzoHsz",
  appKey: "m1nBVx80xOiOASpmRhCKLOQY",
  serverURLs: "https://lexkht8f.lc-cn-n1-shared.com"
})
App({
  globalData:{
    nickname:"",          //Nickname
    avatar:"",            //Avatar
    phonenumber:0,        //Phonenumber
    age:0,                //Age
    blood_pressure_l:0,   //Blood_Pressure_L
    blood_pressure_h:0,   //Blood_Pressure_H
    blood_sugar:0,        //Blood_Suger
    cur_medicine:[],      //Cur_Medicine
    gender:true,          //Gender
    heart_rate:0,         //Heart_Rate
    height:0,             //Height
    weight:0,             //Weight
    his_medicine:[],      //His_Medicine
    isPrag:false,
    nowMedicine:[],
    nowMedicineNum:0,
    medicineList:[
      {
        number: 16,
        Barcode:6901102203013,
        name: "聚维酮碘溶液",
        Ordi_name: "聚维酮碘溶液（民生倍洁宁）",
        Contents: "每毫升含聚维酮碘0.05克。辅料为：吐温20、聚乙二醇200、碘酸钾",
        App_Disease: '用于化脓性皮炎、皮肤真菌感染、小面积轻度烧烫伤，也用于小面积皮肤、黏膜创口的消毒。',
      },
      {
        number:14,
        Barcode:'6924147659034',
        name:'阿司匹林肠溶片',
        Ordi_name:'阿司匹林肠溶片（拜阿司匹林）',
        Contents:'阿司匹林',
        App_Disease:'阿司匹林对血小板聚集的抑制作用，阿司匹林肠溶片适应症：降低急性心肌梗死疑似患者的发病风险预防心肌梗死复发中风的二级预防降低短暂性脑缺血发作(TIA)及其继发脑卒中的风险降低稳定性和不稳定性心绞痛患者的发病风险动脉外科手术或介入手术后，如经皮冠脉腔内成形术(PTCA)，冠状动脉旁路术(CABG)，颈动脉内膜剥离术，动静脉分流术预防大手术后深静脉血栓和肺栓塞降低心血管危险因素者（冠心病家族史、糖尿病、血脂异常、高血压、肥胖、抽烟史、年龄大于50岁者）心肌梗死发作的风险',
      },
      {
        number:15,
        Barcode:'6913991300322',
        name:'布洛芬缓释胶囊',
        Ordi_name:'布洛芬缓释胶囊（芬必得）',
        Contents:'每粒含布洛芬0.3g。辅料为：糖、淀 粉、硬脂酸、聚乙烯吡咯烷酮。',
        App_Disease:'缓解轻至中度疼如：关节痛、肌肉痛、神经痛、头痛、偏头痛、牙痛、痛经，也用于普通感冒或流行性感冒引起的发热。',
      },
      {
        number:13,
        Barcode:'6905079100894',
        name:'复方氨酚烷胺胶囊',
        Ordi_name:'复方氨酚烷胺胶囊（快克）',
        Contents:'本品为复方制剂。每粒含对乙酰氨基酚250mg，盐酸金刚烷胺100mg、马来酸氯苯那敏2mg、人工牛黄10mg、咖啡因15mg。辅料为糊精。',
        App_Disease:'适用于缓解普通感冒及流行性感冒引起的发热，头痛，四肢酸痛，打喷嚏。流鼻涕、鼻塞、咽痛等症状，也可用于流行性感冒的预防和治疗。',
      },
      {
        number:12,
        Barcode:'6905218881578',
        name:'龙虎清凉油',
        Ordi_name:'清凉油（龙虎）',
        Contents:'薄荷脑、薄荷油、樟脑油、樟脑、桉油、丁香油、氨水。辅料为：石蜡，地蜡，黄凡土林',
        App_Disease:'清凉散热，醒脑提神，止痒止痛。用于伤暑引起的头痛，晕车，蚊虫叮咬',
      },
      {
        number:11,
        Barcode:'6943297600123',
        name:'阿莫西林胶囊',
        Ordi_name:'阿莫西林胶囊（阿莫仙）',
        Contents:'阿莫西林。',
        App_Disease:'阿莫西林适用于敏感菌(不产β内酰胺酶菌株)所致的下列感染： 1.溶血链球菌、肺炎链球菌、葡萄球菌或流感嗜血杆菌所致中耳炎、鼻窦炎、咽炎、扁桃体炎等上呼吸道感染。 2.大肠埃希菌、奇异变形杆菌或粪肠球菌所致的泌尿生殖道感染。 3.溶血链球菌、葡萄球菌或大肠埃希菌所致的皮肤软组织感染。 4.溶血链球菌、肺炎链球菌、葡萄球菌或流感嗜血杆菌所致急性支气管炎、肺炎等下呼吸道感染。 5.急性单纯性淋病。 6.本品尚可用于治疗伤寒、伤寒带菌者及钩端螺旋体病；阿莫西林亦可与克拉霉素、兰索拉唑三联用药根除胃、十二指肠幽门螺杆菌，降低消化道溃疡复发率。',
      },
      {
        number:10,
        Barcode:'6926720800604',
        name:'强力枇杷露',
        Ordi_name:'强力枇杷露（999）',
        Contents:'枇杷叶、罂粟壳、百部、白前、桑白皮、桔梗、薄荷脑、吗啡。辅料为苯甲酸钠、香精、蔗糖。',
        App_Disease:'养阴敛肺，止咳祛痰。用于支气管炎咳嗽。',
      },
      {
        number:9,
        Barcode:'6932833600161',
        name:'蒙脱石散',
        Ordi_name:'蒙脱石散（思密达）',
        Contents:'本品主要成份及其化学名称为蒙脱石。',
        App_Disease:'成年人及儿童急、慢性腹泻。用于食道、胃、十二指肠疾病引起的相关疼痛症状的辅助治疗，但本品不作解痉剂使用。',
      },
      {
        number:8,
        Barcode:'6905227001592',
        name:'地衣芽孢杆菌活菌胶囊',
        Ordi_name:'地衣芽孢杆菌活菌胶囊（整肠生）',
        Contents:'本品每粒含主要成份地衣芽孢杆菌0.25克(2.5亿活菌数)。辅料为乳糖、淀粉。',
        App_Disease:'本品主要用于细菌或真菌引起的急、慢性肠炎、腹泻。也可用于其他原因(如长期服用广谱抗生素)引起的肠道菌群失调的防治。',
      },
      {
        number:7,
        Barcode:'6931837200018',
        name:'西地碘含片',
        Ordi_name:'西地碘含片（华素片）',
        Contents:'本品主要成分为分子碘，每片含分子碘1.5毫克，辅料为蔗糖、西地脑、硬脂酸镁、羟丙甲纤维素。',
        App_Disease:'用于慢性咽喉炎、口腔溃疡、慢性牙龈炎、牙周炎。',
      },
      {
        number:6,
        Barcode:'6901592452359',
        name:'甲硝唑口颊片',
        Ordi_name:'甲硝唑口颊片（奥可安）',
        Contents:'本品每片含甲硝唑3毫克，辅料为甘露醇、山梨醇、羟丙甲纤维素、甜菊素、薄荷脑、羟丙基倍他环糊精、柠檬粉末香精、硬脂酸镁、乙醇。',
        App_Disease:'用于牙龈炎、牙周炎、冠周炎及口腔溃疡。',
      },
      {
        number:5,
        Barcode:'6926786100694',
        name:'复方牙痛酊',
        Ordi_name:'复方牙痛酊（同济堂）',
        Contents:'宽叶缬草、红花、凤仙花、樟木。辅料为乙醇。',
        App_Disease:'苗医：蒙岗比，勒勒果里品。中医：活血散瘀，消肿止痛。用于牙龈炎、龋齿引起的牙痛或牙龈肿痛。',
      },
      {
        number:4,
        Barcode:'6970745023173',
        name:'克痢痧胶囊',
        Ordi_name:'克痢痧胶囊（南洋）',
        Contents:'白芷，苍术，石菖蒲，细辛，荜茇，鹅不食草，猪牙皂，丁香，硝石，枯矾，雄黄，冰片。',
        App_Disease:'解毒辟秽，理气止泻。用于泄泻和痧气（中暑）。',
      },
      {
        number:3,
        Barcode:'6970350040398',
        name:'十滴水',
        Ordi_name:'十滴水（慧宝源）',
        Contents:'樟脑、干姜、大黄、小茴香、肉桂、辣椒、桉油。',
        App_Disease:'健胃，祛暑。用于因中暑而引起的头晕、恶心、腹痛、胃肠不适。',
      },
      {
        number:2,
        Barcode:'6939261902157',
        name:'桂林西瓜霜含片',
        Ordi_name:'桂林西瓜霜含片（三金）',
        Contents:'西瓜霜，硼砂(煅)，黄柏，黄连，山豆根，射干，浙贝母，青黛，冰片，无患子果(炭)，大黄，黄芩，甘草，薄荷脑。',
        App_Disease:'清热解毒，消肿止痛。用于肺、胃热盛兼有风热或痰热所致咽喉肿痛，口舌生疮，牙龈肿痛或出血；急慢性咽喉炎，急性卡他性扁桃体炎，口腔炎，口腔溃疡见上述证候者。',
      },
      {
        number:1,
        Barcode:'6901070243011',
        name:'云南白药气雾剂',
        Ordi_name:'云南白药气雾剂（云南白药）',
        Contents:'国家保密方，本品含草乌(制)、雪上一枝蒿(制)，其余成份略。',
        App_Disease:'活血散瘀，消肿止痛。用于跌打损伤，瘀血肿痛，肌肉酸痛及风湿疼痛。',
      },
      {
        number:0,
        Barcode:'6941456100040',
        name:'红霉素软膏',
        Ordi_name:'红霉素软膏（恒久远）',
        Contents:'每只含主要成分红霉素8万单位。辅料为黄凡士林。',
        App_Disease:'用于脓疱疮等化脓性皮肤病及小面积烧伤、溃疡面的感染。',
      }
    ]
  }

})