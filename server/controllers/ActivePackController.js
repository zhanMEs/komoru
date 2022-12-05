const configController = require("./_ConfigController")
const activePackModel = require("../models/ActivePackModel");

// -----------------------------------------------------------
// 2022-06-28 MJ
// 獲得活動包data by activePackType, cityId
exports.getActivePackData = async (req, res) => {
    let data = req.body
    let packType = data['activePackType']
    let cityId = data['cityId']
    let join = data['joinTotal']
    let randomActivePack = exports.randomActivePack(packType)
    let D2ActivePack = randomActivePack[0]
    let D3ActivePack = randomActivePack[1]

    // 讓傳進來的東西有問題也不會掛掉
    if (packType) {
        // 先查好3天行程
        let D1 = await activePackModel.getActivePackDataByTypeAndCity(packType, cityId)
        let D2 = await activePackModel.getActivePackDataByTypeAndCity(D2ActivePack, cityId)
        let D3 = await activePackModel.getActivePackDataByTypeAndCity(D3ActivePack, cityId)
        configController.sendJsonMsg(res, true, '', { D1, D2, D3 })      
    }
    else {
        configController.sendJsonMsg(res, false, 'activePackType有誤', [])
    }
}

// 2022-06-29 MJ
// 給出隨機活動包 (0-4)
exports.randomActivePack = (packType) => {
    var allPack = ['0', '1', '2', '3', '4']
    // 刪除陣列中指定元素
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    }
    allPack.remove(packType)

    // 隨機取得陣列中的元素
    var randomPack = []
    var length = allPack.length
    for (i = 0; i < length; i++) {
        let long = allPack.length
        let random = Math.round(Math.random() * (long - 1))
        randomPack.push(allPack[random])
        allPack.splice(random, 1)
    }
    // 回傳隨機活動包 []
    return randomPack
}
