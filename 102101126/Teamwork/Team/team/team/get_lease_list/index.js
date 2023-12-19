// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const _ = db.command;
var $ = _.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  return db.collection("order").aggregate()
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
    .match(
      _.and([
        _.or([
          {'u_from._openid':wxContext.OPENID},
          {'u_to._openid':wxContext.OPENID}
        ]),
        {
          'good.type':3,
          'good.deal':true
        }
      ])
    )
    // .match({
    //   'good.deal':true,
    //   'good.type':3
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