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
    lastes: 2
  },
  // 选择的事件
  onChange(event) {
    console.log(event)
    this.setData({
      result: event.detail
    });
  },
  // 修改的页面
  xiugai(e) {
    var _this = this
    console.log(e.currentTarget.dataset)
    wx.request({
      // url: "http://192.168.0.119:8080/zzjzj/getRelease.do", //仅为示例，并非真实的接口地址 
      url: "" + _this.data.URL + "/updateRead.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        id: e.currentTarget.dataset.xinid
      },
      success(res) {
        console.log(res)
      }
    })
    wx.navigateTo({
      url: "../xq/xq?id=" + e.currentTarget.dataset.id + "&uuid=" + e.currentTarget.dataset.uuid + "&hua=" + 1 + "",
    })
    // if (e.currentTarget.dataset.viod == 0) {


    // } else {
    //   wx.showToast({
    //     title: '信息已失效',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
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
      key: 'URL',
      success: function(res) {
        _this.setData({
          URL:res.data
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
          url: "" + _this.data.URL + "/getRemindData.do",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            accepterUserUuid: res.data
          },
          success(res) {
            console.log(res)
            if (res.data.code == 1) {
              console.log(res)
              _this.setData({
                list1: res.data.data,
                lastes: res.lastPage
              })
              // console.log(arr)
            } else {
              _this.setData({
                list1: []
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
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //  删除  http://192.168.0.156:8080/jzj-car/deletepush.do?token=a1b2c3&security=jzjsecurity&chockboxes
  shanchu() {},


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
    var a = this.data.page;
    var arr = this.data.list1
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/getRemindData.do",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        accepterUserUuid: _this.data.uuid,
        pageNo: a
      },
      success(res) {
       
        console.log(1)
        if (res.data.code == 1) {
         
          if (a < res.data.lastPage) {
            a++
            _this.setData({
              page: a
            })
            console.log(res)
            for (var i = 0; i < res.data.data.length; i++) {
              arr.push(res.data.data[i])
            }
            _this.setData({
              list1: arr
            })
          } else {
            wx.showToast({
              title: '没有数据了',
              icon: 'none',
              duration: 2000
            })
          }

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