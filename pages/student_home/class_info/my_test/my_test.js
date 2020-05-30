var t = getApp();

Page({
    data: {
        listoptions: null,
        testList: null,
        istestNull: !0,
        testdoneList: null,
        istestdoneNull: !0,
        classId: 0,
        testid: "",
        testname: "",
        title: "",
        tag: [ "未完成", "已完成", "已过期" ],
        classList: [ {
            name: "",
            id: "",
            teacher_id: ""
        } ],
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        TabCur: 0,
        scrollLeft: 0,
        classInput: "",
        modalName: "",
        modaltext: "",
        hasResult: !1,
        result: "zongyoushenme",
        hidden: !0
    },
    tabSelect: function(t) {
        this.setData({
            TabCur: t.currentTarget.dataset.id,
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1)
        });
    },
    modalConfirm: function() {
        wx.navigateTo({
            url: "../do_test/do_test?testid=" + this.data.testid + "&testname=" + this.data.testname + "&classId=" + this.data.classId + "&title=" + this.data.title
        }), this.setData({
            hidden: !0
        });
    },
    modalCancel: function() {
        this.setData({
            hidden: !0
        });
    },
    dotest: function(t) {
        this.data.testid = t.currentTarget.dataset.id, this.data.testname = t.currentTarget.dataset.name, 
        console.log("testId=" + this.data.testid + "test名=" + this.data.testname), this.setData({
            hidden: !1
        });
    },
    loadlist: function() {
        var a = this;
        wx.request({
            url: t.globalData.ip + "/student/gettest",
            data: {
                classId: this.data.classId,
                openId: t.globalData.openId
            },
            success: function(t) {
                a.setData({
                    testList: t.data
                });
                var e = [ {} ];
                console.log(a.data.testList.length);
                for (var s = 0; s < a.data.testList.length; s++) {
                    e[s] = {}, e[s].name = a.data.testList[s].testname, e[s].id = a.data.testList[s].testid, 
                    e[s].starttime = a.data.testList[s].starttime;
                    var n = a.data.testList[s].endtime;
                    n = n.substring(5, 17), e[s].endtime = n;
                    var i = a.data.testList[s].testname;
                    i = i.substring(0, 1), e[s].iconn = i;
                }
                0 != a.data.testList.length && a.setData({
                    testList: e,
                    istestNull: !1
                });
            }
        }), wx.request({
            url: t.globalData.ip + "/student/getdonetest",
            data: {
                classId: this.data.classId,
                openId: t.globalData.openId
            },
            success: function(t) {
                a.setData({
                    testdoneList: t.data
                });
                var e = [ {} ];
                console.log(a.data.testdoneList.length);
                for (var s = 0; s < a.data.testdoneList.length; s++) {
                    e[s] = {}, e[s].name = a.data.testdoneList[s].testname, e[s].id = a.data.testdoneList[s].testid, 
                    e[s].starttime = a.data.testdoneList[s].starttime;
                    var n = a.data.testdoneList[s].endtime;
                    n = n.substring(5, 17), e[s].endtime = n;
                    var i = a.data.testdoneList[s].testname;
                    i = i.substring(0, 1), e[s].iconn = i, e[s].score = a.data.testdoneList[s].score;
                }
                0 != a.data.testdoneList.length && a.setData({
                    testdoneList: e,
                    istestdoneNull: !1
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            classId: t.classId,
            title: t.title
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    swichNav: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    },
    goToClass: function(t) {
        wx.navigateTo({
            url: "../class/class?id=" + t.currentTarget.dataset.id + "&name=" + t.currentTarget.dataset.name
        });
    },
    showdetail: function(a) {
        console.log("showdetail");
        console.log(a.currentTarget.dataset.testid), wx.request({
            url: t.globalData.ip + "/student/iftestcan",
            data: {
                testId: a.currentTarget.dataset.testid
            },
            success: function(t) {
                console.log(t.data), "可以查询" == t.data ? wx.navigateTo({
                    url: "./show_result/show_result?testid=" + a.currentTarget.dataset.testid
                }) : "未完成" == t.data ? wx.showToast({
                    title: "您未完成该测验",
                    icon: "none",
                    duration: 1500
                }) : wx.showToast({
                    title: "该测验暂不在查询时间内",
                    icon: "none",
                    duration: 1500
                });
            },
            fail: function() {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.loadlist();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});