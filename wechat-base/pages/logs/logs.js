//logs.js
// pages/dynamicrelease/dynamicrelease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ['../../img/banner11.png', '../../img/banner12.png', '../../img/banner13.png', '../../img/banner4.jpg'],
    text: "",
    bool: false,
    imgurl: ['../../img/banner11.png', '../../img/banner12.png', '../../img/banner13.png', '../../img/banner4.jpg'],
    fangurl: "",
    show: false,
    fabugai: false,
    fenye: 2,
    index1: 0,
    ballBottom: 8,
    ballRight: 16,
    screenHeight: 0,
    screenWidth: 0,
    uuid: "",
    list: [],
    describe: "",
    token: "",
    URL: "https://www.zzjzj.net/zzjzj"
  },
  // 卡片轮播的事件
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 图片的放大
  fang(e) {
    // wx.previewImage({
    //   current: '0'. //打开预览时要显示图片的地址。
    //   urls:, //需要预览的图片的地址数组。       
    // })
    // var temp = []
    // for (var index in e.currentTarget.dataset.url.list) {
    //   temp = temp.concat(app.globalData.SERVER_HOST + e.currentTarget.dataset.url.list[index]);
    // }
    console.log(e.currentTarget.dataset.url.list)
    wx.previewImage({
      current: 0,
      urls: e.currentTarget.dataset.url.list,
    })

  },
  sendMsgTap() {
    this.cha()
  },
  // 被拖动的事件
  ballMoveEvent: function(e) {
    wx.stopPullDownRefresh();
    console.log('我被拖动了....')
    console.log(e)
    var touchs = e.touches[0];
    var clientX = Math.abs(touchs.clientX)
    var clientY = Math.abs(touchs.clientY);
    console.log('clientX: ' + clientX)
    console.log('clientY: ' + clientY)
    //防止坐标越界,view宽高的一般
    if (clientX < 30) return;
    if (clientX > this.data.screenWidth - 30) return;
    if (this.data.screenHeight - clientY <= 30) return;
    if (clientY <= 30) return

    //这里用right和bottom.所以需要将pageX pageY转换
    var x = this.data.screenWidth - clientX - 30;
    var y = this.data.screenHeight - clientY - 30;
    console.log('x: ' + x)
    console.log('y: ' + y)
    wx.setStorage({
      key: 'clientx',
      data: x,
    })
    wx.setStorage({
      key: 'clienty',
      data: y,
    })
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  },
  // 动态的发布
  fabu() {
    this.setData({
      fabugai: true
    })
  },
  // 打电话
  phone(e) {
    console.log(e.currentTarget.dataset.phone.indexOf("*"))
    // if (this.data.uuid == "") {
    //   wx.showToast({
    //     title: '你的账号已被禁用',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // } else {
      console.log('1')
      if (e.currentTarget.dataset.phone.indexOf("*") > 0) {
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
        wx.showModal({
          title: '提示',
          content: '请核实对方信息,谨防上当受骗',
          success(res) {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
  },
  // 车辆发布
  fabu1() {
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../release/release'
      })
    }

    this.setData({
      fabugai: false
    })
  },
  dyfabu() {
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../dynamicrelease/dynamicrelease',
      })
    }

    this.setData({
      fabugai: false
    })
  },
  onClose() {
    this.setData({
      fabugai: false
    })
    this.setData({
      show: false,
      index1: 0
    })
  },
  carSearch(e) {
    var _this = this
    this.setData({
      text: e.detail.value,
      fenye: 2
    })
    // console.log(this.data.text)

  },
  // 搜索查询  http://192.168.0.156:8080/jzj-car/getinformList.do?token=a1b2c3&security=jzjsecurity&queryString

  cha() {
    this.setData({
      // text: e.detail.value,
      fenye: 2
    })
    var _this = this;
    wx.request({
      url: '' + _this.data.URL + '/messageSearch.do',
      method: "post",
      data: {
        describe: _this.data.text,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          _this.setData({
            list: res.data.result
          })
          wx.showToast({
            title: '已将数据展示在当前页面',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        _this.setData({
          URL: res.data
        })
      },
    })
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
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res, 1)
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      },
      fail: function(res) {
        console.log(res)
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      fenye: 2
    })
    var _this = this;
    wx.getStorage({
      key: 'clientx',
      success: function(res) {
        _this.setData({
          ballRight: res.data
        })
      },
    })
    wx.getStorage({
      key: 'clienty',
      success: function(res) {
        _this.setData({
          ballBottom: res.data
        })
      },
    })
    wx.request({
      url: '' + _this.data.URL + '/messageHomePage.do',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        if (res.data.code == 1) {
          var arr = res.data.result
          console.log(arr.length)
          console.log(arr)
          _this.setData({
            list: arr
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
        // console.log(res)

        // console.log(res.data[0].list[0]) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.onReady()
    this.onLoad()
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
    this.setData({
      fenye: 2
    })
    var _this = this;
    console.log(1)
    wx.request({
      url: '' + _this.data.URL + '/messageHomePage.do',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        if (res.data.code == 1) {
          var arr = res.data.result
          console.log(arr.length)
          // for (var i = 0; i < arr.length; i++) {
          //   console.log(i)
          //   news.push(arr[i])
          // }
          console.log(arr)
          _this.setData({
            list: arr
          })
          wx.stopPullDownRefresh();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
        console.log(res)
        // _this.setData({ list: res.data[0].list})
        // console.log(res.data[0].list[0]) 
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var _this = this
    console.log(1)
    // var a = _this.data.fenye;
    // a++;
    // _this.setData({
    //   fenye: a
    // })
    var news = this.data.list
    if (this.data.text != "") {
      wx.request({
        url: '' + _this.data.URL + '/messageSearch.do',
        method: "post",
        data: {
          page: _this.data.fenye,
          describe: _this.data.text,
          uuid: _this.data.uuid,
          token: _this.data.token,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            var a = _this.data.fenye;
            a++;
            _this.setData({
              fenye: a
            })
            var arr = res.data.result
            console.log(arr.length)

            for (var i = 0; i < arr.length; i++) {
              console.log(i)
              news.push(arr[i])
            }
            console.log(arr)
            _this.setData({
              list: news
            })
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
      wx.request({
        url: '' + _this.data.URL + '/messageHomePage.do',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          page: _this.data.fenye,
          uuid: _this.data.uuid,
          token: _this.data.token
        },
        success(res) {
          if (res.data.code == 1) {
            var a = _this.data.fenye;
            a++;
            _this.setData({
              fenye: a
            })
            var arr = res.data.result
            console.log(arr.length)

            for (var i = 0; i < arr.length; i++) {
              console.log(i)
              news.push(arr[i])
              // // {{ item.phone.substr(0,3)+'******'+item.phone.substr(8) }}
              // console.log((arr[i].phone).substr(0, 3) + '******' + (arr[i].phone).substr(8))
              // arr[i].jie = arr[i].phone.substr(0, 3) + '******' + arr[i].phone.substr(8)
            }
            console.log(arr)
            _this.setData({
              list: news
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
          console.log(res)

          // console.log(res.data[0].list[0]) 
        }
      })
    }
  },
  // 监听滚动条
  // 点击回到顶部
  top0(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function(e) {
    if (e.scrollTop > 200) {
      // console.log(e)
      this.setData({
        bool: true
      })
    } else {
      this.setData({
        bool: false
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: '捷友联工程信息平台',
      path: 'pages/index1/index1',
      success: function(res) {
        console.log(res)
      }
    }
  },
})