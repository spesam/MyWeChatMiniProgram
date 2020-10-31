// 云函数入口文件
const cloud = require('wx-server-sdk')
var db = cloud.database()
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
    // const wxContext = cloud.getWXContext()

    // return db.collection('list').where({
    //   openid: event.userInfo.openId
    // }).get();

    // return new Promise(function(resolve, reject) {

    //     db.collection('list').get({
    //       success: function(res) {
    //         resolve(res)
    //         console.log('success')
    //         console.log(res)
    //         wx.showToast({
    //           title: '保存成功',
    //         })
    //       },
    //       fail: function(err) {
    //         reject(err);
    //       }
    //     });
    // });
    return
}