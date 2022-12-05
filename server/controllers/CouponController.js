const couponModel = require("../models/CouponModel");
const configController = require("./_ConfigController");
const jwt = require('jsonwebtoken'); //token
const { application } = require("express");
const { promisify } = require('util'); // nodejs原生
const db = require("../models/_ConfigDB");
const { encode } = require("punycode");
const fs = require("fs");
const { Console } = require("console");

// 0704 取得會員coupon明細 - MJ 
exports.getCouponByMemberId = async (req, res) => {
    const { token } = req.body;
    if (token) {
        //   解碼
        const decoded = await promisify(jwt.verify)(token, "jwtSecret")
        const { memberId } = decoded
        // let memberId = 2

        if (memberId) {
            try {
                let usableCouponlist = await couponModel.getUsableCouponByMemberId(memberId)
                let UnusableCouponByMemberId = await couponModel.getUnusableCouponByMemberId(memberId)
                configController.sendJsonMsg(res, true, "", { usableCouponlist, UnusableCouponByMemberId })
            } catch (error) {
                configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"])
                console.log(error)
            }
        } else {
            configController.sendJsonMsg(res, false, "memberId有誤", "")
        }
    } else {
        res.json({ message: "該用戶尚未登入" })
    }
}

// 0705 coupon生成 - MJ
exports.createCoupon = async (req, res) => {
    let data = req.body
    let memberId = data['member_id']
    let couponId = data['coupon_id']
    let count = data['count']
    for (i = 0; i < count; i++) {
        await couponModel.createCoupon(memberId, couponId)
    }
    configController.sendJsonMsg(res, true, "", 'done')
}