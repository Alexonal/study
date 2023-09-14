import requests
import re
import os
import jieba
import wordcloud
from time import sleep,time
from selenium.webdriver import Chrome
from selenium.webdriver import ChromeOptions
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# 视频链接集合
url_list = set()
# 弹幕接口链接列表
danmu_url_list = []
# 弹幕列表
danmu_list = []
# 请求头
headers = {
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 SLBrowser/8.0.1.4031 SLBChan/103"
}
# cookie
cookies = {
    "cookie":"fsv__Session=d9alg163or9cmjess06fscn1eq; __gads=ID=4120b3d97685b146-2251123565e30002:T=1693889758:RT=1693960770:S=ALNI_MZyyDiqHuKUquNmncCyvwiqANWIVQ; __gpi=UID=00000c3c096967e4:T=1693889758:RT=1693960770:S=ALNI_MYyjrzCY5gbyKXArp-LT0THcfnXeQ"
}


def get_url():
    # chrome驱动路径
    chrome_path = "./chromedriver.exe"
    # 以命令行打开chrome浏览器
    os.system('start ./chrome-win64/chrome --remote-debugging-port=5000')
    # 配置options，使用驱动控制浏览器
    options = ChromeOptions()
    options.add_argument(argument='headless')
    options.add_experimental_option("debuggerAddress", "localhost:5000")
    web = Chrome(executable_path=chrome_path, options=options)
    # 访问www.bilibili.com
    web.get("https://www.bilibili.com/")
    # 输入要查询的关键词
    web.find_element(by=By.XPATH, value='//*[@id="nav-searchform"]/div[1]/input').send_keys("日本核污染水排海")
    # 点击搜索
    web.find_element(by=By.XPATH, value='//*[@id="nav-searchform"]/div[2]').click()
    sleep(1)
    web.close()
    # 切换窗口
    web.switch_to.window(web.window_handles[-1])
    # 获取综合排名前300的视频链接
    while True:
        # 找到所有链接所在的a标签
        res = web.find_elements(by=By.CSS_SELECTOR, value="div[class='bili-video-card__wrap __scale-wrap']>a")
        # 遍历res
        for i in res:
            # 获取链接
            tmp = i.get_attribute("href")
            # 处理链接
            tmp = re.sub(".*//www.bilibili", "https://www.ibilibili", tmp)
            # 加入url_list集合
            url_list.add(tmp)
            if len(url_list) >= 300:
                break
        if len(url_list) >= 300:
            break
        # 下一页
        web.find_element(by=By.XPATH, value="//*[text()='下一页']").click()
        # 延时2秒
        sleep(2)
    # 关闭浏览器
    web.close()
    print("成功获取视频链接")

def get_danmu_url():
    for url in url_list:
        # 访问
        response = requests.get(url=url, headers=headers, cookies=cookies)
        # 以网页编码格式解码
        response.encoding = response.apparent_encoding
        # 找到弹幕链接
        res = re.findall('<a href="(.*?)".*class="btn btn-default" target="_blank">弹幕</a>',response.text)
        # 将弹幕链接存在danmu_url_list
        if res != []:
            danmu_url_list.append(res[0])
    print("成功获取弹幕API链接")

def get_danmu():
    for url in danmu_url_list:
        # 访问
        response = requests.get(url=url, headers=headers, cookies=cookies)
        # 以网页编码格式解码
        response.encoding = response.apparent_encoding
        # 找到弹幕链接
        res = re.findall('<d p=".*?">(.*?)</d>', response.text)
        # 结果不为空
        if res != []:
            # 将弹幕链接存在danmu_url_list
            danmu_list.append(res)
    print("成功获取弹幕")

def save():
    with open('data.txt', mode='a+') as f:
        for d_list in danmu_list:
            for d in d_list:
                f.write(d + "\n")
    f.close()
    print("弹幕保存成功")


def draw_wordcloud():
    # 打开文件
    f = open('data.txt', encoding='utf-8')
    text = f.read()

    # 获取分词
    text_list = jieba.lcut(text)
    str = ' '.join(text_list)

    # 词云图配置
    wc = wordcloud.WordCloud(
        # 宽度
        width=1200,
        # 高度
        height=1000,
        # 背景颜色
        background_color='white',
        # 字体
        font_path='msyh.ttc',
        # 停用词
        stopwords={'的','你','我们'}
    )
    wc.generate(str)
    wc.to_file('词云图.png')



def main():
    get_url()
    get_danmu_url()
    get_danmu()
    save()
    draw_wordcloud()


if __name__ == '__main__':
    main()
