
// pages/list/AI/AI.js
const app = getApp()
// 玩家类
class Player {
    constructor(dices, jetton, mul) 
    {
        this.dices = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        for(var i = 0;i < 5;i++)
        {
            this.dices[0][i] = Math.floor(Math.random() * 6 + 1);
        }
        this.jetton = 1000;
        this.mul = 1;
    }
    // 锁定某个骰子
    lock(num) {
        this.dices[1][num] = 1;
    }
    // 解锁骰子
    unlock() 
    {
        for(var i = 0;i<5;i++)
        {
            this.dices[1][i] = 0;
        }
    }
    // 掷骰子
    throw() 
    {
        for(var i = 0;i < 5;i++)
        {
            if(this.dices[1][i] != 1)
            {
                this.dices[0][i] = Math.floor(Math.random() * 6 + 1);
            }
        }
    }
    // 判断特殊牌型
    judge_pattern()
    {
        // 统计各个点数骰子数量
        var count = [0, 0, 0, 0, 0, 0];
        for(var i = 0;i < 5;i++)
        {
            count[this.dices[0][i] - 1]++;
        }
        // 统计不同点数骰子数量
        var count_num = 0;
        for(var i = 0;i < 6;i++)
        {
            if(count[i] > 0)
            {
                count_num++;
            }
        }
        if(count_num == 1)
        {
            console.log("五连");
            return 100;
        }
        else if(count_num == 2)
        {
            for(var i = 0;i < 6;i++)
            {
                if(count[i] == 4)
                {
                    console.log("四连");
                    return 40;
                }
            }
            console.log("葫芦");
            return 20;
        }
        else if(count_num == 3)
        {
            console.log("两对 or 三连");
            return 10;
        }
        else if(count_num = 4)
        {
            // 点数 2 3 4 5
            if(count[0] == 0 && count[5] == 0)
            {
                console.log("小顺子");
                return 30;
            }
            // 点数 3 4 5 6
            if(count[0] == 0 && count[1] == 0)
            {
                console.log("小顺子");
                return 30;
            }
            // 点数 1 2 3 4
            if(count[4] == 0 && count[5] == 0)
            {
                console.log("小顺子");
                return 30;
            }
        }
        else if(count_num = 5)
        {
            if(count[0] == 0 || count[5] == 0)
            {
                console.log("顺子");
                return 60;
            }
        }
        return 0;
    }
    // 获取分数
    get_score()
    {
        var sum = 0;
        for(var i = 0;i < 5;i++)
        {
            sum += this.dices[0][i];  
        }
        return sum + this.judge_pattern();
    }
}
// 图片
var png = {
    1: "../../../img/1.png",
    2: "../../../img/2.png",
    3: "../../../img/3.png",
    4: "../../../img/4.png",
    5: "../../../img/5.png",
    6: "../../../img/6.png",
    7: "../../../img/7.png",
    8: "../../../img/8.png",
    9: "../../../img/9.png",
    10: "../../../img/10.png",
    11: "../../../img/11.png",
    12: "../../../img/12.png",
    'throw': "../../../img/throw.gif"
};


// 延时函数
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

