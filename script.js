// 获取 ".showmore" 和 "hul-u" 元素
const showMoreBtn = document.querySelector(".showmore");
const showLessBtn = document.querySelector(".showless");
const hulU = document.querySelector(".hul-u");
const btn = document.querySelector(".getText");
const Input = document.querySelector(".searchText");
const html = document.querySelector("html");

try {
  // 给 ".showmore" 元素添加点击事件监听器
  showMoreBtn.addEventListener("click", function () {
    // 显示 "hul-u" 元素
    hulU.style.display = "block";
    // 隐藏 ".showmore" 元素并显示 ".showless" 元素
    showMoreBtn.style.display = "none";
    showLessBtn.style.display = "block";
  });
} catch {
  console.log("Error");
}

try {
  // 给 ".showless" 元素添加点击事件监听器
  showLessBtn.addEventListener("click", function () {
    // 隐藏 "hul-u" 元素
    hulU.style.display = "none";
    // 隐藏 ".showless" 元素并显示 ".showmore" 元素
    showLessBtn.style.display = "none";
    showMoreBtn.style.display = "block";
  });
} catch {
  console.log("Error");
}

btn.addEventListener("click", () => {
  const Text = document.querySelector(".searchText").value;
  const url = new URL("../search", location.href);
  //MakeImgShow(Text);

  if (url.hostname.search("local") > 0 || url.hostname.search("local") == 0) {
    window.location.href = "http://" + url.hostname + ":3000/search/" + Text;
  } else {
    window.location.href = "http://" + url.hostname + "/search/" + Text;
  }
  document.querySelector(".searchText").value = "";
  document.querySelector(".searchText").placeholder =
    "請稍等，正在搜尋資料庫...";
});

html.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    btn.click();
  }
});

let swiperImg = []; // 輪播圖選五張
function MakeImgShow(Text) {
  swiperImg = [];

  fetch("https://api.pikwizard.com/api/photo/search", {
    headers: {
      accept: "application/json",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://pikwizard.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `{\"searchterm\":\"${Text}\",\"pagenum\":1,\"size\":96}`,
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      let j = 0;
      let ControlNum = data.length - 13;
      let Random = Math.floor(Math.random() * ControlNum) + 1;

      if (Random < 0) {
        Random = 1;
      }
      console.log(Random);

      for (i = Random; i < Random + 7; i++) {
        let ResponseData = data[i].url_medium;
        if (ResponseData.search("http") < 0) {
          let Reimg = "https://pikwizard.com" + data[i].url_medium;
          swiperImg.push(Reimg);
        } else {
          let Reimg = data[i].url_medium;
          swiperImg.push(Reimg);
        }
      }

      console.log(swiperImg);
      for (i = 0; i < 6; i++) {
        $("<img>")
          .attr("src", swiperImg[i])
          .css("width", "400px")
          .css("height", "225px")
          .css("borderRadius", "1rem")
          .appendTo(".pic");
      }

      document.querySelectorAll("a[amp-access]").forEach(function (res) {
        res.remove();
      });

      $(".xref-title").remove();
      $(".item.lc.lc1.lpb-10.lpr-10").remove();
    })
    .catch((error) => {
      console.error(error);
    });
}
