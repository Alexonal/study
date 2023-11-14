// app.js
App({
  onLaunch(){ 
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
      env:'cloud-7gcswidkff2409ba',
    })
    // wx.cloud.callFunction({
    //   name: 'getOpenId',
    // }).then(res=>{
    //   this.globalData.openId = res.result.openid;
    // })
  },
  globalData: {
    userInfo: null,
    openId:'ouqs45VwzPLBwxRg9wjrHoXAybp4'
  },

})
