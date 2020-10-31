// miniprogram/pages/addDigest/addDigest.js
Page({

  data: {
    scanResult:{
    charSet: "UTF-8",
    errMsg: "scanCode:ok",
    rawData: "OTc4NzAyMDA5ODA5NQ==",
    result: "9787020098095",
    scanType: "EAN_13",
    },
  },

  onLoad: function() {
    
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'getBook',
    //   // 传给云函数的参数
    //   data: {
    //     ISBN:this.data.scanResult.result
    //   },
    //   success: function (res) {
    //     console.log('success');
    //   },
    //   fail: function(){
    //     console.log('fall')
    //   }
    // })

  },

  onTap: function() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  }

})