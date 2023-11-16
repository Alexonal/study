// pages/recommend/recommend.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前导航索引
    currentIndexNav:0,
    //底部导航索引
    bt_index:0,
    //浏览区帖子信息
    post_list:[
      {
        user:{
          head:"/images/tuk.jpg",
          myname:"tuk",
          mycredit:1000,
          my_obj:[
            {
              intro:"111",
              image:"/images/tuk.jpg",
            },
            {
              intro:"333",
              image:"/images/跑腿闪送插画.png",
            }
          ]
        },
        post:{
          time:"17:25",
          title:"大四二手出售：这次体验超棒",
          content:"这次从学姐手里买的便利贴，简直开阔了我的眼界",
          img:[
            "/images/gou.jpg",
            "/images/zhu.jpg",
            "/images/gou.jpg",
          ],
          tag:["12345","tuk","鹅鹅鹅","1111111111","abcdefg"],
          cmt:[
            {
              head:"/images/松鼠.jpg",
              name:"吗喽",
              content:"点赞",
              time:"2023/11/14 13:24",
            }
          ],
        }
      },

      {
        user:{
          head:"/images/糖果.jpg",
          myname:"糖果",
          mycredit:233,
          my_obj:[
            {
              intro:"糖糖堂",
              image:"/images/糖果.jpg",
            },
            {
              intro:"出眼镜",
              image:"/images/眼镜.jpg",
            },
            {
              intro:"出吗喽",
              image:"/images/全暇.jpg",
            },
            {
              intro:"全暇不出",
              image:"/images/全暇.jpg",
            },
          ]
        },
        post:{
          time:"17:27",
          title:"大四二手出售：这次体验超棒",
          content:"这次从学姐手里买的糖果，简直开阔了我的眼界",
          img:[
            "/images/zhu.jpg",
          ],
          tag:["22222222","tuk","鹅鹅鹅","1111111111"],
          cmt:[
            {
              head:"/images/tuk.jpg",
              name:"tuk",
              content:"不给糖就捣蛋",
              time:"2023/11/14 13:44",
            },
            {
              head:"/images/橘子.jpg",
              name:"橘",
              content:"不给橘子就捣蛋",
              time:"2023/11/14 13:45",
            }

          ],
        }
      },

      {
        user:{
          head:"/images/帽子.jpg",
          myname:"帽子",
          mycredit:417,
          my_obj:[
            {
              intro:"送帽子",
              image:"/images/帽子.jpg",
            },
          ]
        },
        post:{
          time:"17:28",
          title:"大四二手出售：这次体验超棒",
          content:"这次从学姐手里买的帽子，简直开阔了我的眼界",
          img:[
            "/images/dog.jpg",
          ],
          tag:[],
          cmt:[],
        }
      },

      {
        user:{
          head:"/images/橘子.jpg",
          myname:"TUK",
          mycredit:417,
          my_obj:[
            {
              intro:"卖橘子",
              image:"/images/橘子.jpg",
            },
          ]
        },
        post:{
          time:"17:29",
          title:"大四二手出售：这次体验超棒",
          content:"这次从学姐手里买的橘子，简直开阔了我的眼界",
          tag:["4","tuk","鹅鹅鹅","1111111111"],
          cmt:[],
        }
      },
      
    ],
    
    my_user:{},
    
    
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
    if(this.data.currentIndexNav==1)        //搜索
    wx.redirectTo({
      url: '/pages/search/search',
    })
    else if(this.data.currentIndexNav==2)   //我的帖子
    wx.redirectTo({
      url: '/pages/my_card/my_card',
    })
  },


//分区2-浏览区

  //进入发帖人个人主页
  click_home(e)
  {
    var U=e.currentTarget.dataset.user
    console.log("点击发帖人个人主页")
    console.log(U)
    wx.navigateTo({
      url:'/pages/home/home?user='+ JSON.stringify(U),
    })
  },

  //进入帖子详情
  click_detail(e)
  {
    console.log(e)
    var I=e.currentTarget.dataset.item
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    console.log(I)
    wx.navigateTo({
      url:'/pages/detail/detail?user='+JSON.stringify(I.user)+'&post='+JSON.stringify(I.post),
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

  //获取帖子信息
  // get_scan_list()
  // {
  //   wx.request({
  //     url:"",
  //     data:{},
  //     success(res)
  //     {
  //       if(res.statusCode == 200) {
  //         console.log(res)//请求成功后的res
  //         this.setData({
  //           post_list:res.data.scan_list
  //         })
  //       } 
  //       else {
  //         console.error('请求失败:', res);
  //       }
  //     }
  //   })
    
  // },

  onLoad:function(options){
    //获取帖子数据
    // this.get_scan_list();
    wx.cloud.database().collection('community').orderBy('time', 'desc').get()
    .then(res=>{
      console.log(res.data);
      var list = []
      for(var i = 0;i < res.data.length;i++){
        
        list.push({
          user:res.data[i].user,
          post:{
            time:res.data[i].time,
            title:res.data[i].title,
            content:res.data[i].content,
            img:res.data[i].img,
            tag:res.data[i].tag,
            cmt:res.data[i].cmt,
          }
        })
      }
      this.setData({
        post_list:list
      })
      console.log(this.data.post_list)
    })
    const app = getApp();
    // console.log(app.globalData.my_user.user)
    this.setData({
      my_user:app.globalData.my_user
    })

    console.log("get post list:\n")
    console.log(this.data.post_list)
    console.log("get my user:\n")
    console.log(this.data.my_user)
    
  },
})