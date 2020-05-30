var t = getApp();

Page({
    data: {
        historys: [],
        selectedjobId: "",
        classId: "",
        hlist: [],
        oldstate: "",
        newstate: "",
        hid: "",
        jobId: "",
        type: "",
        checkbox: [ {
            value: 0,
            name: "已签",
            checked: !0,
            hot: !1,
            color: "green"
        }, {
            value: 1,
            name: "未签",
            checked: !1,
            hot: !1,
            color: "red"
        }, {
            value: 2,
            name: "迟到",
            checked: !1,
            hot: !0,
            color: "yellow"
        }, {
            value: 3,
            name: "请假",
            checked: !1,
            hot: !0,
            color: "blue"
        } ],
        isshow: !1,
        canchange: !1
    },
    updatestate: function() {
        var a = this;
        a.data.oldstate != a.data.newstate ? wx.request({
            url: t.globalData.ip + "/teacher/updatestudentstate",
            data: {
                id: a.data.hid,
                classId: a.data.classId,
                sid: a.data.jobId,
                newstate: a.data.newstate,
                oldstate: a.data.oldstate,
                type: a.data.type
            },
            success: function(t) {
                "更改成功" == t.data && wx.showToast({
                    title: "更改成功"
                }), a.hideModal(), a.gethistory();
            }
        }) : wx.showToast({
            title: "签到状态未改变！",
            icon: null,
            duration: 2e3
        });
    },
    ChooseCheckbox: function(t) {
        for (var a = this.data.checkbox, e = t.currentTarget.dataset.value, s = this, o = 0, d = a.length; o < d; ++o) a[o].value == e ? (a[o].checked = !0, 
        s.setData({
            newstate: a[o].name
        })) : a[o].checked = !1;
        this.setData({
            checkbox: a
        }), console.log(a);
    },
    hideModal: function() {
        this.setData({
            isshow: !1
        });
    },
    showmodel: function(a) {
        var e = this;
        console.log("hid+" + e.data.hid), 0 != e.data.hid ? wx.request({
            url: t.globalData.ip + "/teacher/canchange",
            data: {
                id: e.data.hid,
                type: e.data.type
            },
            success: function(t) {
                if ("can" == t.data) {
                    var s = e.data.checkbox;
                    console.log(a.currentTarget.dataset.state), console.log(a.currentTarget.dataset.jobid), 
                    e.setData({
                        oldstate: a.currentTarget.dataset.state,
                        newstate: a.currentTarget.dataset.state,
                        jobId: a.currentTarget.dataset.jobid
                    }), "已签" == a.currentTarget.dataset.state ? (s[0].checked = !0, s[1].checked = !1, 
                    s[2].checked = !1,s[3].checked = !1) : "未签" == a.currentTarget.dataset.state ? (s[0].checked = !1, 
                    s[1].checked = !0, s[2].checked = !1,s[3].checked = !1) :"迟到" == a.currentTarget.dataset.state ? (s[0].checked = !1, s[1].checked = !1, s[2].checked = !0,s[3].checked = !1):(s[0].checked = !1, s[1].checked = !1, s[2].checked = !1,s[3].checked = !0), 
                    e.setData({
                        checkbox: s
                    }), console.log(e.data.checkbox), e.setData({
                        isshow: !0,
                        jobId: a.currentTarget.dataset.jobid
                    });
                } else wx.showToast({
                    title: "未结束不可更改"
                });
            }
        }) : wx.showToast({
            title: "未结束不可更改"
        });
    },
    refresh: function() {
        this.gethistory();
    },
    gethistory: function() {
        var a = this;
        wx.request({
            url: t.globalData.ip + "/teacher/getdehistory",
            data: {
                id: a.data.hid,
                classId: a.data.classId,
                type: a.data.type
            },
            success: function(t) {
                console.log("type+" + a.data.type), wx.hideLoading(), a.setData({
                    historys: t.data
                });
                var e = [ {} ];
                console.log("zheshi" + a.data.historys.length);
                for (var s = 0; s < a.data.historys.length; s++) e[s] = {}, e[s].name = a.data.historys[s].name, 
                e[s].jobId = a.data.historys[s].jobId, e[s].isCheckedIn = a.data.historys[s].isCheckedIn, 
                e[s].iconn = a.data.historys[s].name.substring(0, 1);
                0 == t.data.length ? (a.setData({
                    hlist: [],
                    isNull: !0
                }), console.log("isNull" + a.data.isNull)) : (a.setData({
                    hlist: e,
                    isNull: !1,
                    listCur: e[0]
                }), console.log("isNull" + a.data.isNull));
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "加载失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this, e = "";
        e = "定位签到" == t.type ? "location" : "学生签到" == t.type ? "sface" : "face", a.setData({
            hid: t.sid,
            classId: t.classId,
            type: e
        }), console.log("id" + a.data.hid), console.log("sid" + a.data.type), console.log("classId" + a.data.classId), 
        this.gethistory();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});