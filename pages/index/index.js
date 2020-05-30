var o = getApp();

Page({
    data: {
        motto: "",
        userInfo: {},
        hasUserInfo: !0,
        autoLogin: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    btnTeacher: function() {
        wx.request({
            url: o.globalData.ip + "choosejob",
            data: {
                openId: o.globalData.openId,
                choice: "teacher"
            }
        }), wx.request({
            url: o.globalData.ip + "/teacher/getinfo",
            data: {
                openId: o.globalData.openId
            },
            success: function(o) {
                "" == o.data.name || "" == o.data.jobId ? wx.navigateTo({
                    url: "../teacher_home/fill_info/fill_info?type=0"
                }) : wx.navigateTo({
                    url: "../teacher_home/teacher_main/teacher_main"
                });
            }
        });
    },
    btnStudent: function() {
        wx.request({
            url: o.globalData.ip + "choosejob",
            data: {
                openId: o.globalData.openId,
                choice: "student"
            }
        }), wx.request({
            url: o.globalData.ip + "/student/getinfo",
            data: {
                openId: o.globalData.openId
            },
            success: function(o) {
                "" == o.data.name || "" == o.data.jobId || "" == o.data.faceToken ? wx.navigateTo({
                    url: "../student_home/modifyinf/modifyinf?type=0"
                }) : wx.navigateTo({
                    url: "../student_home/student_home"
                });
            }
        });
    },
    btnlogin: function() {
        console.log(o.globalData.opId), wx.navigateTo({
            url: "choosejob"
        });
    },
    login: function(a) {
        wx.login({
            success: function(e) {
                console.log(" index.login:wx.login"), wx.request({
                    url: o.globalData.ip + "login",
                    data: {
                        code: e.code
                    },
                    success: function(e) {
                        console.log(" index.login:wx.requset"), console.log(e.data), -1 == e.data.result ? (console.log("自动登录失败"), 
                        console.log(this), a.setData({
                            autoLogin: !1
                        })) : (console.log("自动登录"), a.setData({
                            autoLogin: !0
                        }), o.globalData.openId = e.data.openId);
                    }
                });
            }
        });
    },
    onLoad: function() {
        var a = this;
        o.globalData.userInfo ? this.setData({
            userInfo: o.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? o.userInfoReadyCallback = function(o) {
            a.setData({
                userInfo: o.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(e) {
                o.globalData.userInfo = e.userInfo, a.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        }), this.login(this), wx.login({
            success: function(o) {
                a.setData({
                    code: o.code,
                    hasUserInfo: !0
                });
            }
        });
    },
    getUserInfo: function(a) {
        console.log(a), o.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: a.detail.userInfo,
            hasUserInfo: !0
        });
    }
});