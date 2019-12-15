//app.js
App({
  onLaunch: function() {
    wx.setStorage({
      key: 'URL',
      // data: 'https://www.zzjzj.net/zzjzj',
      data:"https://www.zzjzj.net"
    })
    wx.setStorage({
      key: 'huodong',
      data: 'false',
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // 调用登录接口，获取 code
    wx.login({
      success: function(res) {
        // 开发者可以使用 wx.getSetting 获取用户当前的授权状态
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
                        url: "http://192.168.0.148:8080/zzjzj/registdate.do",
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
                          wx.setStorage({
                            key: 'count',
                            data: '0',
                          })
                          var data = result.data.result;
                          // data.expireTime = nowDate + EXPIRETIME;
                          // wx.setStorageSync("userInfo", data);
                          // userInfo = data;
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
                    url: "http://192.168.0.148:8080/zzjzj/registdate.do",
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

                      wx.getStorage({
                        key: 'count',
                        success: function(res) {
                          console.log(res)
                        },
                        fail: function(res) {
                          wx.setStorage({
                            key: 'count',
                            data: '0',
                          })
                        }
                      })

                      wx.setStorage({
                        key: 'token',
                        data: result.data.result.token,
                      })
                      wx.setStorage({
                        key: 'uuid',
                        data: result.data.result.uuid,
                      })
                      wx.setStorage({
                        key: 'myInvitationCode',
                        data: result.data.result.myInvitationCode,
                      })
                      var data = result.data.result;
                      // data.expireTime = nowDate + EXPIRETIME;
                      // wx.setStorageSync("userInfo", data);
                      // userInfo = data;
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           console.log(res)
    //           wx.setStorage({
    //             key: 'user',
    //             data: res.userInfo,
    //           })
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // 小程序的  版本更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  },
  // onHide: function () {
  //   let pages = getCurrentPages();
  //   if (pages['0'].route == 'pages/index/index') {
  //     // wx.redirectTo({
  //     //   url: '需要跳转到的页面'
  //     // })
  //     wx.setStorage({
  //       key: 'huodong',
  //       data: 'false',
  //     })
  //     console.log(111)
  //   }
  // },
  globalData: {
    userInfo: null
  }
})