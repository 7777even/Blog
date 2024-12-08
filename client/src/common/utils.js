//格式化日期：yyyy-MM-dd
export function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}


// 下载图片
export function downloadIamge(url, name) {
  //实例化一个img对象
  const img = new Image();
  //设置img的图片路径
  img.src = url;
  //设置跨域解决
  img.setAttribute("crossOrigin", "Anonymous");
  //img加载完后处理
  img.onload = function () {
    //创建一个canvas对象
    const canvas = document.createElement("canvas");
    //把图片的宽度设为canves的宽度
    canvas.width = img.width;
    //把图片的高度设为canves的高度
    canvas.height = img.height;
    //创建一个2d画布
    const ctx = canvas.getContext("2d");
    // 将img中的内容画到画布上
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // 将画布内容转换为Blob
    canvas.toBlob((blob) => {
      // blob转为同源url
      let blobUrl = window.URL.createObjectURL(blob);
      // 创建a链接
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name;
      // 触发a链接点击事件，浏览器开始下载文件
      a.click();
    });
  };
}





