// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 18860233258
    code: "",
    uuid: "",
    phone: "",
    code_js: "",
    token: "",
    URL: "",
    ksatar: false,
    change: ""
  },
  // 最后的绑定事件
  bangding() {
    var _this = this
    wx.setClipboardData({
      data: _this.data.change,//需要复制的内容
      success: function (res) {
        // self.setData({copyTip:true}),
        console.log(res)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getStorage({
      key: 'URL',
      success: function (res) {
        _this.setData({
          URL: res.data
        })
      },
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
      key: 'uuid',
      success: function (res) {
        _this.setData({
          uuid: res.data
        })
      },
    })
    wx.getStorage({
      key: 'myInvitationCode',
      success: function(res) {
        _this.setData({
          change:res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})