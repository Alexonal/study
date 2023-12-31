// pages/sell/sell.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    User: [
      {
        buyerName: 'dr', buyerContact: '12345678', buyerAddress: '40号楼',
        sellerName: 'da', sellerContact: '654321', sellerAddress: '38号楼'
      },
      {
        buyerName: 'dq', buyerContact: '45567980', buyerAddress: '10号楼',
        sellerName: 'da', sellerContact: '654321', sellerAddress: '38号楼'
      },
    ],
    user: {},
    order: [
      {
        img: 'https://img-community.csdnimg.cn/images/383db237fa4c4b13a4749eed957db58f.png',
        buyer: '微信用户',
        seller: 'da',
        process: '1'
      },
      {
        img: 'https://img-community.csdnimg.cn/images/383db237fa4c4b13a4749eed957db58f.png',
        buyer: 'da',
        seller: '微信用户',
        process: '1'
      },
    ],
    In: 0,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad(options) {
    // 两个方法均可
    // var that = this;
    //   that.setData({
    //       user:JSON.parse(options.my_user),
    //   })
    //   console.log(this.data.user)

    this.setData({
      user: app.globalData.me
    })
    var that = this;
    wx.cloud.callFunction({
      name:'get_sell_list'
    }).then(res=>{
      console.log(res.result.list)
      that.setData({
        order:res.result.list
      })
    })
  },
  progress: function (e) {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(id)
    var order = this.data.order;
    console.log(order)
    console.log(id)
    order[index].status = id
    console.log(order[index].status)
    this.setData({
      order: order
    })
    wx.cloud.database().collection('order').where({
      _id:this.data.order[index]._id
    }).update({
      data:{
        status:this.data.order[index].status
      }
    })
    .then(res=>{
      console.log(res)
    })
  },
  gosellwill: function () {
    wx.navigateTo({
      url: '/pages/packages_my/pages/sellwill/sellwill'
    })
  },

  gochatroom: function (e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    var openid = '';
    if( this.data.order[index].u_from[0]._openid == app.globalData.me._openid){
      openid = this.data.order[index].u_to[0]._openid;
    }
    else{
      openid = this.data.order[index].u_from[0]._openid;
    }
    wx.navigateTo({
      url: '/pages/packages_my/pages/chatroom/chatroom?openid=' + openid
    })
  },
  showHidden: function (e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      hide: false,  // 点击按钮切换显示状态
      In: index
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