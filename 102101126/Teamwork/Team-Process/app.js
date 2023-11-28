// app.js
App({
  Name: 'dhr',
  credit: '8000',
  avatar: '',
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 云环境初始化
    wx.cloud.init({
      // 'cloud-7gcswidkff2409ba'是云环境id
      env: 'cloud-7gcswidkff2409ba',
    })
    this.globalData = {
      openid:'ouqs45TnuFSPsVILa30mKwXdL31g',
      my_user: {
        user:{
          head:"/images/流汗.jpg",
          myname:"盲点好",
          mycredit:100,
        },
        search_history:[],
        post:[]
      },
      // my_user:{
      //   user:{
      //     head:"/images/流汗.jpg",
      //     myname:"盲点好",
      //     mycredit:100,
      //   },
      //   search_history:["梳子","橘子","卷子"],
      //   post:[
      //     {
      //       time:"2023/11/22 12:03",
      //       title:"开罗全新游戏即将发售",
      //       content:"和哆啦A梦联动！！！！！谁买了借我玩凸(>皿<)凸~~~~~~",
      //       img:[
      //         "/images/game2.jpg",
      //         "/images/k1.jpg",
      //         "/images/k2.jpg",
      //       ],
      //       tag:["开罗游戏","kairosoft"],
      //       zan:{
      //         num:120,
      //         flag:false,
      //         img:"/icons/zan0.png"
      //       },
      //       cmt:[
      //         {
      //           head:"/images/糖果.jpg",
      //           name:"糖糖堂",
      //           content:"不错不错",
      //           time:"2023/11/22 12：06",
      //         },
      //       ],
      //     },
      //     {
      //       time:"2023/11/20 20:33",
      //       title:"新买的猫猫吐司^^",
      //       content:"你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了",
      //       img:[
      //         "/images/mi1.jpg",
      //         "/images/mi2.jpg",
      //         "/images/mi3.jpg",
      //         "/images/mi4.jpg"
      //       ],
      //       tag:["猫咪","猫猫","猫","pussy"],
      //       zan:{
      //         num:999,
      //         flag:true,
      //         img:"/icons/zan2.png"
      //       },
      //       cmt:[
      //         {
      //           head:"/images/mao.jpg",
      //           name:"我是猫",
      //           content:"这吐司不是我刚生的吗快还给我~",
      //           time:"2023/11/20 20：34",
      //         },
      //         {
      //           head:"/images/石矶.jpg",
      //           name:"石矶娘娘",
      //           content:"小猫咪躲在吐司里面就是想要我亲亲啦！",
      //           time:"2023/11/20 20：45",
      //         },
      //         {
      //           head:"/images/帽子.jpg",
      //           name:"帽帽",
      //           content:"猫猫说她想来35号楼",
      //           time:"2023/11/20 20：49",
      //         },
      //       ],
      //     },
      //   ]
      // },
      timing: ""
    }
    if(wx.getStorageSync('my_user')){
      this.globalData.my_user = wx.getStorageSync('my_user');
    }
  },

  ask_time()  //求当前时间，形式为 系统的时间显示形式，如xxxx/xx/xx xx:xx
  {
    return new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0, 5)
  },
})
