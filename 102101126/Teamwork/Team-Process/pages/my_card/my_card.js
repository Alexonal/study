// pages/my_card/my_card.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前导航索引
    currentIndexNav:2,
    //底部导航索引
    bt_index:0,
    //我的帖子信息
    //
    my_user:{
        user:{

        },
        post:{

        }
    },
    Z_img:["../../icons/赞.png"],
  },

//分区1-首部导航

  //点击导航
  activeNav(e)
  {
    console.log("点击导航");
    this.setData({
      currentIndexNav:e.target.dataset.index
    })
    console.log(e.target.dataset.index)
    if(this.data.currentIndexNav==0)
    wx.redirectTo({
      url: '/pages/recommend/recommend',
    })
    else if(this.data.currentIndexNav==1)
    wx.redirectTo({
      url: '/pages/search/search',
    })
    else if(this.data.currentIndexNav==2)
    wx.redirectTo({
      url: '/pages/my_card/my_card',
    })
  },


//分区2-浏览区

  //进入帖子详情
  click_detail(e)
  {
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    wx.navigateTo({
      url:'/pages/detail/detail?user='+JSON.stringify(this.data.my_user.user)+'&post='+JSON.stringify(e.currentTarget.dataset.detail),
    })
  },

  //点赞
  zan(e)
  {
    console.log("点赞");
    console.log(e)
    this.setData({
      [`Z_img[${e.currentTarget.dataset.index}]`]:"../../icons/赞R.png"
    })
  },

  //评论
  comment(e)
  {
    console.log("评论");
  },

//分区3-底部导航

  //底部导航
  skip(e)
  {
    console.log( e.currentTarget.dataset.id)
    this.setData({
      bt_index:e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id==0)
    {
      console.log("点击首页")
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    if(e.currentTarget.dataset.id==1)
    {
      console.log("点击发帖")
      wx.navigateTo({
        url: '/pages/upload/upload',
      })
    }
    if(e.currentTarget.dataset.id==2)
    {
      console.log("点击我的")
      wx.redirectTo({
        url: '/pages/my/my',
      })
    }
  },

  onLoad:function(options){
    const app = getApp();
    this.setData({
      my_user:app.globalData.my_user,
    })

    console.log("my_card receive options:\n")
    console.log("get my user:\n")
    console.log(this.data.my_user)
  },
})