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

  text2(e) {
    this.setData({
      change: e.detail.value
    })
  },
  // 手机号的保存


  // 最后的绑定事件
  bangding() {
    var _this = this
    if (this.data.change != "") {
      wx.request({
        url: "" + _this.data.URL + "/updateCode.do",
        method: 'post',
        data: {
          uuid: _this.data.uuid,
          youInvitationCode: _this.data.change
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res)
          if(res.data.code == 1){
            
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写邀请码',
        icon:"none",
        duration:2000
      })
    }

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
      key: 'InCode',
      success: function(res) {
        _this.setData({
          code:res.data
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
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uuid: res.data
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