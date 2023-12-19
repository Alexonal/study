// pages/sell/sell.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    User: {},
    user: {},
    order: [],
    In: 0
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
    wx.cloud.database().collection('user').where({
      _openid:app.globalData.openid
    })
    .watch({
      // 数据库变化会执行
      onChange:function(snapshot){
        console.log(snapshot);
        app.globalData.me = snapshot.docs[0];
        that.setData({
          user:app.globalData.me
        })
        wx.cloud.callFunction({
          name:'get_sell_list'
        }).then(res=>{
          console.log(res.result.list)
          that.setData({
            order:res.result.list
          })
        })
      },
      // 错误
      onError:function(err) {
        console.log(err);
      }
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
    var status = order[index].status;
    order[index].status = id;
    console.log(order[index].status)
    this.setData({
      order: order
    })
    var that = this;
    if (status != id) {
      const db = wx.cloud.database();
      const _ = db.command;

      // 同步订单状态到数据库
      db.collection('order').where({
        _id: that.data.order[index]._id
      }).update({
        data: {
          status: that.data.order[index].status
        }
      }).then(res => {
        console.log(res)
      })

      if (status == 6) {
        // 双方完成数加一
        var user_from = that.data.order[index].u_from;
        var user_to = that.data.order[index].u_to;
        var from_rate = (user_from.complete + 1)/ user_from.order;
        var to_rate = (user_to.complete + 1)/ user_to.order;
        db.collection('user').where({
          _openid:that.data.order[index].u_from._openid,
        }).update({
          data: {
            complete: _.inc(1),
            rate:from_rate
          }
        })
        .then(res => {
          console.log(res);
        })
        db.collection('user').where({
          _openid:that.data.order[index].u_to._openid,
        }).update({
          data: {
            complete: _.inc(1),
            rate:to_rate
          }
        })
        .then(res => {
          console.log(res);
        })
      }
    }

  },

  gosellwill: function () {
    wx.redirectTo({
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
    const item = e.currentTarget.dataset.item;
    console.log(index);
    console.log(item)
    this.data.User=item;
    console.log( this.data.User)
    this.setData({
      hide: false,  // 点击按钮切换显示状态
      User:this.data.User
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