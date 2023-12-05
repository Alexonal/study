// index.js
// 获取应用实例
const app = getApp()

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
    this.getBanners()
  },
    getBanners() {
        wx.cloud.database().collection('banners').get()
        .then(res=>{
            console.log(res)
            this.setData({
                bannerList:res.data
            })
        })
    },
    toBannerDetail(event) {
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/index/bannerDetail/bannerDetail?bannerId=' + id,
        })
    }

})
