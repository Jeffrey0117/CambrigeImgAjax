const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const app = express();
const { escape } = require("lodash"); // 引入 lodash 中的 escape 函数

app.get("/search/:word", async (req, res) => {
  let { word } = req.params;
  word = escape(word); // 转义用户输入
  console.log(word);
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    Referer: "https://dictionary.cambridge.org/",
  };

  try {
    const { data } = await axios.get(
      `https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${word}`,
      { headers }
    );
    const content = generateHTML(word, data);
    res.send(content);
  } catch (error) {
    const errorContent = generateErrorHTML(word);
    res.send(errorContent);
  }
});

function generateHTML(word, data) {
  const dom = new JSDOM(data);
  const targetElement = dom.window.document.querySelector(".sense-body");

  return `
      <html>
        <head>
          <style>${fs.readFileSync("./style.css", "utf8")}</style>
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
          <script>${fs.readFileSync("./script.js", "utf8")}</script>
          <script>
            window.onload = () => {
              try {
                MakeImgShow('${word}');
              } catch(error) {
                console.error(error);
              }
            };
          </script>
        </body>
      </html>
    `;
}

function generateErrorHTML(word) {
  const cssContent = fs.readFileSync("./style.css", "utf8");
  const errorContent = `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          <div class="centerDiv">
            <input class="searchText" type="text" placeholder="找不到這個單字哦！">
            <button class="getText">查詢</button>
          </div>
          <span class="SearchWord">error</span><br>
          <h3>查不到${word}呢QQ，換一個吧！</h3>
          <div class="pic"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.4/vue.js" integrity="sha512-gVTBCSirFgjJqeR1zLvz2032HtYi+bLYRaz1XzXHQpZbrwU0tdJ54fGQQ6R6iIW53JIJ4r2mXoC/ZSPpVHyo+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js'></script>
          <script>${fs.readFileSync("./script.js", "utf8")}</script>
          <script>
            window.onload = () => {
              try {
                MakeImgShow('error');
              } catch(error) {
                console.error(error);
              }
            };
          </script>
        </body>
      </html>
    `;
  return errorContent;
}

app.listen(3000, () => {
  console.log("http://localhost:3000/search/dog");
});
