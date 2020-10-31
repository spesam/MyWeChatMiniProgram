// miniprogram/pages/CommentDetail/CommentDetail.js
const db = wx.cloud.database()
const _ = db.command
Page({
  query: function () {
    console.log('query')
    db.collection('list')
      .get().then(console.log)
  }
})