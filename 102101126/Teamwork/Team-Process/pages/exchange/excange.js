// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:[],
    name:'',
    money:0,
    message:'无',
    contact:'无',
    imgs: [],
    count: 3,
    model:false,
  },
/*传入图片*/
change(){
var model=!this.data.model;
var that = this
wx.chooseImage({
  count: that.data.count, // 默认3
  sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    console.log(1111)
    var tempFilePaths = res.tempFilePaths
    console.log(tempFilePaths,2222)
    for(var i=0;i<tempFilePaths.length;i++)
    {
      that.data.imgs.push(tempFilePaths[i]);
    }
    var imgs=that.data.imgs
    console.log(imgs,3333)
    that.setData({
      model:model,
      imgs: that.data.imgs
    })
  }
})
},
bindUpload: function (e) {
  let index = e.currentTarget.dataset.index
  wx.previewImage({ 
    current: this.data.imgs[index], /*当前显示图片的http链接 */
    urls: this.data.imgs // 需要预览的图片http链接列表 
})
},
/*输入信息*/
input(ev)
{
  var id=ev.currentTarget.id;
  if(id=='name')
  {this.data.name=ev.detail.value;}
  else if(id=='money')
  {this.data.money=ev.detail.value;}
  else if(id=='message')
  {this.data.message=ev.detail.value;}
  else if(id=='relax')
  {this.data.contact=ev.detail.value;}
},
  /*确定信息，并传入后端 */
ok()
{
	wx.cloud.database().collection('goods').add({
    data:{
      name:this.data.name,
      detail:this.data.message,
      contact:this.data.contact,
      type:2,
      img:this.data.imageUrls,
      special:{
        item : this.data.money
      }
    }
  }).then(res=>{
    console.log(res);
    
  });
  wx.navigateTo({
    url: '/pages/home  page/home page',
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