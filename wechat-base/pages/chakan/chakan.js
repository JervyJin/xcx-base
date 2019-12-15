// pages/chakan/chakan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: "",
    uuid: "",
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uuid: res.data
        })
      },
    })
  },
  tishi(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../xiaoxi/xiaoxi?id=" + e.currentTarget.dataset.id + ""
    })
  },
  shanchu(e) {
    var _this = this
    console.log(e.currentTarget.dataset.ids)
    wx.request({
      url: "" + _this.data.URL + "/delMes.do",
      data: {
        ids: e.currentTarget.dataset.ids,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          _this.once()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        // _this.setData({
        //   list: res.data.data
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.once()
  },
  once() {
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/messagePage.do",
      data: {
        receiveUserId: _this.data.uuid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          list: res.data.data
        })
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
   */
  onShareAppMessage: function() {

  }
})