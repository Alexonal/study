// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['星期一', '星期二', '星期三','星期四','星期五'], ['9：00~12：00', '15：00~17：30']],
    multiIndex: [0, 0],
    selectedValue: '',
    name:'',
    money:0,
    message:'无',
    contact:'无',
    weight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  else if(id=='weight')
  {this.data.weight=ev.detail.value;}
  else if(id=='relax')
  {this.data.contact=ev.detail.value;}
},

  onMultiPickerChange: function (event) {
    const multiIndex = event.detail.value;
    const multiArray = this.data.multiArray;
    const selectedValue = multiArray[0][multiIndex[0]] + ' ' + multiArray[1][multiIndex[1]];

    this.setData({
      multiIndex: multiIndex,
      selectedValue: selectedValue,
    });
  },
  
 /*确定信息，并传入后端 */
 ok()
 {
  wx.cloud.database().collection('donation_test').add({
    data: {
      name: this.data.name,
      detail: this.data.money,
      address: this.data.message,
      date: this.data.selectedValue,
      weight: this.data.weight,
      contact: this.data.contact
    }
  }).then(res => {
    console.log(res);
  });
   wx.navigateTo({
     url: '/pages/home  page/home page',
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