const db = require("./_ConfigDB");

// 0704 勉勵金句抽卡 - MJ
exports.getRainbowCard = async () => {
    return new Promise((resolve, reject) => {
        let random = Math.floor(Math.random() * 15 + 1)
        let sql =
            "SELECT " +
            "`rainbow_card_content`, `rainbow_card_id` " +
            "FROM `RainbowCard` " +
            "WHERE `rainbow_card_id` = ? "

        db.con.query(sql, random, (err, rows, fields) => {
            if (err) {
                reject(err)
            }
            resolve(db.rowDataToCamelData(rows))
        })
    })
}

// 0704 勉勵金句儲存 - MJ
exports.saveRainbowCard = async (memberId, ranbowCardId) => {
    return new Promise((resolve, reject) => {
        // 檢查金句是否已經存在
        let sqlCheck = "SELECT 1 FROM `RainbowCardItem` WHERE `member_id` = ? AND `rainbow_card_id` = ? LIMIT 1 "
        let value = [memberId, ranbowCardId]
        let exist = db.con.query(sqlCheck, value, (err, results, fields) => {
            if (err) {
                reject(err)
            }
            else {
                if (results[0]) {
                    resolve('already exist',
                        console.log('already exist'))
                }
                else {
                    let sql =
                        "INSERT INTO `RainbowCardItem` " +
                        "(`member_id`, `rainbow_card_id`)" +
                        "VALUE (?, ?) "

                    db.con.query(sql, value, (err, results, fields) => {
                        if (err) {
                            reject(err)
                        }
                        resolve('儲存成功')
                    })
                }
            }
        })
    })
}