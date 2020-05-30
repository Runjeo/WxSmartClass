var t = getApp();

Page({
    data: {
        realName: "",
        teacherId: "",
        hasResult: !1,
        result: "",
        title: "修改信息"
    },
    formInputrealName: function(t) {
        console.log("formInputrealName" + t.detail.value), this.setData({
            realName: t.detail.value
        });
    },
    formInputteacherId: function(t) {
        this.setData({
            teacherId: t.detail.value
        });
    },
    formSubmit: function(a) {
        var e = this.data.realName;
        console.log("formSubmint" + this.data.realName);
        var o = this.data.teacherId, n = /^[0-9]*$/;
        if (/^[\u4e00-\u9fa5]{0,}$/.test(e) && "" != e) if (n.test(o) && "" != o) {
            wx.showLoading({
                title: "提交中"
            }), wx.request({
                url: t.globalData.ip + "/teacher/setinfo",
                data: {
                    openId: t.globalData.openId,
                    name: e,
                    jobId: o
                },
                success: function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: "提交成功",
                        duration: 1e3
                    }), wx.redirectTo({
                        url: "../teacher_main/teacher_main"
                    });
                },
                fail: function() {
                    wx.hideLoading(), wx.showToast({
                        title: "提交失败",
                        icon: "none",
                        duration: 1e3
                    });
                }
            });
        } else wx.showToast({
            title: "教师号只能由数字组成",
            icon: "none",
            duration: 1e3
        }); else wx.showToast({
            title: "姓名只能由汉字组成",
            icon: "none",
            duration: 1e3
        });
    },
    onLoad: function(a) {
        var e = this;
        e.setData({
            type: a.type
        }), 0 == a.type && e.setData({
            title: "完善信息"
        }), wx.request({
            url: t.globalData.ip + "/teacher/getinfo",
            data: {
                openId: t.globalData.openId
            },
            success: function(t) {
                "" != t.data.name && e.setData({
                    realName: t.data.name
                }), "" != t.data.jobId && e.setData({
                    teacherId: t.data.jobId
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