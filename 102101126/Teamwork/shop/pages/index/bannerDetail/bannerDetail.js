// pages/index/bannerDetail/bannerDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.database().collection('banners').doc(options.bannerId).get()
            .then(res => {
                this.setData({
                    banner: res.data
                })
            })
    },
    addr() {
        wx.chooseAddress({
            success: (res) => {
                console.log(res)
            }
        })
    }
})