// pages/jubao/jubao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    str: "",
    size: "疑似诈骗",
    text: "",
    // informer_uuid;// 举报人的uuid
    informer_uuid: "",
    // 被举报人的uuid
    reported_uuid: '',
    radio: "1",
    openid: '',
    // 电话的认正
    dianhuay: "",
    geshi: false,
    uid: "",
    imgs: [],
    token:"",
    URL:""
  },
  onChange(event) {
    console.log(event)
    if (event.detail == 1) {
      this.setData({
        size: '疑似诈骗',
        radio: "1",
      });
    } else if (event.detail == 2) {
      this.setData({
        size: '车辆信息虚假',
        radio: "2",
      });
    } else if (event.detail == 3) {
      this.setData({
        size: "即时信息虚假",
        radio: "3",
      })
    } else if (event.detail == 4) {
      this.setData({
        size: "电话无人接听",
        radio: "4",
      })
    } else if (event.detail == 5) {
      this.setData({
        size: "车俩图片虚假",
        radio: "5",
      })
    } else {
      this.setData({
        size: "其他",
        radio: "6",
      })
    }
    console.log(this.data.size)
  },
  // 文本的复制
  change(e) {
    console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    if (name == 1) {
      this.setData({
        size: '疑似诈骗',
        radio: "1",
      });
    } else if (name == 2) {
      this.setData({
        size: '车辆信息虚假',
        radio: "2",
      });
    } else if (name == 3) {
      this.setData({
        size: "即时信息虚假",
        radio: "3",
      })
    } else if (name == 4) {
      this.setData({
        size: "电话无人接听",
        radio: "4",
      })
    } else if (name == 5) {
      this.setData({
        size: "车俩图片虚假",
        radio: "5",
      })
    } else {
      this.setData({
        size: "其他",
        radio: "6",
      })
    }
    this.setData({
      radio: name
    });
  },
  // 图片的上传
  // 通过事件上传图片
  iamge() {
    var _this = this
    var arr = this.data.arr
    var str = this.data.str
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          arr.push(res.tempFilePaths[i])
        }
        _this.setData({
          str: str
        })
        _this.setData({
          arr: arr
        })
        console.log(_this.data.str)
        // 上传图片
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            //上传图片的网路请求地址
            url: '' + _this.data.URL + '/upload.do',
            //选择
            filePath: res.tempFilePaths[i],
            name: 'files',
            success: function(res) {
              console.log(res.data);
              var arr = _this.data.imgs
              arr.push(res.data)
              for(var i = 0 ; i < arr.length ; i++){
                if( i == 0){
                  str = ""
                }
                str += arr[i] +","
              }
              str = str.substring(0, str.length - 1)
              _this.setData({str:str})
              _this.setData({
                imgs: arr
              })
            },
            fail: function(res) {
              console.log("error");
            }
          });
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
    var str = ""
    arr.splice(a, 1)
    imgs.splice(a, 1)
    for (var i = 0; i < imgs.length ; i++){
      str += imgs[i] + ","
    }
    str = str.substring(0, str.length - 1)
    this.setData({str:str})
    this.setData({
      imgs: imgs
    })
    
    console.log(arr)
    this.setData({
      arr: arr
    })
  },
  // 最后的提交
  tijiao() {
    var _this = this
    wx.request({
      url: '' + _this.data.URL + '/insertInform.do', //仅为示例，并非真实的接口地址
      method:'post',
      data: {
        informer_uuid: _this.data.informer_uuid,
        reported_uuid: _this.data.reported_uuid,
        cause: _this.data.size,
        explain: _this.data.text,
        photos: _this.data.str,
        token:_this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          // wx.navigateBack({
          //   delta: 1
          // })
          wx.navigateTo({
            url: '../juok/juok',
          })
        } else {
          if (res.data.message == "请先绑定手机号，然后再完成举报功能") {
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
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    
    // 举报人的uuid
    var _this = this
    wx.getStorage({
      key: 'URL',
      success: function (res) {
        _this.setData({
          URL: res.data
        })
      },
    })
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        _this.setData({
          informer_uuid: res.data
        })
      },
    })
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({token:res.data})
      },
    })
    _this.setData({
      reported_uuid: options.uuid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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