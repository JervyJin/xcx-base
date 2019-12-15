// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 18860233258
    code:"",
    uuid:"",
    phone:"",
    code_js:"",
    token:"",
    URL:"",
    ksatar:false,
    change:""
  },
  
  text(e){
    this.setData({ code_js: e.detail.value })
  },
  text2(e) {
    this.setData({ change: e.detail.value })
  },
   // 手机号的保存
  text1(e) {
    this.setData({ phone :e.detail.value})
  },
  ksatar1(){
    this.setData({
      ksatar:!this.data.ksatar
    })
  },
  // 获取验证码的事件
  code(){
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/verification.do", //仅为示例，并非真实的接口地址
      method:'post',
      data: {
        uuid: _this.data.uuid,
        phone: _this.data.phone,
        token:_this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'// 默认值
      },
      success(res) {
        console.log(res.data)
        if(res.data.code == 1){
          var tiemr = null;
          clearInterval(tiemr)
          var count = 60
          tiemr = setInterval(() => {
            if (count > 0) {
              _this.setData({ code: --count + "s" })
            } else {
              clearInterval(tiemr)
              _this.setData({ code: "" })
            }
          }, 1000)
        }else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
        console.log(res.data)
      }
    })
  },
  // 最后的绑定事件
  bangding(){
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/submitVerification.do", //仅为示例，并非真实的接口地址
      method:'post',
      data: {
        uuid: _this.data.uuid,
        phone: _this.data.phone,
        js_code: _this.data.code_js,
        token:_this.data.token,
        youInvitationCode: _this.data.change
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
        console.log(res.data)
      }
    })
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
        _this.setData({token:res.data})
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        wx.request({
          url: "" + _this.data.URL + "/getUserPhone.do", //仅为示例，并非真实的接口地址
          method:'post',
          data: {
            uuid: res.data,
            token:_this.data.token
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'// 默认值
          },
          success(res) {
            console.log(res.data)
            if (res.data.code == 1) {
              if(res.data.message != "请输入手机号!"){
                wx.redirectTo({
                  url: '../gaiphone/gaiphone',
                })
              }
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
            console.log(res.data)
          }
        })
        _this.setData({uuid:res.data})
      },
    })
    // 查询有没有绑定手机号
    // http://192.168.0.162:8080/zzjzj/getUserPhone.do

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