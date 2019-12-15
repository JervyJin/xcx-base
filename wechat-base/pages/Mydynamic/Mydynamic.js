// pages/Mydynamic/Mydynamic.js
import request from '../../request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    result: [],
    requesty: "",
    list1: [],
    uuid: "",
    token: "",
    list22: "",
    page: 2,
    URL:""
  },
  // 选择的事件
  onChange(event) {
    console.log(event)
    this.setData({
      result: event.detail
    });
  },
  // 从新发布的接口
  newfa(e) {
    var _this = this
    console.log('uuid:' + e.currentTarget.dataset.uuid, 'id:' + e.currentTarget.dataset.id)
    wx.request({
      url: ''+ _this.data.URL +'/selectDataById.do',
      data: {
        id: e.currentTarget.dataset.id,
        token:_this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.request({
            // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
            url: ""+ _this.data.URL +"/selectCarDateValid.do",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              uuid: _this.data.uuid,
              page: 1
            },
            success(res) {
              console.log(res)
              if (res.data.code == 1) {
                var rult = []
                var arr = []
                for (var i = 0; i < res.data.result.Valid.length; i++) {
                  rult.push(res.data.result.Valid[i].id)
                  arr.push(res.data.result.Valid[i])
                }
                if (res.data.result.InValid.length > 0) {
                  for (var i = 0; i < res.data.result.InValid.length; i++) {
                    rult.push(res.data.result.InValid[i].id)
                    arr.push(res.data.result.InValid[i])
                  }
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
              console.log(_this.data.list1)
            }
          })
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    // 从新发布  
  },
  newfa1(e){
    console.log(e.target.dataset.id)
    var _this = this;
    console.log(_this.data.result)
    var str = ""
    for (var i = 0; i < _this.data.result.length; i++) {
      str += _this.data.result[i] + ","
    }
    str.substring(0, str.length - 1)
    this.setData({
      list22: str
    })
    console.log(str)
    wx.request({
      url: ""+ _this.data.URL +"/updateTime.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        token: _this.data.token,
        uuid: _this.data.uuid,
        idData: e.target.dataset.id,
        flag: 0
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000
        })
        wx.getStorage({
          key: 'uuid',
          success: function (res) {
            console.log(res)
            wx.request({
              url: ""+ _this.data.URL +"/selectCarDateValid.do", //仅为示例，并非真实的接口地址
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                uuid: res.data,
                page: 1
              },
              success(res) {
                console.log(res)
                if (res.data.code == 1) {
                  var rult = []
                  var arr = []
                  for (var i = 0; i < res.data.result.Valid.length; i++) {
                    rult.push(res.data.result.Valid[i].id)
                    arr.push(res.data.result.Valid[i])
                  }
                  if (res.data.result.InValid.length > 0) {
                    for (var i = 0; i < res.data.result.InValid.length; i++) {
                      rult.push(res.data.result.InValid[i].id)
                      arr.push(res.data.result.InValid[i])
                    }
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
                  _this.setData({
                    list1: res.data.result
                  })
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
                console.log(_this.data.list1)
              }
            })
            _this.setData({
              openid: res.data
            })
            console.log(_this.data.openid)
          },
        })
      }
    })
  },
  // 修改的页面
  xiugai(e) {
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.viod == 0) {
      wx.navigateTo({
        url: "../xiugai/xiugai?id=" + e.currentTarget.dataset.id + "&uuid=" + e.currentTarget.dataset.uuid + "",
      })
    } else {
      wx.showToast({
        title: '信息已失效',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.setData({
      page: 2
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        _this.setData({
          token: res.data
        })
      },
    })
    wx.getStorage({
      key: 'URL',
      success: function (res) {
        _this.setData({
          URL: res.data
        })
      },
    })
    // http://192.168.0.119:8080/zzjzj/selectCarDateValid.do 
    wx.getStorage({
      key: 'uuid',
      success: function (res) {
        _this.setData({
          uuid: res.data
        })
        console.log(res)
        wx.request({
          // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
          url: ""+ _this.data.URL +"/selectCarDateValid.do",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            uuid: res.data,
            token:_this.data.token
          },
          success(res) {
            console.log(res)
            if (res.data.code == 1) {
              var rult = []
              var arr = []
              for (var i = 0; i < res.data.result.Valid.length; i++) {
                rult.push(res.data.result.Valid[i].id)
                arr.push(res.data.result.Valid[i])
              }
              if (res.data.result.InValid.length > 0) {
                for (var i = 0; i < res.data.result.InValid.length; i++) {
                  rult.push(res.data.result.InValid[i].id)
                  arr.push(res.data.result.InValid[i])
                }
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
            console.log(_this.data.list1)
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },
  //  删除  http://192.168.0.156:8080/jzj-car/deletepush.do?token=a1b2c3&security=jzjsecurity&chockboxes
  shanchu() {
    if (this.data.result.length > 0) {
      var _this = this;
      console.log(_this.data.result)
      var str = ""
      for (var i = 0; i < _this.data.result.length; i++) {
        str += _this.data.result[i] + ","
      }
      str.substring(0, str.length - 1)
      this.setData({
        list22: str
      })
      console.log(str)
      wx.request({
        url: ""+ _this.data.URL +"/delCarById.do",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: _this.data.token,
          uuid: _this.data.uuid,
          idData: _this.data.result,
        },
        success(res) {
          _this.setData({
            result: []
          })
          console.log(res)
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000
          })
          wx.getStorage({
            key: 'uuid',
            success: function(res) {
              console.log(res)
              wx.request({
                url: ""+ _this.data.URL +"/selectCarDateValid.do", //仅为示例，并非真实的接口地址
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                  uuid: res.data,
                  page: 1,
                  token:_this.data.token
                },
                success(res) {
                  console.log(res)
                  if (res.data.code == 1) {
                    var rult = []
                    var arr = []
                    for (var i = 0; i < res.data.result.Valid.length; i++) {
                      rult.push(res.data.result.Valid[i].id)
                      arr.push(res.data.result.Valid[i])
                    }
                    if (res.data.result.InValid.length > 0) {
                      for (var i = 0; i < res.data.result.InValid.length; i++) {
                        rult.push(res.data.result.InValid[i].id)
                        arr.push(res.data.result.InValid[i])
                      }
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
                    _this.setData({
                      list1: res.data.result
                    })
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  console.log(_this.data.list1)
                }
              })
              _this.setData({
                openid: res.data
              })
              console.log(_this.data.openid)
            },
          })
        }
      })
    }else {
      wx.showToast({
        title: '请选择您要删除的信息',
        icon: 'none',
        duration: 2000
      })
    }

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onReady()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.page)
    var a = this.data.page;
    var _this = this
    wx.request({
      // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
      url: ""+ _this.data.URL +"/selectCarDateValid.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        page: _this.data.page,
        token:_this.data.token
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
          for (var i = 0; i < res.data.result.Valid.length; i++) {
            rult.push(res.data.result.Valid[i].id)
            arr.push(res.data.result.Valid[i])
          }
          if (res.data.result.InValid.length > 0) {
            for (var i = 0; i < res.data.result.InValid.length; i++) {
              rult.push(res.data.result.InValid[i].id)
              arr.push(res.data.result.InValid[i])
            }
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