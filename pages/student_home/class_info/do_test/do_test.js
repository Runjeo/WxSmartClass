var t = getApp();

Page({
    data: {
        issubmited: !1,
        num: 0,
        title: "",
        testname: "",
        testitemList: [],
        testid: "",
        answerList: [],
        classId: ""
    },
    submitanwser: function() {
        console.log("submit");
        var a = this, e = 0, s = 0, i = !0, n = !1, o = void 0;
        try {
            for (var r, d = this.data.testitemList[Symbol.iterator](); !(i = (r = d.next()).done); i = !0) {
                r.value;
                e++;
            }
        } catch (t) {
            n = !0, o = t;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (n) throw o;
            }
        }
        this.data.num = e;
        var l = !0, u = !1, c = void 0;
        try {
            for (var h, w = this.data.answerList[Symbol.iterator](); !(l = (h = w.next()).done); l = !0) {
                h.value;
                s++;
            }
        } catch (t) {
            u = !0, c = t;
        } finally {
            try {
                !l && w.return && w.return();
            } finally {
                if (u) throw c;
            }
        }
        console.log(e), console.log(s), e != s ? wx.showToast({
            title: "有题目未完成！",
            duration: 2e3
        }) : 1 == this.data.issubmited ? wx.showToast({
            title: "请不要重复提交！",
            duration: 2e3
        }) : (this.data.issubmited = !0, wx.showModal({
            title: "提示",
            content: "本次提交完后无法修改，是否提交？",
            success: function(e) {
                if (e.confirm) {
                    wx.showLoading({
                        title: "提交中"
                    }), wx.request({
                        url: t.globalData.ip + "/student/submitanswer",
                        data: {
                            answerList: a.data.answerList,
                            openId: t.globalData.openId,
                            testId: a.data.testid
                        },
                        success: function(t) {
                            wx.hideLoading(), "提交成功" == t.data ? wx.showToast({
                                title: "提交成功",
                                duration: 1e3
                            }) : wx.showToast({
                                icon: "fail",
                                title: "提交失败",
                                duration: 1e3
                            });
                        }
                    }), console.log("用户点击确定");
                    var s = getCurrentPages(), i = s[s.length - 2];
                    i.setData({
                        classId: a.data.classId,
                        title: a.data.title
                    });
                    i.onShow(), wx.navigateBack({});
                } else a.setData({
                    issubmited: !1
                });
            }
        }));
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：" + t.detail.value + "index=" + t.currentTarget.dataset.arrayindex), 
        console.log("itemid=" + t.currentTarget.dataset.id);
        var a = 0, e = !1, s = !0, i = !1, n = void 0;
        try {
            for (var o, r = this.data.answerList[Symbol.iterator](); !(s = (o = r.next()).done); s = !0) {
                if (o.value.testitemid == t.currentTarget.dataset.id) {
                    e = !0;
                    break;
                }
                a += 1;
            }
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !s && r.return && r.return();
            } finally {
                if (i) throw n;
            }
        }
        0 == e ? this.data.answerList.push({
            testitemid: t.currentTarget.dataset.id,
            answer: t.detail.value
        }) : this.data.answerList[a].answer = t.detail.value, console.log(this.data.answerList), 
        console.log("当前索引为：" + a);
    },
    dotest: function(t) {
        wx.showToast({
            title: "你选择了选项" + t.currentTarget.dataset.option
        }), console.log("你选择了选项" + t.currentTarget.dataset.option + "index=" + t.currentTarget.dataset.arrayindex), 
        console.log("itemid=" + t.currentTarget.dataset.id);
        var a = 0, e = !1, s = !0, i = !1, n = void 0;
        try {
            for (var o, r = this.data.answerList[Symbol.iterator](); !(s = (o = r.next()).done); s = !0) {
                if (o.value.tid == t.currentTarget.dataset.id) {
                    e = !0;
                    break;
                }
                a += 1;
            }
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !s && r.return && r.return();
            } finally {
                if (i) throw n;
            }
        }
        0 == e ? this.data.answerList.push({
            tid: t.currentTarget.dataset.id,
            answer: t.currentTarget.dataset.option
        }) : this.data.answerList[a].answer = t.currentTarget.dataset.option, console.log(this.data.answerList), 
        console.log("当前索引为：" + a);
    },
    onLoad: function(a) {
        this.data.testname = a.testname, this.data.testid = a.testid, this.data.classId = a.classId, 
        this.data.title = a.title;
        var e = a.testid, s = this;
        wx.request({
            url: t.globalData.ip + "/student/getrandomtestitem",
            data: {
                testid: e,
                openid: t.globalData.openId
            },
            success: function(t) {
                s.setData({
                    testitemList: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});