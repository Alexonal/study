// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

var $ = cloud.database().command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("order").aggregate()
    .lookup({
      from: "user",
      localField: 'from',
      foreignField: '_openid',
      as: 'u_from'
    })
    .lookup({
      from: "user",
      localField: 'to',
      foreignField: '_openid',
      as: 'u_to'
    })
    .lookup({
      from: "goods",
      localField: 'good_id',
      foreignField: '_id',
      as: 'good'
    })
    .match({
      'good.deal':true,
      'good.type':2
    })
    // .replaceRoot({
    //   newRoot: $.mergeObjects([$.arrayElemAt(['$u_from', 0]), $.arrayElemAt(['$u_to', 0]), '$$ROOT'])
    // })
    // .project({
    //   u_from: 0,
    //   u_to: 0
    // })
    .end({
      success: function (res) {
        return res;
      },
      fail(error) {
        return error;
      }
    })
}