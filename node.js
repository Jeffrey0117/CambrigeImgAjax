const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
//const Pu = require("./test.js");
const app = express();

app.get("/search/:word", async (req, res) => {
  const { word } = req.params;

  //監聽文字
  console.log(word);

  //使用劍橋字典當作查詢API
  const url = `https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${word}`;

  try {
    // 读取CSS文件内容
    const cssContent = fs.readFileSync("./style.css", "utf8");

    // 读取JS文件内容
    const jsContent = fs.readFileSync("./script.js", "utf8");
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const targetElement = dom.window.document.querySelector(".sense-body");

    // 将HTML、CSS和JS内容合并并发送回浏览器
    const content = `
  <html>
    <head>
      <style>${cssContent}</style>
    </head>
    <body>
    <div class="centerDiv">
    <input class="searchText" type="text" placeholder="輸入要搜尋的英單">
    <button class="getText">查詢</button>
    </div>
    <span class="SearchWord">${word}</span>
    <div class="pic"></div>
      ${targetElement.innerHTML}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.4/vue.js" integrity="sha512-gVTBCSirFgjJqeR1zLvz2032HtYi+bLYRaz1XzXHQpZbrwU0tdJ54fGQQ6R6iIW53JIJ4r2mXoC/ZSPpVHyo+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js'></script>
      <script>${jsContent}</script>
      <script>
      window.onload = () => {
        try {
          MakeImgShow('${word}');
        } catch(error) {
          console.error(error);
          return 0;
        }
      };
      
    </script>
    </body>
  </html>
`;

    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send("單字是否有拚錯？沒有找到這個單字唷！");
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000/search/dog");
});
