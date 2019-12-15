// pages/fankui/fankui.js
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    uuid: "",
    input: '',
    imgs: [],
    token:""
  },
  // 通过事件上传图片
  iamge() {
    var _this = this
    var arr = this.data.arr
    var str = this.data.str
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        if (res.tempFilePaths.length <= 6) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            arr.push(res.tempFilePaths[i])
            str += res.tempFilePaths[i]
          }

        } else {
          for (var i = 0; i < 6; i++) {
            arr.push(res.tempFilePaths[i])
            str += res.tempFilePaths[i]
          }

        }
        str = str.substring(0, str.length - 1)
        console.log(str)
        // arr.push(res.tempFilePaths[0])
        _this.setData({
          arr: arr
        })
        console.log(_this.data.arr)
        // 上传图片
        if (_this.data.arr.length <= 6) {
          console.log(_this.data.arr)
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              //上传图片的网路请求地址
              url: '' + _this.data.URL +'/upload.do',
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                console.log(res.data);
                var arr = _this.data.imgs
                arr.push(res.data)
                _this.setData({
                  imgs: arr
                })
                // var ismag = _this.data.imageas
                // ismag.push(res.data)
                // _this.setData({
                //   imageas: ismag
                // })
              },
              fail: function(res) {
                console.log("error");
              }
            });
          }
        } else {
          for (var i = 0; i < 6; i++) {
            wx.uploadFile({
              //上传图片的网路请求地址
              url: '' + _this.data.URL +'/upload.do',
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                console.log(res.data);
                var arr = _this.data.imgs
                arr.push(res.data)
                _this.setData({
                  imgs: arr
                })
                // var ismag = _this.data.imageas
                // ismag.push(res.data)
                // _this.setData({
                //   imageas: ismag
                // })
              },
              fail: function(res) {
                console.log("error");
              }
            });
          }
        }
      }
    })
  },
  input1(e) {
    console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  // 图片信息的删除
  subir(e) {
    console.log(e.currentTarget.dataset.index)
    var a = e.currentTarget.dataset.index
    var arr = this.data.arr
    var imgs = this.data.imgs
    arr.splice(a, 1)
    imgs.splice(a, 1)
    this.setData({
      imgs: imgs
    })
    console.log(arr)
    this.setData({
      arr: arr
    })
    // var arr4 = this.data.imageas
    // arr4.splice(a, 1)
    // console.log(arr)
    // this.setData({
    //   imageas: arr4
    // })
    // console.log(this.data.imageas)
  },
  // 提交事件
  tijiao() {
    var _this = this
    var arr = ""
    console.log(_this.data.imgs)
    for (var i = 0; i < _this.data.imgs.length ; i++ ){
      arr += _this.data.imgs[i] + ","
    }
    arr = arr.substring(0, arr.length - 1)
    console.log(arr)
    if (this.data.input != "") {
      wx.request({
        url: '' + _this.data.URL +'/feedback.do', //仅为示例，并非真实的接口地址
        data: {
          data: _this.data.input,
          uuid: _this.data.uuid,
          photos: arr,
          token:_this.data.token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000,
              // success() {
              //   wx.switchTab({
              //     url: '../my/my',
              //   })
              // }
            })
            clearInterval(timer)
            timer = setInterval(() => {
              wx.switchTab({
                url: '../my/my',
              })
              clearInterval(timer)
            }, 2000)

          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '提交内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
  
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  var _this = this
  wx.getStorage({
    key: 'URL',
    success: function (res) {
      _this.setData({ URL: res.data })
    },
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {
  var _this = this
  wx.getStorage({
    key: 'uuid',
    success: function(res) {
      _this.setData({
        uuid: res.data
      })
    },
  })
  wx.getStorage({
    key: 'token',
    success: function (res) {
      _this.setData({
        token: res.data
      })
    },
  })
},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})