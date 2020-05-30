var t = getApp();

Page({
    data: {
        isstudentNull: !0,
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
            tap: "change"
        }, {
            icon: "profilefill",
            color: "red",
            badge: 0,
            name: "切换用户",
            tap: "switch"
        } ],
        gridCol: 3,
        showviewclass: !0,
        studentList: [],
        studentIda: "",
        openpwd: "",
        hidden2: !0
    },
    editor: function() {
        wx.navigateTo({
            url: "./modifyinf/modifyinf"
        });
    },
    student_manage: function() {},
    switch: function() {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    formInputstudentIda: function(t) {
        this.setData({
            studentIda: t.detail.value
        });
    },
    formInputpwd: function(t) {
        this.setData({
            openpwd: t.detail.value
        });
    },
    cancel: function() {
        this.setData({
            hidden2: !0,
            studentIda: "",
            openpwd: ""
        });
    },
    showaddstudent: function() {
        this.setData({
            hidden2: !1
        });
    },
    formSubmit: function() {
        var n = this;
        "" != n.data.studentIda ? (wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: t.globalData.ip + "/student/addstudent",
            data: {
                openId: t.globalData.openId,
                studentId: n.data.studentda,
                passwd: n.data.openpwd
            },
            success: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t.data,
                    icon: "none",
                    duration: 1e3
                }), "添加成功" == t.data && (n.loadlist(), n.setData({
                    hidden2: !0
                }));
            },
            fail: function(t) {
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
        var n = this;
        wx.request({
            url: t.globalData.ip + "/teacher/getstudents",
            data: {
                classId: t.globalData.classId
            },
            success: function(t) {
                n.setData({
                    studentList: t.data
                });
                var a = [ {} ];
                console.log(n.data.studentList.length), 0 != n.data.studentList.length && n.setData({
                    isstudentNull: !1
                });
                for (var e = 0; e < n.data.studentList.length; e++) {
                    a[e] = {}, a[e].name = n.data.studentList[e].name, a[e].id = n.data.studentList[e].id;
                    var d = n.data.studentList[e].name;
                    d = d.substring(0, 1), a[e].iconn = d;
                }
                n.setData({
                    studentList: a
                });
            }
        });
    },
    onLoad: function(t) {},
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