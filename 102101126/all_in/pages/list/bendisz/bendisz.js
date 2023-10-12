// pages/list/bendisz/bendisz.js
//保存筹码数据
var jetton;
//保存局数数据
var number;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

//获取局数和筹码数据
        userjushu: function (e) {
            number = e.detail.value;
          },

          userchouma: function (e) {
            jetton = e.detail.value;
          },
//更新局数和筹码数据
          gobendiyouxi: function (e) {
            wx.redirectTo({
              url: '/pages/list/P2P/P2P?jetton=' + jetton + '&number=' + number,
            })
          },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        

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