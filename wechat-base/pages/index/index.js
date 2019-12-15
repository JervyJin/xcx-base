//index.js
//获取应用实例
var timer = null;
var timer1 = null
const app = getApp()
const citys = {
  '方': ['10方及以下', '11-20方', '21-30方', '31-40方', '41-50方', '51方及以上'],
  '吨': ['10吨及以下', '11-20吨', '21-30吨', '31-40吨', '41-50吨', '51吨及以上']
};
const citys1 = {
  '交易方式': ["出租", "求租"],
};
const raw = {
  '自卸车': ['不限', '单桥自卸车', '双桥自卸车', '平头自卸车', '尖头自卸车', '前四后八自卸车', '双桥半挂自卸车', '三桥半挂自卸车'],
  '运输车': ['不限', '厢货', '半挂车', '水泥罐车', '商砼罐车', '砂浆车', '其他', '搅拌运输车'],
  '渣土车': ['不限', '单桥渣土车', '双桥渣土车', '生活垃圾车'],
  '混凝土泵车': ['不限', '混凝土泵', '泵车'],
  '随车吊': ['不限', '随车吊'],
  '拖车': ['不限', '平板拖车', '救援拖车'],
  '道路清洗': ['不限', '清洗车', '洒水车', '扫路车', '清障车', '雾炮车', '吸污车', '市政环卫车'],
  '叉车': ['不限', '叉车'],
  '桥梁检测车': ['不限', '桥梁检测车'],
  '高空作业车': ['不限', '高空作业车'],
  '工程抢险车': ['不限', '工程抢险车']
};
// import province_list from '../../diqu.js'
import type from '../../type.js'
Page({
  data: {
    // 活动
    huodong: wx.getStorage('huodong'),
    // 路径 
    URL: "http://192.168.0.66:8080/zzjzj",
    // 发布拖拽的测试
    ballBottom: 8,
    ballRight: 16,
    screenHeight: 0,
    screenWidth: 0,
    // -------------------
    fabugai: false,
    bool: false,
    // 背景补的遮罩层
    hidden: false,
    motto: 'Hello World',
    userInfo: {},
    xianshioo: false,
    lunbo: ['../../img/banner11.png', '../../img/banner12.png', '../../img/banner13.png', '../../img/banner4.jpg'],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    a: {},
    // 控制选择组建的显示和隐藏
    show: 0,
    // 地区的最后结果
    location: "河南省-郑州市-中原区",
    q: type,
    // 控制 车辆类型的显示和隐藏
    car: 0,
    // 车辆选择的最后结果
    vehicle: "自卸车-单桥自卸车",
    // 交易的最后结果
    jiao: "求租",
    // 首页返回的 信息
    all: [],
    // 交易方式
    jiaoyi: 0,
    // 最后显示的区域和 车号 交易方式 核载量 
    diqu: "地区",
    cheliang: "自卸车",
    // 交易方式
    jiaoyic: "交易方式",
    // 核载量
    hezaia: 0,
    // 排放标准
    pai: false,
    // 荷载量最后的数据
    helast: "核载量",
    // 排放标准最后的数据
    plast: "排放标准",
    // 最后的空值
    k1: "",
    k2: "",
    k3: "",
    k4: "",
    k5: "",
    // 选择的bug
    // 地区的选择
    value: "410102",
    value1: "",
    xianshi: "郑州市",
    xianshi1: "",
    // 车辆的选择
    xianshic: "自卸车",
    // 交易的方式
    xianshif: "交易方式",
    // 荷载量
    xianshih: "核载量",
    httpurl: "",
    // 核载量
    select: [0, 1],
    columns: [Object.keys(raw), raw[Object.keys(raw)[0]]],
    region1: [],
    province: "",
    city: "",
    array: ['出租', '求租'],
    index: 0,
    newshuj: "",
    // 车辆类型 自卸车
    // columns2: [{
    //     values: Object.keys(citys2),
    //     className: 'column5'
    //   },
    //   {
    //     values: citys2['自卸车'],
    //     className: 'column6',
    //     defaultIndex: 2
    //   }
    // ],
    // 最后的发布 地区的位置
    faduqu: "",
    // 显示引导的部分
    yin1: false,
    yin2: false,
    yin3: false,
    // 最后的数据
    diqulast: "",
    carlast: "",
    jiaoyilast: '',
    hezailast: "",
    // 展示
    region: ['河南省', '郑州市', '二七区'],
    customItem: '不限',
    nice: [],
    array1: ['10方及以下', '11-20方', '21-30方', '31-40方', '41-50方', '51方及以上', '10吨及以下', '11-20吨', '21-30吨', '31-40吨', '41-50吨', '51吨及以上'],
    index1: 0,
    // 测试
    multiIndex: [0, 0],
    multiArray: [
      ['自卸车', '运输车', '渣土车', '混凝土泵车', '随车吊', '拖车', '道路清洗', '叉车', '桥梁检测车', '高空作业车', '工程抢险车', '其他'],
      ['单桥自卸车', '双桥自卸车', '平头自卸车', '尖头自卸车', '前四后八自卸车', '双桥半挂自卸车', '三桥半挂自卸车']
    ],
    multiIndex1: [0, 0],
    multiArray1: [
      ['方', '吨'],
      ['10方及以下', '11-20方', '21-30方', '31-40方', '41-50方', '51方及以上']
    ],
    objectMultiArray1: [
      [{
          id: 0,
          name: '其他'
        },
        {
          id: 1,
          name: '自卸车'
        },
        {
          id: 2,
          name: '运输车'
        }
      ],
      [{
          id: 0,
          name: '10方及以下'
        },
        {
          id: 1,
          name: '11-20方'
        },
        {
          id: 2,
          name: '21-30方'
        },
        {
          id: 3,
          name: '31-40方'
        },
        {
          id: 4,
          name: '41-50方'
        },
        {
          id: 5,
          name: '51方及以上'
        }
      ]
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '自卸车'
        },
        {
          id: 1,
          name: '运输车'
        },
        {
          id: 2,
          name: '渣土车'
        },
        {
          id: 3,
          name: '混凝土泵车'
        },
        {
          id: 4,
          name: '随车吊'
        },
        {
          id: 5,
          name: '拖车'
        }, {
          id: 6,
          name: '道路清洗'
        },
        {
          id: 7,
          name: '叉车'
        },
        {
          id: 8,
          name: '桥梁检测车'
        },
        {
          id: 9,
          name: '高空作业车'
        }, {
          id: 10,
          name: '工程抢险车'
        }, {
          id: 11,
          name: '其他'
        },
      ],
      [{
          id: 0,
          name: '单桥自卸车'
        },
        {
          id: 1,
          name: '双桥自卸车'
        },
        {
          id: 2,
          name: '平头自卸车'
        },
        {
          id: 3,
          name: '尖头自卸车'
        },
        {
          id: 4,
          name: '前四后八自卸车'
        },
        {
          id: 5,
          name: '双桥半挂自卸车'
        }, {
          id: 6,
          name: '三桥半挂自卸车'
        }
      ]
    ],
    multiIndex: [],
    fengye: 1,
    xialafenye: 2,
    uuid: "",
    token: "",
    xianshitiank: true,
    // 弹框的数据
    mess: "",
    // 详情的显示和隐藏
    once: false,
    describe: "",
    carSearch1: ""
  },
  // 弹框详情的数据获取
  toated(e) {
    var _this = this
    this.setData({
      once: true
    })
    console.log(_this.data)
    console.log(e.currentTarget.dataset.uuid)
    wx.request({
      url: "" + _this.data.URL + "/selectMessageById.do",
      method: "post",
      data: {
        token: _this.data.token,
        uuid: _this.data.uuid,
        id: e.currentTarget.dataset.uuid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          _this.setData({
            mess: res.data.CarData
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
  bindMultiPickerChange: function(e) {
    console.log(e)

    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  bindMultiPickerColumnChange1: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };

    data.multiIndex1[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex1[0]) {
          case 0:
            data.multiArray1[1] = ['10方及以下', '11-20方', '21-30方', '31-40方', '41-50方', '51方及以上'];
            break;
          case 1:
            data.multiArray1[1] = ['10吨及以下', '11-20吨', '21-30吨', '31-40吨', '41-50吨', '51吨及以上'];
            break;
        }
        break;
    }
    this.setData(data);
  },
  // 荷载量的展示
  bindMultiPickerColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {

          case 0:
            data.multiArray[1] = ['单桥自卸车', '双桥自卸车', '平头自卸车', '尖头自卸车', '前四后八自卸车', '双桥半挂自卸车', '三桥半挂自卸车'];
            break;
          case 1:
            data.multiArray[1] = ['厢货', '半挂车', '水泥罐车', '商砼罐车', '砂浆车', '其他', '搅拌运输车'];
            break;
          case 2:
            data.multiArray[1] = ['单桥渣土车', '双桥渣土车', '生活垃圾车'];
            break;
          case 3:
            data.multiArray[1] = ['混凝土泵', '泵车'];
            break;
          case 4:
            data.multiArray[1] = ['随车吊'];
            break;
          case 5:
            data.multiArray[1] = ['平板拖车', '救援拖车'];
            break;
          case 6:
            data.multiArray[1] = ['清洗车', '洒水车', '扫路车', '清障车', '雾炮车', '吸污车', '市政环卫车'];
            break;
          case 7:
            data.multiArray[1] = ['叉车'];
            break;
          case 8:
            data.multiArray[1] = ['桥梁检测车'];
            break;
          case 9:
            data.multiArray[1] = ['其他', '高空作业车'];
            break;
          case 10:
            data.multiArray[1] = ['工程抢险车'];
            break;
          case 11:
            data.multiArray[1] = ['其他'];
            break;
        }
        break;
    }
    this.setData(data);
  },
  // 选择控件
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 卡片轮播的事件
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 去往详情页
  xq(e) {
    console.log(e)
    wx.navigateTo({
      url: "../xq/xq?uuid=" + e.currentTarget.dataset.uuid + "&id=" + e.currentTarget.dataset.id + ""
    })
  },
  // over手指的离开

  onLoad: function() {
    var _this = this
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
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
    // ---------------------------------
    clearInterval(timer1)
    timer1 = setInterval(() => {
      this.setData({
        xianshitiank: false
      })
      clearInterval(timer1)
    }, 5000)
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res, 1)
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      },
      fail: function(res) {
        console.log(res)
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 判断是否获取到用户的信息 并保存共用
      wx.setStorage({
        key: 'user',
        data: _this.data.userInfo,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 判断是否获取到用户的信息 并保存共用
        wx.setStorage({
          key: 'user',
          data: _this.data.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // 判断是否获取到用户的信息 并保存共用
          // wx.setStorage({
          //   key: 'user',
          //   data: _this.data.userInfo,
          // })
        }
      })
    }
  },
  // 拖拽的结束
  over(e) {
    console.log(e.changedTouches[0])
  },
  // 被拖动的事件
  ballMoveEvent: function(e) {
    wx.stopPullDownRefresh();
    // console.log('我被拖动了....')
    console.log(e)
    var touchs = e.touches[0];
    var clientX = Math.abs(touchs.clientX)
    var clientY = Math.abs(touchs.clientY);
    // console.log('clientX: ' + clientX)
    // console.log('clientY: ' + clientY)
    //防止坐标越界,view宽高的一般
    if (clientX < 30) return;
    if (clientX > this.data.screenWidth - 30) return;
    if (this.data.screenHeight - clientY <= 30) return;
    if (clientY <= 30) return

    //这里用right和bottom.所以需要将pageX pageY转换
    var x = this.data.screenWidth - clientX - 30;
    var y = this.data.screenHeight - clientY - 30;
    // console.log('x: ' + x)
    // console.log('y: ' + y)
    wx.setStorage({
      key: 'clientx',
      data: x,
    })
    wx.setStorage({
      key: 'clienty',
      data: y,
    })
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  },
  ballClickEvent: function() {
    console.log('点击了....')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this

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
    //       // wx.navigateTo({
    //       //   url: '../index1/index1',
    //       // })
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
    clearInterval(timer)
    this.setData({
      fengye: 1,
      xialafenye: 2
    })
    wx.getStorage({
      key: 'clientx',
      success: function(res) {
        _this.setData({
          ballRight: res.data
        })
      },
    })
    wx.getStorage({
      key: 'clienty',
      success: function(res) {
        _this.setData({
          ballBottom: res.data
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
    wx.getStorage({
      key: 'token',
      success: function(res) {
        _this.setData({
          token: res.data
        })
      },
    })
    this.setData({
      xianshi: "地区"
    })
    this.setData({
      xianshic: "车型"
    })
    this.setData({
      xianshif: "供需"
    })
    this.setData({
      xianshih: "核载"
    })
    var _this = this
    var arr = []
    var obj = {}
    wx.request({
      url: "" + _this.data.URL + "/homePageLB.do",
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        _this.setData({
          nice: res.data.result
        })
      }
    })
    wx.getStorage({
      key: 'count',
      success: function(res) {
        if (res.data < 1) {
          _this.setData({
            hidden: true
          })
          _this.setData({
            yin1: true
          })
          let count = wx.getStorageSync('count')
          count = "100"
          wx.setStorageSync('count', count);
        } else {
          _this.setData({
            hidden: false
          })
          _this.setData({
            yin1: false
          })
          _this.setData({
            yin2: false
          })
          _this.setData({
            yin3: false
          })

        }
      },
    })

    // wx.getStorage({
    //   key: 'url',
    //   success: function(res) {
    //     this.setData({
    //       httpurl: res.data
    //     })
    //     //  地区的后台请
    //   },
    // })
    // 首页数据的请求
    wx.request({
      url: "" + _this.data.URL + "/carHomePage.do", // 仅为示例，并非真实的接口地址
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        var arr = res.data.result
        _this.setData({
          all: res.data.result
        })
        // var all = _this.data.all;
        // for (var i = 0; i < all.length; i++) {
        //   var timer = all[i].releasetime.substring(0, 11)
        //   var shi = all[i].releasetime.substring(11, 13)
        //   console.log(shi)
        //   all[i].releasetime = timer +"-"+ shi
        // }
        // _this.setData({
        //   all: res.data.result
        // })
      }
    })
    // 地区的选择
    // var province_list = {}
    // var city_list = {}
    // var county_list = {}
    timer = setInterval(() => {
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log("2223232423")
        },
        fail: function(res) {
          wx.navigateTo({
            url: '../index1/index1',
          })
        }
      })
      clearInterval(timer)
    }, 5000)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // --------------------------------------------------------------
  // 搜随框的筛选
  tap() {
    var _this = this
    wx.request({
      url: "" + _this.data.URL + "/carSearch.do", //仅为示例，并非真实的接口地址
      data: {
        describe: _this.data.carSearch1,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          _this.setData({
            all: res.data.result
          })
          wx.showToast({
            title: '已将数据展示在当前页面',
            icon: 'none',
            duration: 2000
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
  sendMsgTap() {
    this.tap()
  },
  // 选择地区组建的显示和隐藏
  zujian() {
    this.setData({
      xianshioo: true
    })
    this.setData({
      show: 1
    })
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      pai: 0
    })
    this.setData({
      diqu: "郑州市"
    })
  },
  // 打开排放标准的选择
  zhun() {
    this.setData({
      pai: 1
    })
    this.setData({
      show: 0
    })
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
  },
  // 地区确定按钮的测试
  ay(e) {
    console.log(e)
    var _this = this
    this.setData({
      fengye: 1
    })
    this.setData({
      xialafenye: 2
    })
    console.log(e)
    console.log(e.detail.value[1])
    var str = ""
    this.setData({
      xianshi: e.detail.value[1]
    })
    // if (e.detail.value[2].name == "全部") {
    //   for (var i = 0; i < e.detail.value.length - 1; i++) {
    //     str += e.detail.value[i].name
    //   }
    //   // str = str.substring(0, str.length - 1);
    // } else {
    for (var i = 0; i < e.detail.value.length; i++) {
      str += e.detail.value[i] + "-"
    }
    str = str.substring(0, str.length - 1);
    // }

    this.setData({
      faduqu: str
    })
    this.setData({
      diqulast: str
    })
    wx.request({
      url: "" + _this.data.URL + "/carHomePage.do", //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        address: _this.data.diqulast,
        carName: _this.data.carlast,
        tradeType: _this.data.jiaoyilast,
        capacity: _this.data.newshuj,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          _this.setData({
            all: res.data.result
          })
          // var all = _this.data.all;
          // for (var i = 0; i < all.length; i++) {
          //   var timer = all[i].releasetime.substring(0, 11)
          //   var shi = all[i].releasetime.substring(11, 13)
          //   console.log(shi)
          //   all[i].releasetime = timer + "-" + shi
          // }
          // _this.setData({
          //   all: res.data.result
          // })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    this.setData({
      xianshioo: false
    })
    this.setData({
      show: 0
    })

    // if (this.data.xianshi1 != "") {
    //   this.setData({
    //     xianshi: this.data.xianshi1
    //   })
    //   this.setData({
    //     value1: this.data.value
    //   })
    // }
    console.log(this.data.xianshi)
  },
  // 选中详情
  con(e) {
    var arr = []
    arr = e.detail.values
    console.log(arr)
    this.setData({
      value: arr[2].code
    })
    this.setData({
      xianshi1: arr[1].name
    })
    // this.setData({
    //   k1: arr[1].name
    // })
    var str = ""
    for (var i = 0; i < arr.length; i++) {
      str += arr[i].name + "-"
    }
    str = str.substring(0, str.length - 1);
    // 地区的选择
    this.setData({
      location: str
    })
    // console.log(this.data.location)
  },
  // 关闭地区选择
  quxiao() {
    this.setData({
      show: 0
    })
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      pai: 0
    })
    this.setData({
      xianshioo: false
    })
  },
  // 车辆选择
  cheliang() {
    this.setData({
      show: 0
    })
    this.setData({
      car: 1
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      pai: 0
    })
    this.setData({
      xianshioo: true
    })
  },
  // 核载量的打开选择
  hez() {
    this.setData({
      hezaia: 1
    })
    this.setData({
      show: 0
    })
    this.setData({
      car: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      pai: 0
    })
    this.setData({
      xianshioo: true
    })
  },
  // 确定按钮的测试
  ayc() {
    this.setData({
      xianshioo: false
    })

    if (this.data.xianshic1 != "") {
      this.setData({
        xianshic: this.data.xianshic1
      })
      this.setData({
        valuec: this.data.valuec1
      })
    }

    // if(this.data.k2 == ""){
    //   this.setData({k2:'自卸车'})
    //   this.setData({ cheliang: this.data.k2 })
    // }else {
    //    this.setData({ cheliang :this.data.k2})
    // }
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      show: 0
    })
    this.setData({
      pai: 0
    })
  },
  // 荷载量的数据变更
  conyh(e) {
    console.log(e.detail.values)
    var arr = e.detail.values
    this.setData({
      valueh1: arr[1].code
    })
    this.setData({
      xianshi1h: arr[1].name
    })
    // helast
    this.setData({
      k4: e.detail.values[1].name
    })
  },
  // 荷载量的确认
  ayc2() {
    this.setData({
      xianshioo: false
    })

    if (this.data.xianshi1h != "") {
      this.setData({
        xianshih: this.data.xianshi1h
      })
      this.setData({
        valueh: this.data.valueh1
      })
    }

    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      show: 0
    })
    this.setData({
      pai: 0
    })
  },
  // 选择数据的实时更新
  conc(e) {
    // console.log(e)
    var arr = []
    arr = e.detail.values
    // console.log(arr)
    this.setData({
      valuec1: arr[1].code
    })
    this.setData({
      xianshic1: arr[0].name
    })
    var str = ""
    for (var i = 0; i < arr.length - 1; i++) {
      str += arr[i].name + "-"
    }
    str = str.substring(0, str.length - 1);
    // console.log(str)
    // 最后的车辆选择
    this.setData({
      vehicle: str
    })
    this.setData({
      k2: e.detail.values[0].name
      // cheliang: e.detail.values[0].name
    })
  },
  // 取消按钮
  // quxiaoc() {
  //   this.setData({
  //     jiaoyi: 0
  //   })
  //   this.setData({
  //     car: 0
  //   })
  // },
  // jiaoyi 
  jiaoyi1() {
    this.setData({
      xianshioo: false
    })
    this.setData({
      jiaoyi: 1
    })
    this.setData({
      show: 0
    })
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      pai: 0
    })
    this.setData({
      xianshioo: true
    })
  },
  // 发布的按钮
  fabu1() {
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../release/release'
      })
    }

    this.setData({
      fabugai: false
    })
  },
  dyfabu() {
    console.log(this.data.uuid)
    if (this.data.uuid == "") {
      wx.showToast({
        title: '你的账号已被禁用',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../dynamicrelease/dynamicrelease',
      })
    }

    this.setData({
      fabugai: false
    })
  },
  fabu() {
    // console.log(1)
    this.setData({
      fabugai: true
    })
  },
  // 交易方式
  cony(e) {
    var arr = e.detail.values
    this.setData({
      valuef1: arr[1].code
    })
    this.setData({
      xianshif1: arr[1].name
    })
  },
  // 交易方式的确认按钮
  ayc1() {
    this.setData({
      xianshioo: false
    })
    if (this.data.xianshif1 != "") {
      this.setData({
        xianshif: this.data.xianshif1
      })
      this.setData({
        valuef: this.data.valuef1
      })
    }
    this.setData({
      jiaoyi: 0
    })
    this.setData({
      show: 0
    })
    this.setData({
      car: 0
    })
    this.setData({
      hezaia: 0
    })
    this.setData({
      pai: 0
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: '捷友联工程信息平台',
      path: 'pages/index1/index1',
      success: function(res) {
        console.log(res)
      }
    }
  },
  // 遮罩层的关闭
  onClose() {
    this.setData({
      xianshioo: false
    })
    this.setData({
      fabugai: false
    })
    this.setData({
      once: false
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var _this = this
    _this.setData({
      diqulast: "",
      carlast: "",
      jiaoyilast: "",
      newshuj: "",
    })
    this.setData({
      fengye: 1,
      xialafenye: 2
    })
    this.setData({
      xianshi: "地区"
    })
    this.setData({
      xianshic: "车型"
    })
    this.setData({
      xianshif: "供需"
    })
    this.setData({
      xianshih: "核载"
    })
    // 首页数据的请求
    wx.request({
      url: '' + _this.data.URL + '/carHomePage.do', // 仅为示例，并非真实的接口地址
      method: "post",
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        _this.setData({
          all: res.data.result
        })

        // var all = _this.data.all;
        // for (var i = 0; i < all.length; i++) {
        //   var timer = all[i].releasetime.substring(0, 11)
        //   var shi = all[i].releasetime.substring(11, 13)
        //   console.log(shi)
        //   all[i].releasetime = timer + "-" + shi
        // }
        // _this.setData({
        //   all: res.data.result
        // })
        wx.stopPullDownRefresh();
        // var arr = res.data[0].list
        // for (var i = 0; i < arr.length; i++) {
        //   // console.log(arr[i].url)
        //   // arr[i].url = JSON.parse(arr[i].url)
        // }
        // console.log(arr)

      }
    })
    wx.request({
      url: '' + _this.data.URL + '/homePageLB.do',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        _this.setData({
          nice: res.data.result
        })
      }
    })
  },
  // 监听滚动条
  // 点击回到顶部
  top0(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function(e) {
    if (e.scrollTop > 200) {
      // console.log(e)
      this.setData({
        bool: true
      })
    } else {
      this.setData({
        bool: false
      })
    }
  },
  // 测试核载量
  onConfirm(e) {
    this.setData({
      fengye: 1
    })
    this.setData({
      xialafenye: 2
    })
    var _this = this;
    console.log(e.detail.value);
    console.log(this.data.multiArray1[1][e.detail.value[1]])
    if (this.data.multiArray1[1][e.detail.value[1]] == "10方及以下") {
      this.setData({
        newshuj: "1,10,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "11-20方") {
      this.setData({
        newshuj: "11,20,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "21-30方") {
      this.setData({
        newshuj: "21,30,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "31-40方") {
      this.setData({
        newshuj: "31,40,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "41-50方") {
      this.setData({
        newshuj: "41,50,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "51方及以上") {
      this.setData({
        newshuj: "51,1000,方"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "10吨及以下") {
      this.setData({
        newshuj: "1,10,吨"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "11-20吨") {
      this.setData({
        newshuj: "11,20,吨"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "21-30吨") {
      this.setData({
        newshuj: "21,30,吨"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "31-40吨") {
      this.setData({
        newshuj: "31,40,吨"
      })
    } else if (this.data.multiArray1[1][e.detail.value[1]] == "41-50吨") {
      this.setData({
        newshuj: "41,50,吨"
      })
    } else {
      this.setData({
        newshuj: "51,1000,吨"
      })
    }
    this.setData({
      xianshih: this.data.multiArray1[1][e.detail.value[1]]
    })
    this.setData({
      hezailast: this.data.multiArray1[1][e.detail.value[1]]
    })
    wx.request({
      url: '' + _this.data.URL + '/carHomePage.do', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        address: _this.data.diqulast,
        carName: _this.data.carlast,
        tradeType: _this.data.jiaoyilast,
        capacity: _this.data.newshuj,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          _this.setData({
            all: res.data.result
          })
          // var all = _this.data.all;
          // for (var i = 0; i < all.length; i++) {
          //   var timer = all[i].releasetime.substring(0, 11)
          //   var shi = all[i].releasetime.substring(11, 13)
          //   console.log(shi)
          //   all[i].releasetime = timer + "-" + shi
          // }
          // _this.setData({
          //   all: res.data.result
          // })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    this.setData({
      xianshioo: false
    })
  },
  onConfirm1(event) {
    this.setData({
      fengye: 1
    })
    this.setData({
      xialafenye: 2
    })
    var _this = this;
    console.log(event.detail.value)
    console.log(this.data.array[event.detail.value])
    this.setData({
      xianshif: this.data.array[event.detail.value]
    })
    this.setData({
      jiaoyilast: this.data.array[event.detail.value]
    })
    wx.request({
      url: '' + _this.data.URL + '/carHomePage.do', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        address: _this.data.diqulast,
        carName: _this.data.carlast,
        tradeType: _this.data.jiaoyilast,
        capacity: _this.data.newshuj,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          _this.setData({
            all: res.data.result
          })
          // var all = _this.data.all;
          // for (var i = 0; i < all.length; i++) {
          //   var timer = all[i].releasetime.substring(0, 11)
          //   var shi = all[i].releasetime.substring(11, 13)
          //   console.log(shi)
          //   all[i].releasetime = timer + "-" + shi
          // }
          // _this.setData({
          //   all: res.data.result
          // })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    this.setData({
      xianshioo: false
    })
  },
  onConfirm2(e) {
    this.setData({
      fengye: 1
    })
    this.setData({
      xialafenye: 2
    })
    // console.log(event.detail.value[0])
    // console.log(citys[event.detail.value[0]])
    this.setData({
      multiIndex: e.detail.value
    })
    console.log(this.data.multiArray)
    console.log(this.data.multiArray[1][e.detail.value[1]])
    var _this = this;
    this.setData({
      xianshic: this.data.multiArray[1][e.detail.value[1]]
    })
    this.setData({
      carlast: this.data.multiArray[1][e.detail.value[1]]
    })
    this.setData({
      xianshioo: false
    })
    wx.request({
      url: '' + _this.data.URL + '/carHomePage.do', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        address: _this.data.diqulast,
        carName: _this.data.carlast,
        tradeType: _this.data.jiaoyilast,
        capacity: _this.data.newshuj,
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
          _this.setData({
            all: res.data.result
          })
          // var all = _this.data.all;
          // for (var i = 0; i < all.length; i++) {
          //   var timer = all[i].releasetime.substring(0, 11)
          //   var shi = all[i].releasetime.substring(11, 13)
          //   console.log(shi)
          //   all[i].releasetime = timer + "-" + shi
          // }
          // _this.setData({
          //   all: res.data.result
          // })
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
  onCancel() {
    this.setData({
      hezaia: 0
    })
  },
  // 开始的引导页
  zhidao1() {
    console.log(1)
    this.setData({
      yin1: false
    })
    this.setData({
      yin2: true
    })
  },
  tiaoguo() {
    console.log("跳过")
    this.setData({
      hidden: false
    })
    let count = wx.getStorageSync('count')
    count = "100"
    wx.setStorageSync('count', count);
    console.log(count)
    this.setData({
      yin1: false
    })
    this.setData({
      yin2: false
    })
    this.setData({
      yin3: false
    })
  },
  // 轮播我的手机号的绑定
  phone(e) {
    console.log(e.currentTarget.dataset.phone.indexOf("*"))
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
  },
  // 引导页的第二页
  zhidao2() {
    this.setData({
      yin2: false
    })
    this.setData({
      yin3: true
    })
  },
  // 最后一个引导页
  zhidao3() {
    this.setData({
      yin3: false
    })
    this.setData({
      hidden: false
    })
    let count = wx.getStorageSync('count')
    count = "100"
    wx.setStorageSync('count', count);
  },
  carSearch(e) {
    var _this = this;
    console.log(e.detail.value)
    this.setData({
      carSearch1: e.detail.value,
      xialafenye: 2
    })
  },
  // 关闭活动页
  cuohao() {
    this.setData({
      huodong: false
    })
    wx.setStorage({
      key: 'huodong',
      data: 'true',
    })
  },
  ones() {
    var _this = this
    if (wx.getStorageSync("huodong") == 'true') {
      console.log(12121212)
      this.setData({
        huodong: false
      })
    } else {
      console.log(56565656)
      this.setData({
        huodong: true
      })
    }
  },
  onShow: function() {
    this.ones()
    this.onLoad()

    //  this.onReady()

  },

  // 上拉加载
  onReachBottom: function() {
    var _this = this;
    console.log(_this.data.carSearch1)
    if (_this.data.carSearch1 != "") {
      wx.request({
        url: "" + _this.data.URL + "/carSearch.do", //仅为示例，并非真实的接口地址
        data: {
          describe: _this.data.carSearch1,
          uuid: _this.data.uuid,
          token: _this.data.token,
          page: _this.data.xialafenye,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          var news = _this.data.all
          console.log(res.data.code)
          if (res.data.code == 1) {
            var a = _this.data.xialafenye;
            ++a;
            _this.setData({
              xialafenye: a
            })
            for (var i = 0; i < res.data.result.length; i++) {
              news.push(res.data.result[i])
            }
            _this.setData({
              all: news
            })
            var all = _this.data.all;
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.request({
        url: '' + _this.data.URL + '/carHomePage.do', // 仅为示例，并非真实的接口地址
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          page: _this.data.xialafenye,
          uuid: _this.data.uuid,
          token: _this.data.token,
          address: _this.data.diqulast,
          carName: _this.data.carlast,
          tradeType: _this.data.jiaoyilast,
          capacity: _this.data.newshuj
        },
        success(res) {
          console.log(res)
          var news = _this.data.all
          if (res.data.code == 1) {
            var a = _this.data.xialafenye;
            ++a;
            _this.setData({
              xialafenye: a
            })
            for (var i = 0; i < res.data.result.length; i++) {
              news.push(res.data.result[i])
            }
            console.log(news)
            _this.setData({
              all: news
            })
            var all = _this.data.all;
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
    wx.request({
      url: '' + _this.data.URL + '/homePageLB.do',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid: _this.data.uuid,
        token: _this.data.token
      },
      success(res) {
        _this.setData({
          nice: res.data.result
        })
      }
    })
  },
  // 活动页的跳转
  confirmto() {
    wx.setStorage({
      key: 'huodong',
      data: 'true',
    })
    console.log(wx.getStorageSync("huodong"))
    this.setData({
      'huodong': true
    })
    wx.navigateTo({
      url: '../huodong/huodong',
    })
  }
})