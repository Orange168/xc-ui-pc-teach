import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//我的课程列表
export const findPicList = (page,size,params) => {
//使用工具类将json对象转成key/value
  let queries = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+"/course/pictures/list/"+page+"/"+size+"?"+queries)
}

//del picture
export const delPic = (path) => {
  return http.requestPost(apiUrl+"/course/pictures/del/"+path);
}
