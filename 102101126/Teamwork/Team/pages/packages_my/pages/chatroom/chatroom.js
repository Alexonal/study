// pages/chatroom/chatroom.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat:'',
    userMy:'',
    userOther:'',
    user:{},
    openid:'',
    windowHeight:0,
    // contact:
    //   [
    //     { 
    //       userOther: { 
    //         avatarUrl: '/image/dog.jpg', 
    //         nickName: 'da', 
    //         chat: "你好！" 
    //       } 
    //     },
    //     { userOther: { avatarUrl: '/image/dog.jpg', nickName: 'da', chat: "你好！" } },
    //     { userMy: { avatarUrl: '/image/gou.jpg', nickName: 'dr', chat: "你好！gggggggggggggggggggfewfe" } },
    //     { userOther: { avatarUrl: '/image/dog.jpg', nickName: 'da', chat: "你好！" } },
    //     { userMy: { avatarUrl: '/image/gou.jpg', nickName: 'dr', chat: "你好！" } },
    //     { userMy: { avatarUrl: '/image/gou.jpg', nickName: 'dr', chat: "你好！" } },
    //   ],
    contact:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad(options) {

      var that = this;
      this.setData({openid:options.openid})
      wx.cloud.database().collection('chat').where({
        people:app.globalData.openid,
        people:this.data.openid
      })
      .watch({
        onChange:function(snapshot){
          console.log(snapshot)
          if(snapshot.docs.length == 0){
            wx.cloud.database().collection('chat').add({
              data:{
                people:[that.data.openid, app.globalData.openid],
                message:[]
              }
            })
          }
          else{
            var tmp = snapshot.docs[0].message;
            tmp.sort((a,b)=>{
              return a.time - b.time; 
            })
            that.setData({contact:tmp});
          }
        },
        onError:function(err) {
          console.log(err);
        }
      })
      

      wx.cloud.database().collection('user').where({
        _openid:this.data.openid
      }).get()
      .then(res=>{
        this.setData({userOther:res.data[0]})
      })


      // 两个方法均可
      // var that = this;
      //   that.setData({
      //       user:JSON.parse(options.my_user),
      //   })
      //   console.log(this.data.user)
      var windowHeight=0
      wx.getSystemInfo({
        success: function(res) {
          console.log(res.windowHeight); // 手机屏幕高度
          windowHeight=res.windowHeight;
        }
      });
      
      // var avatarUrl=app.globalData.avatarUrl;
      // var nickName=app.globalData.nickName;
      // console.log(avatarUrl);
      // console.log(nickName);
      // var user={avatarUrl:avatarUrl,nickName:nickName}
      
      this.setData({
        user:app.globalData.me,
        windowHeight:windowHeight
      })
    },
  chat(e){
    
    let value = e.detail.value;
    console.log(value);
    this.setData({
      chat:value
    })
  },
  img(){
    var that = this;
    wx.chooseImage({
      count: that.data.count, // 默认3
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
  
        that.setData({
        });
      }
    })
  },
  post(){
    // console.log(this.data.contact);
    var msg = {
      from:app.globalData.openid,
      type:1,
      content:this.data.chat,
      time:new Date()
    };
    this.setData({chat:''})
    this.data.contact.push(msg);
    var that = this;
    wx.cloud.database().collection('chat').where({
			people:app.globalData.openid,
      people:this.data.openid
		}).update({
			data:{
        message:this.data.contact
			}
		}).then(res=>{
			console.log(res)
		})
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