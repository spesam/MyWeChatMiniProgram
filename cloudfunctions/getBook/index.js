// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// var request = require('request')

// cloud.init()

// // 云函数入口函数
// exports.main = async(event, context) => {
//   const wxContext = cloud.getWXContext()
//   return new Promise(function(resolve, reject) {
//     wx.request({
//         url: 'http://feedback.api.juhe.cn/ISBN?sub=' + event.ISBN,
//       }),
//       function(err, response, body) {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(body);
//       }
//   })
// }