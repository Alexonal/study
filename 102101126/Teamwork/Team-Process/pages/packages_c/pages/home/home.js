// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    my_user:{
      user:{
        head:"/images/tuk.jpg",
        name:"Tuk",
        mycredit:8000,
      },
      post:[]
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
        my_user:JSON.parse(options.my_user)
    })
    console.log("my_user:\n")
    console.log(that.data.my_user)
  },

  click_detail(e)
  {
    console.log("点击帖子详情")
    wx.navigateTo({
      url:'/pages/packages_c/pages/detail/detail?user='+JSON.stringify(this.data.my_user)+'&post='+JSON.stringify(e.currentTarget.dataset.detail),
    })
  },

  //点赞
  zan(e)
  {
    console.log("点赞")
    console.log(e)
    var id = e.currentTarget.dataset.index
    var temp_img = `my_user.post[${id}].zan.img`
    var temp_flag = `my_user.post[${id}].zan.flag`
    var temp_num = `my_user.post[${id}].zan.num`
    var temp = this.data.my_user.post[id].zan
    console.log(temp.flag)
    this.setData({
      [temp_img]:temp.flag?"/icons/zan0.png":"/icons/zan2.png",
      [temp_flag]:!temp.flag
    })
    if(temp.flag)   //加赞
    {
      this.setData({
        [temp_num]:temp.num+1
      })
    }
    else            //减赞
    {
      this.setData({
        [temp_num]:temp.num-1
      })
    }
    console.log(temp)
    //同步后端数据改变不然单页面的数据改动无法保存下来：

  },

  //评论
  comment(e)
  {
    console.log("评论");
  },
})