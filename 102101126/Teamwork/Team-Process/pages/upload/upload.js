// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Ptitle:'',
      Pcontent:'',
      Pimg:[],
      my_user:{
        user:{},
        post:[],

      },
      time_now:"",
      count:0,
      tempImg:'',
      imgs:[],
      imgId:[]
  },
  chooseDetailImage(){
    var that = this;
    wx.chooseImage({
      count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res){
          var imgs = this.data.imgs;
          console.log(res.tempFilePaths)
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            imgs.push(res.tempFilePaths[i]);
          }
          this.setData({
            imgs:imgs
          })
          that.data.tempImg = res.tempFilePaths[0];
          that.uploadDetailImage();
        }
    })
  },
  
  uploadDetailImage(){
    var that = this;
    var filePath = this.data.tempImg;
    wx.cloud.uploadFile({
      cloudPath:'goods'+ filePath.split('/').pop(),
      filePath:filePath,
      success(res){
        console.log(res.fileID);
        this.data.imgId.push(res.fileID)
      }
    })
  },
  toPost(e)
  {
    var time = new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0,5)
    this.setData({
      Ptitle : e.detail.value.post_title,
      Pcontent : e.detail.value.post_content,
      time_now:time
    });
    wx.cloud.database().collection('community').add({
      data:{
        time:this.data.time_now,
        title:this.data.Ptitle,
        content:this.data.Pcontent,
        img:this.data.Pimg,
        tag:[],
        cmt:[],
        user:this.data.my_user.user
      }
    })
    this.data.my_user.post.push({
      time:this.data.time_now,
      title:this.data.Ptitle,
      content:this.data.Pcontent,
      img:this.data.Pimg,
      tag:[],
      cmt:[],
    })
    this.setData({
      [`my_user.post`]:this.data.my_user.post,
    })
    
    const app = getApp()
    app.globalData.my_user.post = this.data.my_user.post
    wx.setStorageSync('user', app.globalData.my_user)
    console.log("to post:\n")
    console.log("title:\n")
    console.log(this.data.Ptitle)
    console.log("content:\n")
    console.log(this.data.Pcontent)
    console.log("my new post list:\n")
    console.log(app.globalData.my_user.post)
    //向后端发送请求更新帖子数据：

    //发布完毕后自动回到“我的帖子”页面以方便查看
    wx.redirectTo({
      url: '/pages/my_card/my_card',
    })
  },
  onLoad:function(options)
  {
    const app = getApp();
    var time = new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0,5)
    this.setData({
      my_user:app.globalData.my_user,
      time_now:time,
    })

    console.log("upload receive options:\n")
    console.log("get my user:\n")
    console.log(this.data.my_user)
    console.log("get time now:\n")
    console.log(this.data.time_now)
  }
})