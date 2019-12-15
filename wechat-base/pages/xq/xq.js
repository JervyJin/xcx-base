// pages/xq/xq.js
import request from "../../request"

var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    list: [],
    show: false,
    id: "",
    pingjia: false,
    value: 5,
    name_focus: false,
    user: {},
    text: "",
    conmont: "",
    huifuu: {},
    weizhiid: 74,
    index: 0,
    shuqu: true,
    name_focus1: false,
    index1: 0,
    token: "",
    URL: "",
    text: "\n",
    hua:0
  },
  // 评论的消失
  hhh() {
    console.log(1)
    this.setData({
      name_focus: false,
      text: "",
      conmont: ""
    })
  },
  // 图片的放大展示

  click1(e) {
    console.log(e)
    wx.previewImage({
      current: 0,
      urls: e.currentTarget.dataset.url,
    })
  },
  // 评论的取消
  quxiao() {
    this.setData({
      show: false
    })
  },
  shoucang() {
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/saveEnshrine.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        createBy: _this.data.uuid,
        type: 0,
        enshrineId: _this.data.list.car.id,
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          _this.onReady()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          _this.onReady()
        }
      }
    })
    // 收藏
  },
  // 评分的关闭
  click() {
    this.setData({
      pingjia: false
    })
    this.setData({
      text: "",
      conmont: ""
    })
  },
  // 星星的个数
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  youok() {
    console.log("2")
    this.setData({
      show: false
    })
  },
  // 评论的打开
  ping() {
    // this.setData({show:true})
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 页面的 举报
  jubao(e) {
    console.log(e.currentTarget.dataset.uuid)
    wx.navigateTo({
      url: '../jubao/jubao?uuid=' + e.currentTarget.dataset.uuid,
    })
  },
  // 关闭遮罩层
  onClose() {
    this.setData({
      show: false
    })
  },
  // 分享
  share() {

    // console.log(1)
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
  },
  dianhua(e) {
    // if (this.data.uuid == "") {
    //   wx.showToast({
    //     title: '您还没有授权，将跳转至授权页面',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   clearInterval(timer)
    //   timer = setInterval(() => {
    //     wx.navigateTo({
    //       url: '../index1/index1',
    //     })
    //     clearInterval(timer)
    //   }, 2000)

    // } else 
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
    // wx.showModal({
    //   title: '提示',
    //   content: '请核实对方信息,谨防上当受骗',
    //   success(res) {
    //     if (res.confirm) {
    //       wx.makePhoneCall({
    //         phoneNumber: e.currentTarget.dataset.phone,
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  input(e) {
    console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },
  conmont(e) {
    console.log(e)
    this.setData({
      conmont: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
      fail: function() {
        wx.navigateTo({
          url: '../index1/index1',
        })
      }
    })
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        _this.setData({
          URL: res.data
        })
      },
    })
    console.log(options)
    this.setData({
      id: options.id,
      hua:options.hua
    })
    this.setData({
      uuid: options.uuid
    })
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
      key: 'user',
      success: function(res) {
        _this.setData({
          user: res.data
        })
      },
    })

    // wx.request({
    //   url: "" + _this.data.URL + "/login.do",
    //   method: "post",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   data: {
    //     uuid: _this.data.uuid,
    //     token: _this.data.token,
    //   },
    //   success(res) {
    //     if (res.data.code == 0) {
    //       wx.clearStorage()
    //       wx.navigateTo({
    //         url: '../index1/index1',
    //       })
    //     } else {
    //       wx.setStorage({
    //         key: 'token',
    //         data: res.data.result.token,
    //       })
    //       wx.setStorage({
    //         key: 'uuid',
    //         data: res.data.result.uuid,
    //       })
    //     }
    //   }
    // })
  },
  // 评价 的 页面出现
  pingjia() {
    console.log("评价")
    if (this.data.uuid == "") {
      wx.showToast({
        title: '您还没有授权，将跳转至授权页面',
        icon: 'none',
        duration: 2000
      })
      clearInterval(timer)
      timer = setInterval(() => {
        wx.navigateTo({
          url: '../index1/index1',
        })
        clearInterval(timer)
      }, 2000)

    } else {
      this.setData({
        pingjia: true
      })
    }

  },
  onClose() {
    this.setData({
      pingjia: false
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(request)
    var _this = this

    wx.request({
      url: "" + _this.data.URL + "/selCarDataById.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        id: _this.data.id
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          _this.setData({
            list: res.data.result
          })
          if (_this.data.hua == 1) {
            _this.pageScrollToBottom()
          }

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
  // 回复评论的发送事件
  fasogn(e) {
    var _this = this
    var shuju = this.data.list
    var shuju1 = this.data.huifuu
    console.log(shuju1, shuju, shuju.comment[_this.data.index].promulgatorNickName, )
    console.log("我要评论")
    wx.request({
      url: "" + _this.data.URL + "/postComment.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        carDataId: shuju.car.id,
        promulgatorUuid: _this.data.uuid,
        promulgatorNickName: _this.data.user.nickName,
        promulgatorAvatarURL: _this.data.user.avatarUrl,
        commentContent: _this.data.conmont,
        accepterUserUuid: shuju.comment[_this.data.index].promulgatorUuid,
        accepterUserNickName: shuju.comment[_this.data.index].promulgatorNickName,
        accepterUserAvatarURL: shuju.comment[_this.data.index].promulgatorAvatarURL,
        grade: 1,
        fatherId: _this.data.weizhiid.comment[_this.data.index].id
      },
      success(res) {
        if (res.data.code == 1) {
          console.log(res)
          _this.setData({
            conmont: ""
          })
          _this.blur1()
          wx.request({
            url: "" + _this.data.URL + "/selCarDataById.do",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              uuid: _this.data.uuid,
              id: _this.data.id
            },
            success(res) {
              console.log(res)
              _this.setData({
                list: res.data.result
              })
            }
          })
        } else {
          if (res.data.message == "请先绑定手机号") {
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
        // _this.setData({ list: res.data.result })
      }
    })
    this.setData({
      name_focus: false,
      name_focus1: false
    })
  },
  // 二级回复的事件
  huifu2(e) {
    var _this = this
    var shuju = this.data.list
    var shuju1 = this.data.huifuu
    console.log(this.data)
    console.log(shuju1, shuju, shuju.comment[_this.data.index].comments[_this.data.index1].promulgatorNickName)
    console.log("我要评论")
    wx.request({
      url: "" + _this.data.URL + "/postComment.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        carDataId: shuju.car.id,
        promulgatorUuid: _this.data.uuid,
        promulgatorNickName: _this.data.user.nickName,
        promulgatorAvatarURL: _this.data.user.avatarUrl,
        commentContent: _this.data.conmont,
        accepterUserUuid: shuju.comment[_this.data.index].comments[_this.data.index1].promulgatorUuid,
        accepterUserNickName: shuju.comment[_this.data.index].comments[_this.data.index1].promulgatorNickName,
        accepterUserAvatarURL: shuju.comment[_this.data.index].comments[_this.data.index1].promulgatorAvatarURL,
        grade: 1,
        fatherId: _this.data.weizhiid.comment[_this.data.index].id
      },
      success(res) {
        if (res.data.code == 1) {
          console.log(res)
          _this.setData({
            conmont: ""
          })
          _this.blur1()
          wx.request({
            url: "" + _this.data.URL + "/selCarDataById.do",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              uuid: _this.data.uuid,
              id: _this.data.id
            },
            success(res) {
              console.log(res)
              _this.setData({
                list: res.data.result
              })
            }
          })
        } else {
          if (res.data.message == "请先绑定手机号") {
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
        // _this.setData({ list: res.data.result })
      }
    })
    this.setData({
      name_focus: false,
      name_focus1: false
    })
  },


  iody(e) {
    console.log(e)
    this.setData({
      index: e.currentTarget.dataset.index,
      index1: e.target.dataset.index
    })

  },
  // 回复评论
  huifu(e) {
    console.log(e)
    var _this = this
    // console.log(e.currentTarget.dataset.huifu.id)
    this.setData({
      weizhiid: e.currentTarget.dataset.iod
    })
    // this.setData({ weizhiid: e.currentTarget.dataset.huifu.id})
    this.setData({
      huifuu: e.target.dataset.huifu
    })
    this.setData({
      name_focus: true
    })
    console.log(_this.data.weizhiid.comment[_this.data.index].id)
  },
  // 二级回复的回复按钮
  huifu1(e) {
    console.log(e)
    var _this = this
    // console.log(e.currentTarget.dataset.huifu.id)
    this.setData({
      weizhiid: e.currentTarget.dataset.iod
    })
    // this.setData({ weizhiid: e.currentTarget.dataset.huifu.id})
    this.setData({
      huifuu: e.target.dataset.huifu
    })
    this.setData({
      name_focus1: true
    })
    console.log(_this.data.weizhiid.comment[_this.data.index].id)
  },
  blur1() {
    this.setData({
      name_focus: false
    })
    console.log("失去焦点")
  },
  // 失去焦点的时候
  shuqu() {
    this.setData({
      shuqu: false
    })
  },
  shuqufa() {
    this.setData({
      shuqu: true
    })
  },
  // 评论删除的接口
  shanchu(e) {
    var _this = this;
    console.log(e.target.dataset.shan.promulgatorUuid, e.target.dataset.shan.id)
    var shuju = this.data.list
    console.log(1)
    // http://192.168.0.162:8080/zzjzj/delComment.do
    wx.request({
      url: '' + _this.data.URL + '/delComment.do',
      // url: "http://192.168.0.148:8080/zzjzj/delComment.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        // carDataId: shuju.car.id,
        promulgatorUuid: _this.data.uuid,
        id: e.target.dataset.shan.id
      },
      success(res) {
        if (res.data.code == 1) {
          wx.request({
            url: "" + _this.data.URL + "/selCarDataById.do",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              uuid: _this.data.uuid,
              id: _this.data.id
            },
            success(res) {
              console.log(res)
              _this.setData({
                list: res.data.result
              })
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
    })

  },
  // 评价的 提交
  tijao1() {
    var _this = this
    var shuju = this.data.list
    var shuju1 = this.data.huifuu
    console.log(shuju)
    wx.request({
      url: "" + _this.data.URL + "/postComment.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        carDataId: shuju.car.id,
        promulgatorUuid: _this.data.uuid,
        promulgatorNickName: _this.data.user.nickName,
        promulgatorAvatarURL: _this.data.user.avatarUrl,
        commentContent: _this.data.text,
        accepterUserUuid: shuju.car.uuid,
        accepterUserNickName: shuju.car.nickName,
        accepterUserAvatarURL: shuju.car.avatarURL,
        grade: 0,
        estimate: _this.data.value
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          _this.setData({
            text: ""
          })
          wx.request({
            url: "" + _this.data.URL + "/selCarDataById.do",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              uuid: _this.data.uuid,
              id: _this.data.id
            },
            success(res) {
              console.log(res)
              _this.setData({
                list: res.data.result
              })
            }
          })
          _this.setData({
            pingjia: false
          })
        } else {
          if (res.data.message == "请先绑定手机号") {
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
        // _this.setData({ list: res.data.result })
      }
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
   * 
   */
  onShareAppMessage: function(res) {
    var _this = this
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: '捷友联工程信息平台',
      path: "pages/xq/xq?uuid=" + _this.data.uuid + "&id=" + _this.data.id,
      success: function(res) {
        console.log(res)
      }
    }
  },
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect) {
      // 使页面滚动到底部
      console.log(rect)
      console.log(rect.bottom)
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },
})