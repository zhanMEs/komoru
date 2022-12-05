const db = require("./_ConfigDB");

// -------------------------------------------
// 2022-06-24 MJ
// 取得人格測驗答案並對照資料表給出相應活動包
exports.getPersonality = (data) => {
    var personality = data['qTwoAnsValue']
    // return new Promise(function (reslove, reject) {
    switch (personality) {
        case 'ESFP':
        case 'INTJ':
            return {
                "personality": `天生藝術家`,
                "personalityDescribe": [
                    `想象力豐富卻很果斷，充满好奇心但從不浪費精力、喜歡研究新設計，對各種風格駕輕就熟。你熱愛聚光燈，世界就是你的舞台。在朋友面前也會極盡表演，聊天時炫弄自己獨特而不失率直的幽默感，努力成為目光的焦點，讓每一次外出都彷彿置身於派對之中。`,

                    `“我自私，没耐心，還有點缺少安全感。 我會犯错，會失控，而且有时讓人難以應付。 但如果你接受不了我最壞的一面，你就不配擁有我最好的一面。”`,

                    `“你並非有權利發表看法。 你的權利是發表有根據的看法。 没人有無知的權利。”`],
                "activePackType": `0`
            }

        case 'ENFJ':
        case 'ENTJ':
        case 'ESFJ':
        case 'ESTJ':
        case 'ESTP':
            return {
                "personality": `霸道總裁`,
                "personalityDescribe": [
                    `霸道總裁的你是天生的領導者。天生具有魅力和信心，散發的權威性能召集大家為著一個共同目標努力。你的性格中有著近乎殘酷的理性，用强大的動力、堅定的决心和鋒芒畢露的思想實現為自己制定的一切目標。`,

                    `“你的時間是有限的，所以不要浪費它為别人而活。不要陷入教條、活在其他人的思想成果之中。不要讓他人意見產生的噪音淹沒你自己的心聲。最重要的是，要擁有追随你内心和直覺的勇氣。”`],
                "activePackType": `1`
            }

        case 'INFP':
        case 'ISFJ':
        case 'ISTJ':
            return {
                "personality": `最強輔助`,
                "personalityDescribe": [
                    `謙遜、低調的方式幫助世界運轉。對周圍的人有一種強烈的責任感。記住生日和特殊場合，並以關懷和支持的姿態向你所愛的人致敬。但卻很少要求對你所做事情得到認可，而是寧願在幕後運作。能幹且擁有多才多藝的天賦。雖然敏感，你也有出色的分析能力和對細節的關注。儘管有所保留，但往往擁有發達的人際交往能力和穩固的社會關係。你的各種優勢甚至在日常生活中最普通的方面也閃耀著光芒。`,

                    `“愛只有在分享中成長。只有把它送給別人，你才能為自己擁有更多。”`,

                    `“凡是金子都不會發光；不是所有流浪的人都迷失了；強壯的老人不會枯萎；霜凍不及深根。”`
                ],
                "activePackType": `2`
            }

        case 'ENFP':
        case 'ENTP':
        case 'INFJ':
            return {
                "personality": `左右逢源`,
                "personalityDescribe": [
                    `具有與生俱來的理想主義和道德感，但真正令你與其他理想主義人格類型區分開來的是你果斷決絕。不是懶散的空想家，而是能腳踏實地完成目標，留下深遠的積極影響的人。集各種特質於一身： 輕言細語卻很有看法，為自己的信念不懈奮鬥。堅決果斷，但不會把精力用在一己私利上，你並非為了創造優勢，而是建立平衡。平等主義和因果報應是對你很有吸引力的思想，相信用愛和同情來感化暴君的心是幫助這個世界最好的方式。`,

                    `“每個人都需要做出選擇，是走在富有創造力的利他主義之光中，還是具有破壞性的自私自利的黑暗中。”`
                ],
                "activePackType": `3`
            }

        case 'INTP':
        case 'ISFP':
        case 'ISTP':
            return {
                "personality": "冒險王",
                "personalityDescribe": [
                    `探險家人格類型的你是真正的藝術家，這並不是說你是通常意義上的興高采烈到郊外畫幾棵小樹的畫家。但通常都精於此道。會運用審美，設計，甚至選擇和行動來打破社會常規。探險家人格類型的人喜歡用美感和行為方面的實驗來顛覆傳統的期望。你可能常常掛嘴邊說不止一次“不要控制我！”你生活在一個多彩感性的世界，與人們和想法的聯繫會讓你深受啟發。你樂於重新解讀這些聯繫，利用自身和新的視角重新實驗和發明。沒有人比你更喜歡用這種方式去探索和體驗。`,

                    `“在一天中我會變化。醒來時是一個人，睡覺時卻明明是另一個人。”`
                ],
                "activePackType": `4`
            }
    }
}

// 2022-06-24 MJ
// 取得活動包後將資料存入ExamItem資料表中
exports.saveExamData = (data) => {
    return new Promise((reslove, reject) => {
        // 駝峰轉換_ Func.
        function decamelize(string, options) {
            options = options || {};
            var separator = options.separator || '_'
            var split = options.split || /(?=[A-Z])/
            return string.split(split).join(separator).toLowerCase()
        }
        // 創建日期
        data['createDatetime'] = db.getDateTimeNow()

        // 駝峰轉換_
        for (key in data) {
            var newKey = decamelize(key)
            if (newKey) {
                data[newKey] = data[key]
                delete data[key]
            }
        }

        // 把資料存入SQL
        db.con.query('INSERT INTO ExamItem SET ?', data, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            reslove(
                console.log('The solution is: ', results)
            )
        })
    })
}