// 玩家
var play1 = new Player();
var play2 = new Player();
// 
var tmp1 = [0, 0, 0, 0, 0];
var tmp2 = [0, 0, 0, 0, 0];
// 总倍率
var multiply = 1;
// 轮次
var round = 1;
// 总局数
var sum_number;
// 现局数
var now_number = 1;
// 锁定数
var locks = 0;
// 希望投掷出的点数
var hope = 6;
// AI锁定骰子
function robot(player, lock_num)
{   
    if(round == 3)
    {
        if(player.get_score() > play1.get_score()){
            player.mul = 3;
        }
        return 0;
    }
    // 已锁定5枚骰子，不操作
    if(lock_num == 5)
    {
        player.mul = 3;
        return lock_num;
    }
    // 已锁定3或4枚骰子，牌型基本确定，判断是否投掷出预期的点数
    else if(lock_num == 3 || lock_num == 4)
    {
        for(var i = 0;i < 5;i++)
        {
            if(player.dices[0][i] == hope && player.dices[1][i] == 0)
            {
                player.dices[1][i] = 1;
                lock_num++;
            }
        }
        player.mul = lock_num - 2;
        return lock_num;
    }

    //点数 2 3 4 5
    if(hope == 7)
    {
        for(var i = 0;i < 5;i++)
        {
            if(player.dices[1][i] == 0 && (player.dices[0][i] == 1 || player.dices[0][i] == 6))
            {
                player.dices[1][i] = 1;
                lock_num++;
            }
        }
        player.mul = 3;
        return lock_num;
    }
    console.log(".....");
    // 统计各点数的骰子
    var count = [0, 0, 0, 0, 0, 0];
    for(var i = 0;i < 5;i++)
    {
        count[player.dices[0][i] - 1]++;
    }
    // 统计有多少种不同点数的骰子
    var count_num = 0;
    for(var i = 0;i < 6;i++)
    {
        if(count[i] > 0)
        {
            count_num++;
        }
    }

    // 根据不同点数骰子数判断牌型
    // 五连，全都锁定
    if(count_num == 1)
    {
        for(var i = 0;i < 5;i++)
        {
            player.dices[1][i] = 1;
        }
        player.mul = 3;
        return 5;
    }
    else if(count_num == 2)
    {
        // 四连，锁定四个相同的骰子
        for(var i = 0;i < 6;i++)
        {
            if(count[i] == 4)
            {
                for(var j = 0;j < 5;j++)
                {
                    if(player.dices[0][j] == i + 1)
                    {
                        player.dices[1][j] = 1;
                    }
                }
                player.mul = 3;
                hope = i + 1;
                return 4;
            }
        }
        // 葫芦
        for(var i = 0;i < 5;i++)
        {
            player.dices[1][i] = 1;
        }
        player.mul = 2;
        return 5;
    }
    else if(count_num == 3)
    {
        // 三连
        for(var i = 0;i < 6;i++)
        {
            if(count[i] == 3){
                for(var j = 0;j < 5;j++)
                {
                    if(player.dices[0][j] == i + 1)
                    {
                        player.dices[1][j] = 1;
                    }
                }
                player.mul = 2;
                hope = i + 1;
                return 3;
            }
        }
        // 双对
        for(var i = 5;i >= 0;i--)
        {
            if(count[i] == 2){
                for(var j = 0;j < 5;j++)
                {
                    if(player.dices[0][j] == i + 1)
                    {
                        player.dices[1][j] = 1;
                    }
                }
                player.mul = 2;
                hope = i + 1;
                return 2;
            }
        }
    }
    else if(count_num == 4)
    {
        // 点数 2 3 4 5
        if(count[0] == 0 && count[5] == 5)
        {
            for(var i = 2;i < 6; i++)
            {
                for(var j = 0;j < 5;j++)
                {
                    if(player.dices[0][j] == i)
                    {
                        player.dices[1][j] = 1;
                        break;
                    }
                }
            }
            player.mul = 3;
            hope = 7;
            return 4;
        }
        // 没有1，有6
        else if(count[0] == 0)
        {
            for(var i = 1;i < 6;i++)
            {
                if(count[i] == 0)
                {
                    hope = i + 1;
                }
                else
                {
                    for(var j = 0;j < 5;j++)
                    {
                        if(player.dices[0][j] == i + 1)
                        {
                            player.dices[1][j] = 1;
                            break;
                        }
                    }
                }
            }
            player.mul = 3;
            return 4;
        }
        // 有1，没有6
        else if(count[5] == 0)
        {
            for(var i = 0;i < 5;i++)
            {
                if(count[i] == 0)
                {
                    hope = i + 1;
                }
                else
                {
                    for(var j = 0;j < 5;j++)
                    {
                        if(player.dices[0][j] == i + 1)
                        {
                            player.dices[1][j] = 1;
                            break;
                        }
                    }
                }
            }
            player.mul = 3;
            return 4;
        }
        console.log("乱七八糟");
        return 0;
    }
    else if(count_num == 5)
    {
        // 顺子
        if(count[0] == 0 || count[5] == 0)
        {
            for(var i = 0;i < 5;i++)
            {
                player.dices[1][i] = 1;
            }
            player.mul = 3;
            return 5;
        }
        // 中间缺一个
        for(var i = 1;i < 6;i++)
        {
            // 空缺
            if(count[i] == 0)
            {
                hope = i + 1;
            }

            for(var j = 0;j < 5;j++)
            {
                if(player.dices[0][j] == i + 1)
                {
                    player.dices[1][j] = 1;
                    break;
                }
            }
        }
        player.mul = 3;
        return 4;
    }
}

// 设置骰子
function setPmatrix() {
    for(var i = 0;i < 5;i++)
    {
        tmp1[i] = png[play1.dices[0][i] + play1.dices[1][i] * 6];
        tmp2[i] = png[play2.dices[0][i] + play2.dices[1][i] * 6];
    }  
}
// 掷骰子
function throw_img() {
    for(var i = 0;i < 5;i++)
    {
        if(play1.dices[1][i] == 0)
        {
            tmp1[i] = png['throw'];
        }
        else
        {
            tmp1[i] = png[play1.dices[0][i] + 6];
        }
        if(play2.dices[1][i] == 0)
        {
            tmp2[i] = png['throw'];
        }
        else
        {
            tmp2[i] = png[play2.dices[0][i] + 6];
        }
    } 
}

