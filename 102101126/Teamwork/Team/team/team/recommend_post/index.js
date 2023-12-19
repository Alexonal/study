// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const $ = db.aggregate;
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("community").aggregate() //选择我的审批表
    .lookup({
      from: "user",
      localField: '_openid',
      foreignField: '_openid',
      as: 'u'
    })
    .sort({
      'zan.num': -1
    })
    .limit(10)
    .end({
      success: function (res) {
        return res;
      },
      fail(error) {
        return error;
      }
    })
}