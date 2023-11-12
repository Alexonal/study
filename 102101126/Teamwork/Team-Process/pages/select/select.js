// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search :[{'name':'充电宝','img':'/image/思维导图.jpg','term':'待出租','way':'2r/day'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'充电宝','img':'/image/思维导图.jpg','term':'待出租','way':'2r/day'}],
    height:0,
    get:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 380,
    })
    

  },
  input(e)
  {
    this.data.get=e.detail.value;
    this.setData({
      get:this.data.get
    })
  },
  search()
  {
    wx.cloud.database().collection('goods').where({
      name:wx.cloud.database().RegExp({
        regexp: this.data.get,
        options:'i'
      })
    }).get()
    .then(res=>{
      console.log(res);
    });
    // wx.request({
    //   url:"", 
    //   method: 'POST',
    //   data: {
    //     search:this.data.search
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) => {
    //     if(res.statusCode == 200) {
    //       console.log('用户信息已成功保存到后端');
    //       console.log(res)//请求成功后的res
    //     } else {
    //       console.error('保存到后端失败:', res);
    //     }
    //   },
    //   fail: (error) => {
    //     console.error('请求失败:', error);
    //   }
    // })
  },
  select()
  {
    wx.navigateTo({
      url: '/pages/display/display',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})