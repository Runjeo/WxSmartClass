var a = getApp();

Page({
    data: {
        isclassNull: !0,
        iconList: [ {
            icon: "edit",
            color: "green",
            badge: 0,
            name: "修改信息",
            tap: "editor"
        }, {
            icon: "edit",
            color: "orange",
            badge: 0,
            name: "课程管理",
            tap: "up"
        }, {
            icon: "profilefill",
            color: "red",
            badge: 0,
            name: "切换用户",
            tap: "switch"
        } ],
        gridCol: 3,
        showviewclass: !0,
        classList: [],
        classIda: "",
        openpwd: "",
        hidden2: !0
    },
    upface: function() {
        wx.navigateTo({
            url: "./upface/upface"
        });
    },
    editor: function() {
        wx.redirectTo({
            url: "./modifyinf/modifyinf?type=1"
        });
    },
    class_manage: function() {},
    switch: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    formInputclassIda: function(a) {
        this.setData({
            classIda: a.detail.value
        });
    },
    formInputpwd: function(a) {
        this.setData({
            openpwd: a.detail.value
        });
    },
    cancel: function() {
        this.setData({
            hidden2: !0,
            classIda: "",
            openpwd: ""
        });
    },
    showaddclass: function() {
        this.setData({
            hidden2: !1
        });
    },
    formSubmit: function() {
        var t = this;
        "" != t.data.classIda ? (wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: a.globalData.ip + "/student/addclass",
            data: {
                openId: a.globalData.openId,
                classId: t.data.classIda,
                passwd: t.data.openpwd
            },
            success: function(a) {
                wx.hideLoading(), wx.showToast({
                    title: a.data,
                    icon: "none",
                    duration: 1e3
                }), "添加成功" == a.data && (t.loadlist(), t.setData({
                    hidden2: !0
                }));
            },
            fail: function(a) {
                wx.hideLoading(), wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        })) : wx.showToast({
            title: "ID不能为空",
            icon: "none",
            duration: 700
        });
    },
    loadlist: function() {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/student/getclass",
            data: {
                openId: a.globalData.openId
            },
            success: function(a) {
                t.setData({
                    classList: a.data
                });
                var s = [ {} ];
                console.log(t.data.classList.length), 0 != t.data.classList.length && t.setData({
                    isclassNull: !1
                });
                for (var n = 0; n < t.data.classList.length; n++) {
                    s[n] = {}, s[n].name = t.data.classList[n].name, s[n].id = t.data.classList[n].id, 
                    s[n].teacher_id = t.data.classList[n].teacher_id;
                    var e = t.data.classList[n].name;
                    e = e.substring(0, 1), s[n].iconn = e;
                }
                t.setData({
                    classList: s
                });
            }
        });
    },
    changeview: function(a) {
        var t = this;
        console.log(a.currentTarget.dataset.value), "class" == a.currentTarget.dataset.value ? (console.log("bindtapkecheng"), 
        t.setData({
            showviewclass: !0
        })) : (console.log("bindtapwode"), t.setData({
            showviewclass: !1
        }));
    },
    goToClass: function(a) {
        wx.navigateTo({
            url: "./class_info/class_info?id=" + a.currentTarget.dataset.id + "&name=" + a.currentTarget.dataset.name
        });
    },
    onLoad: function(a) {},
    onReady: function() {
        this.data.classList;
        wx.request({
            url: a.globalData.ip + "/student/getinfo",
            data: {
                openId: a.globalData.openId
            },
            success: function(a) {
                "" != a.data.name && "" != a.data.jobId && "" != a.data.faceToken || wx.navigateTo({
                    url: "./modifyinf/modifyinf?type=0"
                });
            }
        });
    },
    onShow: function() {
        this.loadlist();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});