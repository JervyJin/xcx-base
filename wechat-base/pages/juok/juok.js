// pages/juok/juok.js
var tiemr = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:5,
    
  },
  fanhui(){
    wx.navigateBack({
      delta: 2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    clearInterval(tiemr)
    var tiemre= this.data.timer
    tiemr = setInterval(()=>{ 
      --tiemre
      if (tiemre > 0){
        this.setData({ timer: tiemre })
      }else {
        clearInterval(tiemr);
        this.setData({timer:5})
        wx.navigateBack({
          delta:2
        })
      }
    },1000)
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
  clearInterval(tiemr)
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