// const { default: test } = require("node:test");

// app.js
App({
  
  globalData : {
    openid:'',
    // my_user: {
    //   user:{
    //     head:"/images/流汗.jpg",
    //     myname:"盲点好",
    //     mycredit:100,
    //   },
    //   search_history:[],
    //   post:[],
    //   order_number:0,
    //   complete:0
    // },
    me:{},
    avatarUrl : '',
    nickName : '',
    timing: "",
  },
  updateNickName: function(nickName) {
    this.globalData.nickName = nickName;
    console.log(this)
  },
  updateavatarUrl: function(avatarUrl) {
    this.globalData.avatarUrl = avatarUrl;
  },
  get_user:async function(openid) {
    return new Promise((resolve, reject) => {
      wx.cloud.database().collection('user').
      where({
          _openid:openid
      }).
      get({
        
        success: res => {
          console.log(res)
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  onLaunch() {
    // 云环境初始化
    wx.cloud.init({
      // 'cloud-7gcswidkff2409ba'是云环境id
      env: 'cloud-7gcswidkff2409ba',
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success:(res) => {
        // console.log(res.userInfo)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // var userInfo = res.userInfo;
        // var nickName = userInfo.nickName;
        // console.log("用户昵称为:", nickName);
        // this.setData({
        //   userInfo:userInfo.avatar,
        //   nickName:nickName
        // })
        if (res.code) {
          wx.getUserInfo({
            success: res => {
              console.log(this)
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var avatarUrl = userInfo.avatarUrl;
              // 更新全局变量
              const app = getApp();
              app.updateNickName(nickName);
              app.updateavatarUrl(avatarUrl);

              console.log("用户昵称为:", nickName);
              console.log("用户头像URL为:", avatarUrl);

              wx.cloud.callFunction({
                name:'get_openid'
              }).then(id=>{
                console.log(id.result);
                this.globalData.openid = id.result.openid;
                wx.cloud.database().collection('user').where({
                  '_openid':id.result.openid
                }).get().then(r=>{
                  console.log(r);
                  if(r.data.length == 0)
                  {
                    wx.cloud.database().collection('user').add({
                      data:{
                        head:this.globalData.avatarUrl,
                        nickname:this.globalData.nickName,
                        order:0,
                        complete:0,
                      }
                    }).then(result=>{
                      console.log(result);
                    })
                    this.globalData.me = {
                      head:this.globalData.avatarUrl,
                      nickname:this.globalData.nickName,
                      order:0,
                      complete:0,
                      rate:0
                    }
                  }
                  else{
                    wx.cloud.database().collection('user').where({
                      '_openid':this.globalData.openid
                    }).update({
                      data:{
                        head:this.globalData.avatarUrl,
                        nickname:this.globalData.nickName,
                      }
                    }).then(result=>{
                      console.log(result);
                    })
                    this.globalData.me = r.data[0];
                    this.globalData.me.head = this.globalData.avatarUrl;
                    this.globalData.me.nickname = this.globalData.nickName;
                  }
                })
              })
            }
          });

      }
    }
    })
    
    // if(wx.getStorageSync('my_user')){
    //   this.globalData.my_user = wx.getStorageSync('my_user');
    // }
  },

  ask_time()  //求当前时间，形式为 系统的时间显示形式，如xxxx/xx/xx xx:xx
  {
    return new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0, 5)
  },
})


