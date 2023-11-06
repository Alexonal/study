auto.waitFor();
app.launchApp("抖音");

var window = floaty.window(
    <vertical >
        <horizontal>
            <text>点赞次数：</text>
            <input id = "times" text = "100" focusable="true"/>
        </horizontal>

        <horizontal>
            <text>点赞间隔（ms）：</text>
            <input id = "delay" text = "50" focusable="true"/>
        </horizontal>
        <button id = "like" text = "点赞"/>
        <button id = "_stop" text = "停止"/>
        <button id = "out" text = "退出"/>

    </vertical>
)
window.setPosition(0,device.height/2);
//console.show(); //开启日志（悬浮窗权限）





window.times.on("key", function(keyCode, event){
    if(event.getAction() == event.ACTION_DOWN && keyCode == keys.back){
        window.disableFocus();
        event.consumed = true;
    }
});

window.times.on("touch_down", ()=>{
    window.requestFocus();
    window.times.requestFocus();
});

window.delay.on("key", function(keyCode, event){
    if(event.getAction() == event.ACTION_DOWN && keyCode == keys.back){
        window.disableFocus();
        event.consumed = true;
    }
});

window.delay.on("touch_down", ()=>{
    window.requestFocus();
    window.delay.requestFocus();
});


var t;
var d;
var flag = true;
var thread;


window.like.on("click",()=>{
    window.disableFocus();
    t = parseInt(window.times.text());
    d = parseInt(window.delay.text());
    thread = threads.start(
        function(){
            // device.keepScreenOn();
            flag = true;
            for(var i = 0;i < t;i++)
            {
                if(flag)
                {
                    click(device.width / 2, device.height / 2);
                }
                sleep(d);
            }
                
        }
    )
    
});

window.like.on("long_click", ()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

window._stop.on("click",()=>{
    window.disableFocus();
    flag = false;
    thread.interrupt();
});
window._stop.on("long_click", ()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
});
window.out.on("click",()=>{
    exit();
})









/**
 *点击一下屏幕
 */
function clickScreen() {
    let x = device.width / 2;
    let y = device.height / 2;
    toastLog("点击屏幕" + x + " " + y);
    let clickResult = click(x, y);
    toastLog(clickResult);
}

setInterval(()=>{}, 100);