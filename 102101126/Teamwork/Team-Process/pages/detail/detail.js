// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_user:{
          head:"/images/mao.jpg",
          myname:"我是猫",
          mycredit:888,
          my_obj:[
            {
              intro:"狗",
              image:"/images/gou.jpg",
            },
            {
              intro:"狗狗",
              image:"/images/dog.png",
            },
            {
              intro:"一头猪",
              image:"/images/zhu.jpg",
            },
          ]
    },
    my_post:{
      time:"22:17",
      title:"大四二手出售：这次体验超棒",
      content:"这次从学姐手里买的书，简直开阔了我的眼界",
      img:[
        "/images/gou.jpg",
        "/images/zhu.jpg",
        "/images/gou.jpg",
      ],
      tag:["hhhh","23333","你是猪"],
      cmt:[
        {
          head:"/images/tuk.jpg",
          name:"tuk",
          content:"很不错值得点赞",
          time:"2023/11/14 13:07",
        },
        {
          head:"/images/gou.jpg",
          name:"gou",
          content:"很不错值得点赞",
          time:"2023/11/14 13:07",
        },
        {
          head:"/images/tuk.jpg",
          name:"333",
          content:"很不错值得点赞",
          time:"2023/11/14 13:07",
        },
      ],

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    var that = this;
    that.setData({
        my_user:JSON.parse(options.user),
        my_post:JSON.parse(options.post),
    })

    console.log("detail receive options:\n")
    console.log("get my user:\n")
    console.log(that.data.my_user)
    console.log("get my post:\n")
    console.log(that.data.my_post)
  },

})