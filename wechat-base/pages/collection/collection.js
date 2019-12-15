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
    URL: "",
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
    console.log(e)
    var _this = this
    // console.log('uuid:' + e.currentTarget.dataset.uuid, 'id:' + e.currentTarget.dataset.id)
    wx.request({
      url: '' + _this.data.URL + '/delEnshrine.do',
      data: {
        id: e.currentTarget.dataset.id,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          _this.onLoad()
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    // 从新发布  
  },
  // 修改的页面
  xiugai(e) {
    wx.navigateTo({
      url: "../xq/xq?id=" + e.currentTarget.dataset.id + "&uuid=" + e.currentTarget.dataset.uuid + "",
    })
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
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        _this.setData({
          URL: res.data
        })
      },
    })
    // http://192.168.0.119:8080/zzjzj/selectCarDateValid.do 
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uuid: res.data
        })
        console.log(res)
        wx.request({
          // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
          url: "" + _this.data.URL + "/enshrinePage.do",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            createBy: res.data,
            type: 0
          },
          success(res) {
            console.log(res)
            if (res.data.code == 1) {
              _this.setData({
                list1: res.data.data
              })
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.onReady()
    // this.onLoad()
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
    var list = this.data.list1
    var _this = this
    wx.request({
      // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
      url: "" + _this.data.URL + "/enshrinePage.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        createBy: _this.data.uuid,
        type: 0,
        pageNo: _this.data.page
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          if (a <= res.data.lastPage) {
            a++
            _this.setData({
              page: a
            })
            console.log(res.data.data)
            for (var i = 0; i < res.data.data.length; i++) {
              list.push(res.data.data[i])
            }
            _this.setData({
              list1: list
            })
          } else {
            wx.showToast({
              title: '没有更多的数据了',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
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