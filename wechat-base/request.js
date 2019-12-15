// export default function request(url, params, http) {  
//   wx.request({
//     url: url, // 仅为示例，并非真实的接口地址
//     data: params,
//     method: http,
//     dataType: 'json',
//     header: {
//       'content-type': 'application/x-www-form-urlencoded' // 默认值
//     },
//     success(res) {
//       console.log(res.data)
//       return res.data
//     }
//   })
// }
// 参数1 ：请求的接口地址
// 参数2 ：请求需要传递的参数
// // 参数3 ：请求的方式 get/post
var province_list = {}
var city_list = {}
var county_list = {}
wx.request({
  url: 'https://www.zzjzj.net/jzj-app/other/getAddress.do', //仅为示例，并非真实的接口地址
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    var arr = res.data.result

    for (var i = 0; i < arr.length; i++) {
      province_list[arr[0].id] = "全国"
      province_list[arr[i].id - "" + 10000] = arr[i].name
      for (var j = 0; j < arr[i].cityList.length; j++) {
        city_list[arr[i].cityList[j].id-""+ 100] = arr[i].cityList[j].name;
        for (var k = 0; k < arr[i].cityList[j].cityList.length; k++) {
          county_list[arr[i].cityList[j].cityList[0].id] = "不限"
          county_list[arr[i].cityList[j].cityList[k].id - "" + 1] = arr[i].cityList[j].cityList[k].name
        }
      }
    }
    console.log(province_list, city_list, county_list)
  }
})










// ---------------------------------可以用的版本
// wx.request({
    //   url: "https://www.zzjzj.net/zzjzj/getAddress.do", //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     // console.log(res.data)
    //     var arr = res.data.result

    //     for (var i = 0; i < arr.length; i++) {
    //       // province_list[arr[0].id] = "全国"
    //       province_list[arr[i].id] = arr[i].name
    //       for (var j = 0; j < arr[i].cityList.length; j++) {
    //         // city_list[arr[i].cityList[0].cityList[0].id] = "不限"
    //         city_list[arr[i].cityList[j].id] = arr[i].cityList[j].name;
    //         for (var k = 0; k < arr[i].cityList[j].cityList.length; k++) {
    //           county_list[arr[i].cityList[j].cityList[0].id] = "不限"
    //           county_list[arr[i].cityList[j].cityList[k].id - "" + 1] = arr[i].cityList[j].cityList[k].name
    //         }
    //       }
    //     }
    //     // console.log(province_list, city_list)
    //     var ac = _this.data.a
    //     ac["province_list"] = province_list;
    //     ac["city_list"] = city_list
    //     ac["county_list"] = county_list
    //     // console.log(ac)
    //     _this.setData({
    //       a: ac
    //     })
    //     // console.log(_this.data.a)
    //   }
    // })
