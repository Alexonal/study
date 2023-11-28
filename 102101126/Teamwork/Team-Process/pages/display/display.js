const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    imgs: [],
    model: true,
    way: '',
    detail: '',
    information: false,
    order: [],
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var information = JSON.parse(options.information)
    var image = JSON.parse(options.image)
    var ge = JSON.parse(options.in)
    
    this.data.openid = information.openid;
    console.log(information);
    console.log(image);
    if (information.type == '待交换')
      this.data.model = false
    this.setData({
      imgs: image,
      name: information.name,
      way: information.way,
      detail: information.detail,
      model: this.data.model,
      information: ge
    })
  },
  information() {
    wx.navigateTo({
      url: '/pages/information/information?openid='+this.data.openid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    showIndex: null
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  gotijiao: function () {
    wx.cloud.database().collection('order').add({
      data:{
        name:this.data.order[0],
        contact:this.data.order[1],
        address:this.data.order[2],
        time:this.data.order[3],
        publisher:this.data.openid,
        receiver:app.globalData.openid,
        timestamp:new Date(),
        status:1
      }
    }).then(res=>{
      console.log(res)
    })
    wx.navigateTo({
      url: '/pages/tijiao/tijiao'
    })
  },
  // 打开弹窗
  openpop(e) {
    var index = e.currentTarget.dataset.index;

    this.setData({
      showIndex: index
    })
  },
  //关闭弹窗
  closepop() {
    this.setData({
      showIndex: null
    })
  },

  // 输入框
  input(event) {
    var id = event.currentTarget.dataset.index;
    this.data.order[id] = event.detail.value; 
  }

})