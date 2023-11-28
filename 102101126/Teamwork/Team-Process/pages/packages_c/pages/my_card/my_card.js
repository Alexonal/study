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
        user:{},
        post:[]
    },
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
      url: '/pages/packages_c/pages/search/search',
    })
  },


//分区2-浏览区

  //进入帖子详情
  click_detail(e)
  {
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    wx.navigateTo({
      url:'/pages/packages_c/pages/detail/detail?user='+JSON.stringify(this.data.my_user)+'&post='+JSON.stringify(e.currentTarget.dataset.detail)+'&id='+this.data.my_user.post.id,
    })
  },

  //点赞
  zan(e)
  {
    console.log("点赞");
    console.log(e)
    var id = e.currentTarget.dataset.index
    console.log(id)
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
    //同步后端数据改变：
    
  },

  //评论
  comment(e)
  {
    console.log("点击外评论");
    this.click_detail(e);
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
        url: '/pages/home  page/home page',
      })
    }
    if(e.currentTarget.dataset.id==1)
    {
      console.log("点击发帖")
      wx.navigateTo({
        url: '/pages/packages_c/pages/upload/upload',
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