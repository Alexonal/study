// pages/sellwill/sellwill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    sale:[{
      img:'/images/gou.jpg',
      name:'nihsaodj',
      price:12
    }]
  },

  gosell:function(){
    wx.navigateTo({
      url: '/pages/packages_my/pages/sell/sell'
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user :app.globalData.me
    })
    var that = this;
    wx.cloud.database().collection('goods').where({
      _openid:this.data.user._openid,
      deal:false,
      type:1
    }).get()
    .then(res=>{
      console.log(res)
      that.setData({
        sale:res.data
      })
    })
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