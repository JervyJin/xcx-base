//index.js
//获取应用实例
const app = getApp()
var timer = null
Page({
  data: {
    motto: '捷友联工程信息平台',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    checked: true,
    URL:"https://www.zzjzj.net"
  },
  xieyi(){
    wx.navigateTo({
      url: '../xieyi/xieyi',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    })
  },
  // 授权的没有勾选
  shouquan(){
    wx.showToast({
      title: '请先阅读并同意用户协议',
      icon: 'none',
      duration: 2000
    })
  },
  onLoad: function() {
    var _this = this
    // wx.setStorage({
    //   key: 'URL',
    //   data: 'https://www.zzjzj.net/zzjzj',
    // })
    var user = null;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        if (res.data.nickName) {
          wx.switchTab({
            url: '../index/index',
          })
        }
      },
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindGetUserInfo: function(e) {
    var _this = this
    var that = this;
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
                        url: ""+ _this.data.URL + "/registdate.do",
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
                    url: ""+ _this.data.URL +"/registdate.do",
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
                    success: function(result) {
                      console.log(result)
                      wx.setStorage({
                        key: 'token',
                        data: result.data.result.token,
                      })
                      wx.setStorage({
                        key: 'myInvitationCode',
                        data: result.data.result.myInvitationCode,
                      })
                      wx.setStorage({
                        key: 'uuid',
                        data: result.data.result.uuid,
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
        content: "授权成功",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          
          timer = setInterval(()=>{
            wx.switchTab({
              url: '../index/index',
            })
            clearInterval(timer)
          },1000)
        }
      })
    } else {
      wx.showModal({
        content: "您已拒绝授权",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          that.setData({
            showModal2: false
          });
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})