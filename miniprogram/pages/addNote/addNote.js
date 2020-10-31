// miniprogram/pages/addComment/addComment.js
Page({
  data: {
    showAddBtn: true,
    form: {
      img: '',
      comment: ''
    }
  },

  uploadImg() {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(res);
        this.setData({
          showAddBtn: false,
          // 这样的语法也行 'form.img': res.tempFilePaths[0],
          form: {
            ...this.data.form,
            img: res.tempFilePaths[0],
          }
        });
      }
    })
  },
  onInput: function (event) {
    this.setData({
      'form.comment': event.detail.value
    });
  },
  addToDB: function (fildID) {
    var db = wx.cloud.database();
    var form = this.data.form;
    wx.cloud.callFunction({
      name: 'db',
      data: {
        img: fildID,
        comment: form.comment,
        type: 'add'
      },
      success: function (res) {
        console.log('新增数据成功');
        wx.hideLoading()
        wx.navigateBack({
          url: '/pages/list/list'
        })
        // setTimeout(function () {
        //   wx.hideLoading()
        //   wx.navigateBack({
        //     url: '/pages/list/list'
        //   })
        // })
      },
      fail: function () {
        console.log('新增数据调用云函数失败')
      }
    })
  },
  //   db.collection('list').add({
  //     // data 字段表示需新增的 JSON 数据
  //     data: {
  //       img: fildID,
  //       comment: form.comment,
  //       time:Date.now()
  //     },
  //     success:function(res){
  //     console.log('success')
  //     wx.showToast({
  //       title: '保存成功',
  //     })
  //     setTimeout(function(){
  //       wx.navigateBack({
  //         url:'/pages/list/list'
  //       })
  //     },1000)
  //     },
  //     fail:function(res){
  //       console.log('fail');
  //     }
  //   })
  // },

  onSave() {
    var form = this.data.form;
    wx.showLoading({
      title: '保存中',
      mask: true
    });
    if (!form.img || !form.comment) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    var cloudPath = Date.now() + form.img.match(/\.[^.]+?$/)[0];
    console.log(cloudPath,form.img);
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: form.img,
      success: res => {
        console.log(res);
        this.addToDB(res.fileID)
      },
      fail: function () { }
    })

    // this.setData({
    //   form: {
    //     img: '',
    //     comment: ''
    //   }
    // })
  }
})