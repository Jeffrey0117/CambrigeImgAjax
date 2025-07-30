# CambrigeImgAjax
這是一個查單字的網頁，透過 nodeJS 的 express 架起來的。

[用render部署](https://cambrigeimgajax.onrender.com/search/dog)

## 效果:
![](https://i.imgur.com/Nbf9zG6.jpg)
## 功能介紹:

輸入英文單字後，會幫你丟到劍橋線上字典查詢，並且使用免費圖庫的 API 叫出六張以上的圖片。<br>
也就是一邊讓你學單字的中文意思、又有圖片可以看。
![](https://i.imgur.com/RhQgUCI.jpg)
![](https://i.imgur.com/tCG0ow1.jpg)
![](https://i.imgur.com/ywvEGP3.png)

每次重新整理如果圖庫資料夠，會隨機顯示不同的圖片哦！<br>
找不到單字會很幽默地顯示error的單字。

## 使用方法:
先在電腦安裝nodeJS，自己調整好node的環境設定。<br>
整包下載回去然後執行node node.js這一個，就可以在本機上看到網頁了！<br>
你也可以架起來給人家用XD，推薦nrgok唷。<br>

## 套件運用
```
const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const { escape } = require("lodash"); // 引入 lodash 中的 escape 函数
```

## 程式觀念

express建立伺服器、axios發送請求、JSDOM操縱元素、header瀏覽器標頭檔、ES6模板字符運用、lodash過濾非法字元
