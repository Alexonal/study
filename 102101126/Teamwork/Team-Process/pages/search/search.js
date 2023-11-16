// pages/recommend/recommend.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      //当前导航索引
      currentIndexNav:1,
      //底部导航索引
      bt_index:0,
      //搜索关键词
      key_word:'',
      history:[],
      my_user:{},
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
  
  //分区2-搜索区

  //获取表单数据
  go_search(e)
  {
    
    if(!e.detail.value||e.detail.value.trim()==='') return;     //控制搜索字不为空或空串
    var str = e.detail.value.trim()
    this.data.history.push(str)
    this.setData({
      key_word:str,
      history:this.data.history
    })

    console.log("new history:\n")
    console.log(this.data.history)

    const app = getApp();
    app.globalData.my_user.search_history=this.data.history
    wx.setStorageSync('user', app.globalData.my_user)
    //console.log(app.globalData.my_user.search_history)
    //向后端发送搜索关键字请求：
    wx.cloud.database().collection('community').where({
      title:wx.cloud.database().RegExp({
        regexp: this.data.key_word,
        options:'i'
      })
    }).get()
    .then(res=>{
      console.log(res)
    })
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
          url:'/pages/upload/upload',
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
        history:app.globalData.my_user.search_history
      })
      
      console.log("search receive options:\n")
      console.log("get my user:\n")
      console.log(this.data.my_user)
      console.log("get history:\n")
      console.log(this.data.history)
    },

})