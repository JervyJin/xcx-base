// pages/release/release.js
// import province_list from '../../diqu.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断顶部的显示部分 
    arr: [],
    radio: "1",
    // 文本框焦点的获取
    textb: false,
    // 地区的选择
    a: {},
    // 车辆的选择
    car: [
      '单桥自卸车',
      '双桥自卸车',
      '平头自卸车',
      '尖头自卸车',
      '前四后八自卸车',
      '双桥半挂自卸车',
      '三桥半挂自卸车',
      '厢货',
      '半挂车',
      '水泥罐车',
      '商砼罐车',
      '砂浆车',
      '搅拌运输车',
      '单桥渣土车',
      '双桥渣土车',
      '生活垃圾车',
      '混凝土泵',
      '泵车',
      "平板拖车",
      '救援拖车',
      "清洗车",
      "洒水车",
      "扫路车",
      "清障车",
      "雾炮车",
      "吸污车",
      "市政环卫车",
      "叉车",
      "桥梁检测车",
      "高空作业车",
      "工程抢险车",
      "随车吊",
      '其他'
    ],
    // 车辆排放
    fang: ['不限', '国三及以下', '国四', "国五", "国六"],
    // 排放量
    fangl: "",
    // 车辆的选择
    caer: "",
    // 下拉框的显示和隐藏
    fangs: false,
    cars: false,
    // 价格
    jiage: 0,
    // 车辆描述
    miaoshu: '',
    // 最后的获取电话
    dianhuay: '',
    // 荷载量
    he: "",
    // 用户信息
    userinfor: "",
    // 手机格式的判断
    geshi: false,
    // 内容的判断
    size: true,
    // 地区的选择
    show: 0,
    address: "河南省-郑州市-不限",
    address1: "河南省-郑州市-二七区",
    customItem: '不限',
    vehicle: "",
    openid: "",
    uid: '',
    tishi: "请发布关于建材、工程车辆及工程机械的相关信息(内容在1-100字之间)",
    // 地区的默认值
    value: "410102",
    value1: "410102",
    imageas: [],
    danwei: ['方', "吨"],
    x: "",
    dan: false,
    fanghsi: "出租",
    region: ['河南省', '郑州市', '二七区'],
    numer: "",
    str: "",
    imgs: [],
    // 信息时限的选择
    timer: "7天",
    tiemrs: false,
    tiemrsa: ["7天", "15天", "30天"],
    token:"",
    URL:''
  },
  // 测试
  click() {
    this.setData({
      fangs: false
    })
    this.setData({
      cars: false
    })
    this.setData({
      dan: false,
    })
    this.setData({
      timers: false,
    })
  },
  // 信息时限的显示和隐藏
  timersy() {
    this.setData({
      timers: true
    })
  },
  // 信息时限的选择
  tiers(e) {
    this.setData({
      timer: e.currentTarget.dataset.car,
      timers: false
    })
  },
  // 图片信息的删除
  subir(e) {
    console.log(e.currentTarget.dataset.index)
    var a = e.currentTarget.dataset.index
    var arr = this.data.arr
    var imgs = this.data.imgs
    arr.splice(a, 1)
    imgs.splice(a, 1)
    console.log(arr)
    this.setData({
      arr: arr
    })
    this.setData({
      imgs: imgs
    })
    // var arr4 = this.data.imageas
    // arr4.splice(a, 1)
    // console.log(arr)
    // this.setData({
    //   imageas: arr4
    // })
    // console.log(this.data.imageas)
  },
  // textares 失去焦点
  miao(e) {
    this.setData({
      miaoshu: e.detail.value
    })
    this.setData({
      tishi: this.data.miaoshu
    })
  },
  onRemarkInput(e) {
    this.setData({
      textb: false
    })
    console.log(e.detail.value)
    if (e.detail.value != "") {
      this.setData({
        miaoshu: e.detail.value
      })
      this.setData({
        tishi: this.data.miaoshu
      })
      if (this.data.miaoshu != "") {
        this.setData({
          tishi: this.data.miaoshu
        })
      } else {
        this.setData({
          tishi: "请发布关于建材、工程车辆及工程机械的相关信息(内容100字以内)"
        })
      }
    } else {
      this.setData({
        miaoshu: ""
      })
      this.setData({
        tishi: "请发布关于建材、工程车辆及工程机械的相关信息(内容在1-100字之间)"
      })
    }
  },
  // 点击 xianshit 
  xianshit() {
    this.setData({
      textb: true
    })
  },
  // 通过事件上传图片
  iamge() {
    var _this = this
    var arr = this.data.arr
    var str = this.data.str
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        if (res.tempFilePaths.length <= 6) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            arr.push(res.tempFilePaths[i])
            str += res.tempFilePaths[i]
          }

        } else {
          for (var i = 0; i < 6; i++) {
            arr.push(res.tempFilePaths[i])
            str += res.tempFilePaths[i]
          }

        }
        str = str.substring(0, str.length - 1)
        console.log(str)
        // arr.push(res.tempFilePaths[0])
        _this.setData({
          arr: arr
        })
        console.log(_this.data.arr)
        // 上传图片
        if (_this.data.arr.length <= 6) {
          console.log(_this.data.arr)
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              //上传图片的网路请求地址
              url: ''+ _this.data.URL +'/upload.do',
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                console.log(res.data);
                var arr = _this.data.imgs
                arr.push(res.data)
                _this.setData({
                  imgs: arr
                })
              },
              fail: function(res) {
                console.log("error");
              }
            });
          }
        } else {
          for (var i = 0; i < 6; i++) {
            wx.uploadFile({
              //上传图片的网路请求地址
              url: '' + _this.data.URL +'/upload.do',
              //选择
              filePath: res.tempFilePaths[i],
              name: 'files',
              success: function(res) {
                console.log(res.data);
                var arr = _this.data.imgs
                arr.push(res.data)
                _this.setData({
                  imgs: arr
                })
                // var ismag = _this.data.imageas
                // ismag.push(res.data)
                // _this.setData({
                //   imageas: ismag
                // })
              },
              fail: function(res) {
                console.log("error");
              }
            });
          }
        }
      }
    })
  },
  // 选地的详情
  con(e) {
    console.log(e)
    var arr = []
    arr = e.detail.values
    console.log(arr)
    this.setData({
      value: arr[2].code
    })
    console.log(arr)
    // this.setData({ diqu: arr[1].name })
    var str = ""
    for (var i = 0; i < arr.length; i++) {
      str += arr[i].name + "-"
    }
    str = str.substring(0, str.length - 1);
    this.setData({
      address: str
    })
    console.log(this.data.address)
  },
  // 确定
  ay(e) {
    console.log(e)
    console.log(this.data.address)
    var deta = e.detail.value
    var str = ""
    for (var i = 0; i < deta.length; i++) {
      str += deta[i] + "-"
    }
    str = str.substring(0, str.length - 1);
    this.setData({
      address1: str
    })
    console.log(str)
    this.setData({
      show: 0
    })
    // this.setData({
    //   address1: 
    // })
    this.setData({
      value1: this.data.value
    })
  },
  // 取消
  quxiao() {
    this.setData({
      show: 0
    })
  },
  // 车辆选择的开始
  kai() {
    this.setData({
      cars: true
    })
    this.setData({
      fangs: false
    })
  },
  xianshi() {
    this.setData({
      show: 1
    })
  },
  // 排放量的开始
  kai1() {
    this.setData({
      fangs: true
    })
    this.setData({
      cars: false
    })
  },
  // 车辆信息的选择
  car1(e) {
    this.setData({
      cars: false
    })
    this.setData({
      fangs: false
    })
    this.setData({
      caer: e.currentTarget.dataset.car
    })
    console.log(this.data.cars)
  },
  // 排放量的选择
  fang1(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.pai)
    this.setData({
      fangl: e.currentTarget.dataset.pai
    })
    this.setData({
      fangs: false
    })
    this.setData({
      cars: false
    })
  },
  // 全选框
  onChange(id) {
    if (id.detail == 1) {
      this.setData({
        "radio": '1'
      })
      this.setData({
        fanghsi: "出租"
      })
    } else if (id.detail == 2) {
      this.setData({
        "radio": '2'
      })
      this.setData({
        fanghsi: "求租"
      })
    }

  },
  // 获取价格
  a(e) {
    console.log(e)
    this.setData({
      jiage: e.detail.value
    })
  },
  // 获取电话
  dianhua(e) {
    this.setData({
      dianhuay: e.detail.value
    })
    console.log(this.data.dianhuay)
    if (this.data.dianhuay != "") {
      if (!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.data.dianhuay))) {
        wx.showToast({
          title: '手机格式不正确',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          geshi: true
        })
      }
    } else {
      wx.showToast({
        title: '你输入的信息不完整',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 核载量的最后发布
  fangshu(e) {
    // console.log(e)
    // var a = e.detail.value - ""
    // var num = ""
    // if (a > 0 && a <= 10) {
    //   num = "1,10,"
    //   this.setData({
    //     numer: "1,10,"
    //   })
    // } else if (a >= 11 && a <= 20) {
    //   num = "11,20,"
    //   this.setData({
    //     numer: "11,20,"
    //   })
    // } else if (a >= 21 && a <= 30) {
    //   num = "21,30,"
    //   this.setData({
    //     numer: "21,30,"
    //   })
    // } else if (a >= 31 && a <= 40) {
    //   num = "31,40,"
    //   this.setData({
    //     numer: "31,40,"
    //   })
    // } else if (a >= 41 && a <= 50) {
    //   num = "41,50,"
    //   this.setData({
    //     numer: "41,50,"
    //   })
    // } else {
    //   num = "51,1000,"
    //   this.setData({
    //     numer: "51,1000,"
    //   })
    // }
    this.setData({
      he: e.detail.value
    })
  },
  // 最后的发布
  // http://192.168.0.156:8080/jzj-car/pushinsert.do?token=a1b2c3&security=jzjsecurity&uuid=wraasdfdf&nick=1&type=1&tradestyle=1&standard=1
  fabu() {
    console.log(this.data.imgs.length > 6)

    // if (this.data.arr.length >= 1) {
    var _this = this
    var str = this.data.numer + "" + _this.data.x
    console.log(str)
    this.setData({
      numer: str
    })
    // if (this.data.geshi && this.data.size && this.data.arr.length > 0) {
    if (this.data.imgs.length <= 6) {
      wx.request({
        url: ""+ _this.data.URL +"/carUpload.do",
        method: "post",
        data: {
          address: _this.data.address1,
          describe: _this.data.miaoshu,
          carName: _this.data.caer,
          standard: _this.data.fangl,
          capacity: _this.data.he + "" + _this.data.x,
          phone: _this.data.dianhuay,
          tradeType: _this.data.fanghsi,
          uuid: _this.data.uid,
          photos: _this.data.imgs,
          valid: _this.data.timer,
          token:_this.data.token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1000
            })
            var timer = null
            // clearInterval(timer)
            // setInterval(() => {
            wx.switchTab({
              url: '../index/index',
            })
            //   clearInterval(timer)
            // }, 2000)

          } else {
            if (res.data.message == "请先绑定手机!") {
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
        },
      })
    }else {
      wx.showToast({
        title: '图片最多上传6张',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 单位的选择
  danwei(e) {
    console.log(e.target.dataset.danei)
    this.setData({
      x: e.target.dataset.danei
    })
    this.setData({
      dan: false
    })
  },
  // 单位选择的开关
  jaig() {
    this.setData({
      dan: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          token:res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        _this.setData({
          userinfor: Object(res.data)
        })
      },
    })
    wx.getStorage({
      key: 'open_id',
      success: function(res) {
        console.log(res)
        _this.setData({
          openid: res.data
        })
      },
    })
    wx.getStorage({
      key: 'uuid',
      success: function(res) {
        console.log(res)
        _this.setData({
          uid: res.data
        })
      },
    })
    // 发布车辆类型的获取
    wx.request({
      url: ''+ _this.data.URL +'/getCarTable.do',
      header: {
        'content-type': 'application/json' // 默认值
      },
      methods: "post",
      success(res) {
        console.log(res)
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
    console.log("卸载")
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