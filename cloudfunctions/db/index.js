// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()

function add(event, context) {
  return new Promise(function(resolve, reject) {
    db.collection('list').add({
      data: {
        img: event.img,
        comment: event.comment,
        time: Date.now(),
        openid: event.userInfo.openId
      },
      success: function(res) {
        console.log("这里新加了一张图片")
        resolve(res);
        console.log("这里还会运行吗？")
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}

function getData(event, context) {
  return db.collection('list').where({
    openid:event.userInfo.openId
  }).get()
}


exports.main = async(event, context) => {
  console.log(event,context);
  if (event.type === 'add') {
    return add(event, context);
  }
  return getData(event, context);
}