const puppeteer = require('puppeteer'),
    BlinkDiff = require('blink-diff'),
    imgUrl = __dirname + "/blink-diff_img/";

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 945 });
    await page.goto('https://juejin.im/');


    await page.evaluate(async () => {

        //列表
        var Lists = document.querySelectorAll("div.feed.welcome__feed > ul > li > div > a > div");
        Lists.forEach(function (element, index, array) {

            element.querySelector("a.title").innerHTML = "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试";

            //替换标签
            element.querySelector("ul > li.item.category > span").innerHTML = "测试";

            //替换作者
            element.querySelector("ul > li.item.username.clickable > div > a").innerHTML = "测试";

            //替换发布时间
            element.querySelector("div.info-row.meta-row > ul > li:nth-child(3)").innerHTML = "9999天前";

            //替换发布时间
            element.querySelector("div.info-row.meta-row > ul > li:nth-child(4)").innerHTML = "99999999999 次阅读";

            //列表图片
            if (element.querySelectorAll("div.lazy.thumb.thumb.loaded").length==1) {
                element.querySelector("div.lazy.thumb.thumb.loaded").style.background = "#fdedc9";
            } else {
                var loaded=document.createElement("div");
                loaded.className=" lazy thumb thumb loaded";
                loaded.style.background = "#fdedc9";
                loaded.setAttribute("data-v-b2db8566","");
                loaded.setAttribute("data-v-009ea7bb","");
                loaded.setAttribute("data-v-f2ca14b0","");
                element.appendChild(loaded);
            }
        });

    });

    await page.screenshot({ path: imgUrl + 'Screenshots.png', fullPage: true });

    const diff = new BlinkDiff({
        imageAPath: imgUrl + 'example.png', // 设计图
        imageBPath: imgUrl + 'Screenshots.png',//页面截图
        threshold: 0.02, // 1% threshold
        imageOutputPath: imgUrl + 'Diff.png'//Diff路径
    });

    diff.run(function (error, result) {
        if (error) {
            throw error;
        } else {
            console.log(diff.hasPassed(result.code) ? '通过' : '失败');
            console.log('总像素:' + result.dimension);
            console.log('发现:' + result.differences + ' 差异.');
        }
    });



    await browser.close();
})();