// pages/Mydynamicz/Mydynamicz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['a', 'b', 'c', "d", "e", "f"],
    result: [],
    token: "",
    uuid: "",
    list1: [],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    page: 2,
    URL: ""
  },
  // 测试
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 刷新
  shuaxin(e) {
    var _this = this;
    console.log(e)
    // updateTime.do
    wx.request({
      url: "" + _this.data.URL + "/updateTime.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        token: _this.data.token,
        uuid: _this.data.uuid,
        idData: e.target.dataset.id,
        flag:1 
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {

          wx.getStorage({
            key: 'uuid',
            success: function(res) {
              console.log(res)
              wx.request({
                url: "" + _this.data.URL + "/selectCarDateValid.do", //仅为示例，并非真实的接口地址
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                  uuid: res.data,
                  page: 1,
                  token: _this.data.token
                },
                success(res) {
                  console.log(res.data.result)
                  if (res.data.code == 1) {
                    var arr = res.data.result.dynamic
                    console.log(arr)
                    _this.setData({
                      list1: arr
                    })
                  } else {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  console.log(_this.data.list1)
                  // _this.setData({ list1: res.data[0].list })
                }
              })
              _this.setData({
                openid: res.data
              })
              console.log(_this.data.openid)
            },
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
    console.log('刷新')

  },
  phone(e) {
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
    // wx.makePhoneCall({
    //   phoneNumber: e.currentTarget.dataset.phone,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        _this.setData({
          URL: res.data
        })
      },
    })
  },
  // 选择的事件
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  // 删除
  shanchu() {
    console.log(this.data.result)
    if (this.data.result.length > 0) {
      var _this = this
      wx.request({
        url: "" + _this.data.URL + "/delMessageById.do",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          uuid: _this.data.uuid,
          token: _this.data.token,
          idData: _this.data.result
        },
        success(res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1000
            })
            wx.getStorage({
              key: 'token',
              success: function(res) {
                wx.request({
                  url: "" + _this.data.URL + "/getRelease.do", //仅为示例，并非真实的接口地址
                  data: {
                    uuid: _this.data.uuid,
                    flag: 1,
                    token: _this.data.token
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success(res) {
                    console.log(res)
                    if (res.data.code == 1) {
                      _this.setData({
                        list1: res.data.result
                      })
                    } else {
                      wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                      })
                      _this.setData({
                        list1: res.data.result
                      })
                    }
                  }
                })
              },
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
      wx.showToast({
        title: '请选择您要删除的信息',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uuid: res.data,
          page: 2
        })
        wx.request({
          url: "" + _this.data.URL + "/selectCarDateValid.do", //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            uuid: res.data,
            page: 1,
            token: _this.data.token
          },
          success(res) {
            console.log(res.data.result)
            if (res.data.code == 1) {
              var arr = res.data.result.dynamic
              console.log(arr)
              _this.setData({
                list1: arr
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
            console.log(_this.data.list1)
            // _this.setData({ list1: res.data[0].list })
          }
        })
        _this.setData({
          openid: res.data
        })
        console.log(_this.data.openid)
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
    var a = this.data.page;
    var _this = this
    wx.request({
      // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
      url: "" + _this.data.URL + "/selectCarDateValid.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        page: _this.data.page,
        token: _this.data.token
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          a++
          _this.setData({
            page: a
          })
          var rult = []
          var arr = _this.data.list1
          for (var i = 0; i < res.data.result.dynamic.length; i++) {
            arr.push(res.data.result.dynamic[i])
          }
          // var arr = res.data.result;
          // for (var i = 0; i < arr.length; i++) {
          //   rult.push(arr[i].id)
          // }
          _this.setData({
            list1: arr
          })
          console.log(arr)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})