// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断顶部的显示部分 
    arr: [],
    radio: "1",
    openid: '',
    // 电话的认正
    dianhuay: "",
    geshi: false,
    text: "",
    size: false,
    uid: "",
    imgs: [],
    token:"",
    URL:""
  },
  // 通过事件上传图片
  iamge() {
    var _this = this
    var arr = this.data.arr
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        if (res.tempFilePaths.length <= 6) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            arr.push(res.tempFilePaths[i])
          }
        } else {
          for (var i = 0; i < 6; i++) {
            arr.push(res.tempFilePaths[i])
          }
        }
        // arr.push(res.tempFilePaths[0])
        _this.setData({
          arr: arr
        })
        var tempFilePaths = res.tempFilePaths
        // 上传图片
        if (res.tempFilePaths.length <= 6) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              //上传图片的网路请求地址
              url: ""+ _this.data.URL +"/upload.do",
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                var imgs = _this.data.imgs
                imgs.push(res.data)
                _this.setData({
                  imgs: imgs
                })
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
              url: ""+ _this.data.URL +"/upload.do",
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                var imgs = _this.data.imgs
                imgs.push(res.data)
                _this.setData({
                  imgs: imgs
                })
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
  // 图片的删除
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
  },
  // 文本框的限制
  text(e) {
    this.setData({
      size: true
    })
    this.setData({
      text: e.detail.value
    })
    console.log(e.detail.value)
    // this.setData({text:e.detail.value})
    // if (this.data.text.length < 10){
    //   this.
    // }
  },
  // 最后的发布
  // http://192.168.0.156:8080/jzj-car/pushinsert.do?token=a1b2c3&security=jzjsecurity&uuid=wraasdfdf&nick=1&type=1&tradestyle=1&standard=1
  fabu() {

    // if (this.data.geshi && this.data.size) {
    var _this = this
    if (_this.data.imgs.length <= 6) {
      wx.request({
        url: ''+ _this.data.URL +'/messageUpload.do',
        data: {
          photos: _this.data.imgs,
          phone: _this.data.dianhuay,
          describe: _this.data.text,
          show: _this.data.radio,
          uuid: _this.data.uid,
          token:_this.data.token
        },
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.switchTab({
              url: '../logs/logs',
            })
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            if (res.data.message == "请先绑定手机!") {
              wx.showModal({
                title: '提示',
                content: '请先绑定手机号',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../phone/phone',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
            // wx.showToast({
            //   title: res.data.message,
            //   icon: 'none',
            //   duration: 2000
            // })
          }
        }
      })
    } else {
      wx.showToast({
        title: '只能上传6张图片',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 电话的正则
  change(e) {
    this.setData({
      dianhuay: e.detail.value
    })
    if (this.data.dianhuay != "") {
      if (!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.data.dianhuay))) {
        wx.showToast({
          title: '手机格式不正确',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          geshi: true
        })
      }
    }
  },
  onChange(id) {
    this.setData({
      "radio": id.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this  = this
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        _this.setData({URL:res.data})
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this
    wx.getStorage({
      key: 'open_id',
      success: function(res) {
        _this.setData({
          openid: res.data
        })
      },
    })
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uid: res.data
        })
      },
    }),
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