Page({

    /**
     * 页面的初始数据
     */
    data: {   
            
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 初始化界面数据
        play1 = new Player();
        play2 = new Player();
        multiply = 1;
        round = 1;
        now_number = 1;
        locks = 0;
        sum_number = parseInt(options.number);
        play1.jetton = parseInt(options.jetton);
        play2.jetton = parseInt(options.jetton);
        this.setData({jetton1:play1.jetton});
        this.setData({jetton2:play2.jetton})
        this.setData({m1:play1.mul});
        this.setData({m2:play2.mul});
        wx.showToast({
            title: "第" + now_number +"局" + "round  " + round, // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径
            duration: 1500, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
            success: function () {

            },
            fail: function () {

            },
            complete: function () {

            }
        });
        throw_img();
        this.setData({p1:tmp1});
        this.setData({p2:tmp2});
        sleep(1500);
        locks = robot(play2,locks);
        console.log("locks=%d",locks);
        console.log("hope=%d",hope);

        this.setData({m2:play2.mul});
        setPmatrix();
        this.setData({p1:tmp1});
        this.setData({p2:tmp2});
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

    },
    // 更改倍率
    mul:function() {
        play1.mul = play1.mul % 3 + 1;
        this.setData({m1:play1.mul});
    },
    // 锁定按键
    locker:function(){
        round++;
        if(round == 4)
        {
            var score1 = play1.get_score();
            var score2 = play2.get_score();
            var score = (score1 - score2) * multiply* play1.mul * play2.mul;
            play1.jetton += score;
            play2.jetton -= score;
            var str;
            if(score > 0)
            {
                str = "玩家获胜";
            }
            else if(score <0)
            {
                str = "电脑获胜"; 
            }
            else
            {
                str = "平局"
            }
            wx.showToast({
                title: str, // 提示的内容
                icon: "none", // 图标，默认success
                image: "", // 自定义图标的本地路径
                duration: 1500, // 提示的延迟时间，默认1500
                mask: false, // 是否显示透明蒙层，防止触摸穿透
                success: function () {
    
                },
                fail: function () {
    
                },
                complete: function () {
    
                }
            });
            sleep(1500);
            if(play2.jetton <= 0 || (play2.jetton <= play1.jetton && now_number >= sum_number))
            {
                wx.redirectTo({
                    url: '/pages/list/win/win',
                });
            }
            else if(play1.jetton <= 0 || (play1.jetton < play2.jetton && now_number >= sum_number))
            {
                wx.redirectTo({
                    url: '/pages/list/lose/lose',
                });
            }
            else{
                this.setData({jetton1:play1.jetton});
                this.setData({jetton2:play2.jetton});
                multiply = 1;
                play1.mul = 1;
                play2.mul = 1;
                round = 1;
                now_number++;
                wx.showToast({
                    title: "第" + now_number +"局" + "round  " + round, // 提示的内容
                    icon: "none", // 图标，默认success
                    image: "", // 自定义图标的本地路径
                    duration: 1500, // 提示的延迟时间，默认1500
                    mask: false, // 是否显示透明蒙层，防止触摸穿透
                    success: function () {
        
                    },
                    fail: function () {
        
                    },
                    complete: function () {
        
                    }
                });
                play1.unlock();
                play1.throw();
                play2.unlock();
                play2.throw();
                throw_img();
                this.setData({p1:tmp1});
                this.setData({p2:tmp2});
                sleep(1500);
                locks = robot(play2,locks);
                console.log("locks=%d",locks);
                console.log("hope=%d",hope);
                this.setData({multiply:multiply});
                this.setData({m1:play1.mul});
                this.setData({m2:play2.mul});
                setPmatrix();
                this.setData({p1:tmp1});
                this.setData({p2:tmp2});
                locks = 0;
            }
        }
        else
        {
            
            wx.showToast({
                title: "第" + now_number +"局" + "round  " + round, // 提示的内容
                icon: "none", // 图标，默认success
                image: "", // 自定义图标的本地路径
                duration: 1500, // 提示的延迟时间，默认1500
                mask: false, // 是否显示透明蒙层，防止触摸穿透
                success: function () {
    
                },
                fail: function () {
    
                },
                complete: function () {
    
                }
            });
            throw_img();
            this.setData({p1:tmp1});
            this.setData({p2:tmp2});
            multiply = multiply * play1.mul * play2.mul;
            play1.mul = 1;
            play2.mul = 1;
            locks = robot(play2,locks);
            console.log("locks=%d",locks);
            console.log("hope=%d",hope);
            this.setData({multiply:multiply});
            this.setData({m1:play1.mul});
            this.setData({m2:play2.mul});
            sleep(1500);
            play1.throw();
            play2.throw();
            setPmatrix();
            this.setData({p1:tmp1});
            this.setData({p2:tmp2});
        }

    },
    // 选择要锁定骰子
    chioce:function(a){
        var num = a.currentTarget.dataset.num;
        play1.dices[1][num] = 1;
        setPmatrix();
        this.setData({p1:tmp1});
    },
})