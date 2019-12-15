// pages/xiaoxi/xiaoxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    xiaoxi: {},
    uuid: "",
    URl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    console.log(options)
    wx.getStorage({
      key: 'URL',
      success: function(res) {
        wx.request({
          url: '' + res.data + '/getMesById.do',
          data: {
            id: options.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res)
            _this.setData({
              item: res.data.expand,
              xiaoxi: res.data.data
            })
          }
        })
      },
    })
 
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        _this.setData({
          uuid:res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  xqq(e) {
    console.log(e.currentTarget.dataset.biao)
    var str = e.currentTarget.dataset.biao
    // if (str.indexOf('删除') {
    //     console.log("驳回")
    //   } else {
    //     wx.showToast({
    //       title: '此内容已被删除无法查看',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    console.log(str.indexOf('删除'))
    if (str.indexOf('删除') < 0) {
      wx.navigateTo({
        url: "../xiugai/xiugai?id=" + this.data.item.id + "&uuid=" + this.data.uuid + "",
      })
    } else {
      wx.showToast({
        title: '此内容已被删除无法查看',
        icon: 'none',
        duration: 2000
      })
    }
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