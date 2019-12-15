// pages/my/my.js
var timer = null
Page({
  data: {
    user: {},
    text: "未绑定手机号",
    token: "",
    uuid: "",
    code: "",
    average: "5.0",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    URL: "",
    state: false,
    tishi: "",
    geshu: 0
  },
  // 我的评价
  pj() {
    wx.navigateTo({
      url: '../mypj/mypj',
    })
  },
  // 我的发布
  myd() {
    wx.navigateTo({
      url: '../Mydynamic/Mydynamic',
    })
  },
  // 我的动态
  myf() {
    wx.navigateTo({
      url: '../Mydynamicz/Mydynamicz',
    })
  },
  wyyaoqin(){
    wx.navigateTo({
      url:"../myyaoqing/myyaoqing"
    })
  },
  // 绑定手机号
  shoujiphone() {
    wx.navigateTo({
      url: '../phone/phone',
    })
  },
  platform() {
    wx.navigateTo({
      url: '../Platform/Platform',
    })
  },
  yaoqin(){
    wx.navigateTo({
      url: '../yaoqing/yaoqing',
    })
  },
  // 反馈
  fakui() {
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../fankui/fankui',
      })
    }

  },
  // 打电话
  phone(e) {
    console.log(e.currentTarget.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  // 收藏
  collection() {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  // 用户的数据更新
  toux() {
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
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this
    clearInterval(timer)
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res)
        _this.setData({
          user: res.data
        })
      },
    })
    wx.login({
      success: function(res) {
        console.log(res)
        _this.setData({
          code: res.code
        })
      }
    })
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        wx.request({
          url: "" + _this.data.URL + "/getUserPhone.do", //仅为示例，并非真实的接口地址
          data: {
            uuid: res.data,
            token: _this.data.token
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data.result.phone)
            if (res.data.code == 1) {
              _this.setData({
                text: res.data.result.phone,
                average: res.data.result.average
              })
              if (res.data.result.youInvitationCode){
                wx.setStorage({
                  key: 'InCode',
                  data: res.data.result.youInvitationCode,
                })
              }
            }
            console.log(res.data)
          }
        })
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

    wx.request({
      url: "" + _this.data.URL + "/getRemind.do",
      data: {
        uuid: _this.data.uuid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          _this.setData({
            geshu: res.data.data
          })
        }
      }
    })


    wx.request({
      url: "" + _this.data.URL + "/getNoReadCount.do",
      data: {
        userId: _this.data.uuid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          tishi: res.data.count
        })
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onReady()
  },
  chakan() {
    wx.navigateTo({
      url: '../chakan/chakan',
    })
  },
  cgaj(){
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } 
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
    clearInterval(timer)
    timer = null
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

  },

  bindGetUserInfo: function(e) {
    var _this = this;
    console.log(e.detail.userInfo)
    wx.setStorage({
      key: 'user',
      data: e.detail.userInfo,
    })
    wx.login({
      success: function(res) {
        wx.getSetting({
          success(setRes) {
            console.log(setRes)
            // 判断是否已授权
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function(userRes) {
                      console.log(userRes)
                      //发起网络请求
                      wx.request({
                        url: "" + _this.data.URL + "/updateUserData.do",
                        data: {
                          code: res.code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv,
                          nickName: userRes.userInfo.nickName,
                          avatarURL: userRes.userInfo.avatarUrl
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        method: 'POST',
                        //服务端的回掉
                        success: function(result) {
                          console.log(result)
                          var data = result.data.result;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              //获取用户信息
              wx.getUserInfo({
                lang: "zh_CN",
                success: function(userRes) {
                  console.log(userRes)
                  //发起网络请求
                  wx.request({
                    url: "" + _this.data.URL + "/updateUserData.do",
                    data: {
                      code: res.code,
                      encryptedData: userRes.encryptedData,
                      iv: userRes.iv,
                      nickName: userRes.userInfo.nickName,
                      avatarURL: userRes.userInfo.avatarUrl,
                      uuid: _this.data.uuid
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    method: 'POST',
                    success: function(result) {
                      console.log(result)
                      wx.setStorage({
                        key: 'token',
                        data: result.data.result.token,
                      })
                      wx.setStorage({
                        key: 'uuid',
                        data: result.data.result.uuid,
                      })
                      wx.setStorage({
                        key: 'user',
                        data: result.data.result,
                      })


                      var data = result.data.result;
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.showModal({
        content: "更新成功",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          console.log(res)
        }
      })
    }
  },
})