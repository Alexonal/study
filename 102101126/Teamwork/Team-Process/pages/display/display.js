// pages/display/display.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publisher:'',
    receiver:'',
    goodId:'',
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  addOrder() {
    
    wx.cloud.database().collection('order').add({
      data:{
        publisher:this.data.publisher,
        receiver:app.globalData.openId,
        status:0,
        good_id:this.data.goodId,
        type:this.data.type
      }
    }).then(res=>{
      console.log(res);
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