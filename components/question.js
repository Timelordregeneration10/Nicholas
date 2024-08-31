var question = {
    ques: [
        "Nicholas的热点叫什么：", "选出你喜欢的香菜", "Nicholas最后悔看过以下哪一部番？",
        "以下攻击力最高的同学？", "以下哪位同学已脱单", "以下哪部番没有被Nicholas渗透？",
        "霓虹人还没有转生过什么？", "校园七大b王中哪一位作品还没有动画化", "Nicholas在以下哪部番第一次听到酸欠少女さユり的歌？",
        "Nicholas入坑番"
    ],
    choices: [
        [
            "R·M·T", "库拉斯"
        ],
        [
            "歌留多", "夏露", "椎名真由理", "姬柊雪菜"
        ],
        [
            "贤者之孙", "自称贤者子弟的贤者", "失格纹的最强贤者", "彼得格里尔的贤者时间"
        ],
        [
            "高木同学", "长瀞同学", "久保同学", "阿波罗同学"
        ],
        [
            "高木同学", "长瀞同学", "久保同学", "阿波罗同学"
        ],
        [
            "RWBY", "转身成为蜘蛛又怎么样！", "永生之酒"
        ],
        [
            "猪", "自动贩卖机", "米饭", "异性"
        ],
        [
            "洁癖青山", "超能力齐木", "孤僻汤神", "b王坂本", "妄想半田", "木头野崎", "怠惰田中"
        ],
        [
            "人渣的本愿", "莉可莉丝", "只有我不在的街道", "乱步奇谭"
        ],
        [
            "灵笼", "有弯", "Re0", "饿魔搞笑"
        ]
    ],
    responses: [
        [
            "Nicholas的永远正解!", "再怎么说这个热点名字还是太奇怪了!"
        ],
        [
            "骷髅香菜！！！", "还得是法国香菜!", "嘟嘟噜~~", "假粉举报了！"
        ],
        [
            "已经忘了，说明没那么后悔/菜旺", "已经忘了，说明没那么后悔/菜旺", "已经忘了，说明没那么后悔/菜旺", "纯爱战士应声倒地。"
        ],
        [
            "特攻确实极高", "特攻极高的同时物攻也极高！", "主神香菜特攻怎么会不高！", "不但特攻高还擅长贴身）"
        ],
        [
            "详见剧场版结尾，已经是高木太太力！", "两季了！！还没有！！", "再来一季也许可以", "一季超神！"
        ],
        [
            "尼古拉斯大人的意志（原话）", "其实只是因为突然想起这部番所以作为了候选项）", "报社主编！"
        ],
        [
            "《猪肝热热吃（好歹把猪肝热一下啊）》 ", "《转生成自动贩卖机的我今天也在迷宫徘徊》", "想了半天终于想到个没转过的", "有很多，比如《转生成为蜘蛛又怎么样》"
        ],
        [
            "此时青山君一脚100km/h的足球正飞向你（危", "我不信有人选这个", "唯一一个还没动画化！！", "在下坂本，有何贵干", "/恶狠狠的眼神", "？月刊少女……", "zzz"
        ],
        [
            "甚至没有看过……", "虽然但是花の塔究极适合各种神插入", "这个ed配合剧情真的听哭了www", "新月yyds！！！"
        ],
        [
            "那个高三之夜！", "21年？", "其实是高考完之后！", "那是初二那年……"
        ]
    ],
    current: 0,
    scores: [
        [10, 0],
        [10, 10, 10, -10],
        [0, 0, 0, 10],
        [5, 10, 5, 5],
        [10, 0, 0, 10],
        [0, 10, 0],
        [0, 0, 10, 0],
        [0, -10, 10, -20, 0, -10, -5],
        [0, 0, 0, 10],
        [0, 0, 0, 10]
    ],
    totalscore: 0
};

export function generate(Nindex) {
    if (Nindex >= question.choices.length) {
        alert(`你的总得分：${question.totalscore}/100`);                      //to be continued
        return;
    }
    var qe = document.createElement("div");
    qe.innerHTML = `${question.ques[Nindex]}`;
    qe.className = "questions";
    document.getElementById("container").append(qe);
    setTimeout(() => {
        var cho = [];
        for (let i = 0; i < question.choices[Nindex].length; i++) {
            cho[i] = document.createElement("div");
            cho[i].innerHTML = `${question.choices[Nindex][i]}`;
            cho[i].className = "choices";
            setTimeout(() => {                                          //防止在生成完毕之前点击
                cho[i].addEventListener("click", function () {
                    if (Nindex == question.current) {
                        question.current++;
                        var ans = document.createElement("div");
                        ans.innerHTML = `<br>${question.responses[Nindex][i]}<br><br>`;
                        ans.className = "answers";
                        document.getElementById("container").append(ans);
                        question.totalscore += question.scores[Nindex][i];
                        autoscroll = true;
                        setTimeout(() => {
                            generate(Nindex + 1);
                        }, 1010);                                       //答案生成完之后再生成下一题
                        setTimeout(() => {
                            autoscroll = false;
                        }, 3020);                                       //答案，问题，选择都生成完毕之后再关闭自动滚动
                    }
                })
            },1010)
            document.getElementById("container").append(cho[i]);
        }
    }, 1010);
}

var autoscroll = true;

//自动滚动
export function autoscrollfunc() {
    var parent = document.getElementsByClassName('contain-box')[0];
    setInterval(function () {
        if (autoscroll) parent.scrollTop += 2;
    }, 3);
}