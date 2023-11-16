// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_user:{
      head:"/images/tuk.jpg",
      name:"Tuk",
      mycredit:8000,
      my_obj:[
        {
          intro:"111",
          image:"/images/跑腿闪送插画.png",
        },
        {
          intro:"222",
          image:"/images/橘子.jpg",
        },
        {
          intro:"333",
          image:"/images/跑腿闪送插画.png",
        }
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("home receive options:\n")
    console.log(options)
    var that = this;
    that.setData({
        my_user:JSON.parse(options.user)
    })
    console.log("my_user:\n")
    console.log(that.data.my_user)
  },
})