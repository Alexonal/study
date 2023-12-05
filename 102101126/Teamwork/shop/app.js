// app.js
App({
  onLaunch() {
    
    wx.cloud.init({
        env:'cloud-7gcswidkff2409ba',
        traceUser:true
    })
  },
  globalData: {
    userInfo: null
  }
})
