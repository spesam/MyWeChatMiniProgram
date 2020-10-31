// miniprogram/pages/list/list.js
function fixZero(num) {
  return num < 10 ? '0' + num : num
}

Page({
  data: {
    list: [],
    showToolbar: false
  },
  onShow(options) {
    this.getData();
  },
  dealData: function (tempList, callback) {
    const list = tempList.slice(0, 49);
    const fileList = [];
    list.forEach(function (item) {
      var date = new Date(item.time);
      item.timeInfo = {
        year: fixZero(date.getFullYear()),
        month: fixZero(date.getMonth() + 1),
        date: fixZero(date.getDate()),
        hours: fixZero(date.getHours()),
        miniutes: fixZero(date.getMinutes())
      }
      fileList.push(item.img);
    });
    wx.cloud.getTempFileURL({
      fileList: fileList,
      success: res => {

        const fileList = res.fileList;
        list.forEach(function (item, index) {
          item.img = fileList[index].tempFileURL;
        })

        callback(list);
      },
      fail: err => {
        console.log(err);
        wx.showToast({
          title: 'err',
        })
      }
    })
  },
  getData: function () {
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'db',
      data: {
        type: 'get'
      },
      success: res => {
        const result = res.result || {};
        // console.log(result)
        this.dealData(result.data, data => {
          this.setData({
            list: data
          });
        });
      },
      fail: function (res) {
        console.log(res);
        console.log('fail')
      }
    })
  },
  //   db.collection('list').get({
  //     success: function(res) {
  //       that.dealData(result.data, function(data) {
  //         that.setData({
  //           list: data
  //         });
  //       });
  //     },
  //   })
  // },

  onToggle: function () {
    this.setData({
      showToolbar: !this.data.showToolbar
    })
  },

  onAddDigest: function () {
    wx.navigateTo({
      url: '/pages/addDigest/addDigest',
    })
  },

  onAddComment: function () {
    wx.navigateTo({
      url: '/pages/addNote/addNote',
    });
  },
  onPlus() {
    wx.navigateTo({
      url: '/pages/addNote/addNote',
    });
  },
  onAddArticle: function () {
    wx.navigateTo({
      url: '/pages/addArticle/addArticle',
    })
  }
})