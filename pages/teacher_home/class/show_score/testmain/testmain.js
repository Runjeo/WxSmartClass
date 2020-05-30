function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp();

Page({
    data: (a = {
        tag: [ "统计情况", "精确查询", "整体情况" ],
        stestitemList: [],
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        TabCur: 0,
        scrollLeft: 0,
        studentList: [ {
            name: "崔闰杰",
            id: "191607030015",
            score: "90"
        } ],
        nameInput: "请输入学生姓名或学号",
        modalName: "",
        modaltext: "",
        hasResult: !1,
        result: "zongyoushenme",
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        Custom: e.globalData.Custom
    }, t(a, "TabCur", 0), t(a, "MainCur", 0), t(a, "isNull", !0), t(a, "VerticalNavTop", 0), 
    t(a, "value", 0), t(a, "a", ""), t(a, "b", ""), t(a, "c", ""), t(a, "d", ""), t(a, "na", ""), 
    t(a, "nb", ""), t(a, "nc", ""), t(a, "nd", ""), t(a, "answer", ""), t(a, "testitemList", []), 
    t(a, "modalName", null), t(a, "testId", ""), t(a, "title", ""), a),
    showdetail: function(t) {
        this.setData({
            modalName: "setWeightModal",
            value: t.currentTarget.dataset.value,
            num: t.currentTarget.dataset.num,
            answer: t.currentTarget.dataset.answer,
            a: t.currentTarget.dataset.a,
            b: t.currentTarget.dataset.b,
            c: t.currentTarget.dataset.c,
            d: t.currentTarget.dataset.d,
            na: t.currentTarget.dataset.na,
            nb: t.currentTarget.dataset.nb,
            nc: t.currentTarget.dataset.nc,
            nd: t.currentTarget.dataset.nd,
            all: t.currentTarget.dataset.all
        });
    },
    querryscore: function() {
        var t = this;
        wx.request({
            url: e.globalData.ip + "/teacher/querryscore",
            data: {
                name: this.data.nameInput,
                testId: this.data.testId
            },
            success: function(a) {
                var e;
                "查询失败!" == a.data ? (e = "查询失败，请检查姓名或学号输入是否有误！", t.setData({
                    stestitemList: ""
                })) : "该同学未完成该作业!" == a.data ? (e = "该同学未完成该作业!", t.setData({
                    stestitemList: ""
                })) : (e = "查询" + t.data.nameInput + "成功!", t.setData({
                    stestitemList: a.data
                })), t.setData({
                    result: e,
                    hasResult: !0,
                    modalName: null
                });
            }
        });
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    tabSelect: function(t) {
        this.setData({
            TabCur: t.currentTarget.dataset.id,
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1)
        });
    },
    goquerry: function(t) {
        console.log("goquerry"), this.setData({
            TabCur: 1,
            scrollLeft: 0,
            nameInput: t.currentTarget.dataset.name
        }), this.querryscore();
    },
    setWeight: function() {},
    loadlist: function() {
        var t = this;
        wx.request({
            url: e.globalData.ip + "/teacher/gettestdetail",
            data: {
                testId: this.data.testId
            },
            success: function(a) {
                console.log("gettestdetailsuccess"), t.setData({
                    testitemList: a.data
                });
                var e = [ {} ];
                console.log(t.data.testitemList.length);
                for (var s = 0; s < t.data.testitemList.length; s++) e[s] = {}, e[s].content = t.data.testitemList[s].content, 
                e[s].all = t.data.testitemList[s].all, e[s].value = t.data.testitemList[s].value, 
                console.log("daan" + t.data.testitemList[s].real), e[s].answer = t.data.testitemList[s].real, 
                e[s].a = t.data.testitemList[s].a, e[s].b = t.data.testitemList[s].b, e[s].c = t.data.testitemList[s].c, 
                e[s].d = t.data.testitemList[s].d, e[s].na = t.data.testitemList[s].na, e[s].nb = t.data.testitemList[s].nb, 
                e[s].nc = t.data.testitemList[s].nc, e[s].nd = t.data.testitemList[s].nd, e[s].num = t.data.testitemList[s].num;
                console.log("bijiaolength"), 0 != t.data.testitemList.length && t.setData({
                    testitemList: e,
                    isNull: !1
                }), console.log("bijiaojieshu ");
            }
        }), wx.request({
            url: e.globalData.ip + "/teacher/querryallscore",
            data: {
                testId: this.data.testId
            },
            success: function(a) {
                console.log("gettestdetailsuccess"), t.setData({
                    studentList: a.data
                });
            }
        });
    },
    nameInput: function(t) {
        this.setData({
            nameInput: t.detail.value
        });
    },
    search: function() {
        var t = this;
        console.log("search" + this.data.nameInput), "" == this.data.nameInput ? t.setData({
            modalName: "Modal",
            modaltext: "请输入姓名或学号！"
        }) : t.querryscore();
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            testId: t.testid,
            title: t.name
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        });
    },
    onShow: function() {
        this.loadlist();
    }
});