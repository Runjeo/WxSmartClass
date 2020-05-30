var a = getApp();

Page({
    data: {
        realName: "",
        studentId: "",
        hasResult: !1,
        result: "",
        imageUrl: "",
        imageUrl1: "",
        imagePath: "",
        imgList: [ "k" ],
        index1: null,
        type: 0,
        title: "修改信息"
    },
    ChooseImage: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(t) {
                a.data.imgList.length, a.setData({
                    imgList: [ "k" ],
                    imageUrl: t.tempFilePaths[0]
                }), console.log(t.tempFilePaths);
            }
        });
    },
    upface: function() {
        var a = this;
        wx.redirectTo({
            url: "../upface/upface?type=" + a.data.type
        });
    },
    ViewImage: function(a) {
        var t = [ {} ];
        t[0] = {}, t[0] = this.data.imageUrl, wx.previewImage({
            urls: t,
            current: this.data.imageUrl
        });
    },
    DelImg: function(a) {
        var t = this;
        wx.showModal({
            title: "删除",
            content: "确定要删除这这张照片吗？",
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {
                e.confirm && (t.data.imgList.splice(a.currentTarget.dataset.index, 1), t.setData({
                    imgList: t.data.imgList,
                    imageUrl: ""
                }));
            }
        });
    },
    formInputrealName: function(t) {
        this.setData({
            realName: t.detail.value
        }), a.globalData.username = t.detail.value;
    },
    formInputstudentId: function(t) {
        this.setData({
            studentId: t.detail.value
        }), a.globalData.studentId = t.detail.value;
    },
    formSubmit: function(t) {
        var e = this, o = this.data.realName, n = this.data.studentId, i = /^[0-9]*$/;
        if (/^[\u4e00-\u9fa5]{0,}$/.test(o) && "" != o) if (i.test(n) && "" != n) {
            e = this;
            wx.showLoading({
                title: "提交中",
                mask: !0
            }), "" != e.data.imageUrl ? wx.request({
                url: a.globalData.ip + "/student/setinfo",
                data: {
                    openId: a.globalData.openId,
                    name: o,
                    jobId: n
                },
                success: function(a) {
                    e.setData({
                        type: 1
                    }), wx.showToast({
                        title: a.data,
                        icon: "none",
                        duration: 1e3
                    }), wx.redirectTo({
                        url: "../student_home"
                    });
                },
                fail: function(a) {
                    wx.showToast({
                        title: "提交失败",
                        icon: none,
                        duration: 1e3
                    });
                }
            }) : wx.showToast({
                title: "请选择一张图片",
                icon: "none",
                duration: 1e3
            });
        } else wx.showToast({
            title: "学号只能由数字组成",
            icon: "none",
            duration: 1e3
        }); else wx.showToast({
            title: "姓名只能由汉字组成",
            icon: "none",
            duration: 1e3
        });
    },
    onLoad: function(t) {
        console.log("onLoad");
        var e = this;
        e.setData({
            type: t.type,
            realName: a.globalData.username,
            studentId: a.globalData.studentId
        }), 0 == t.type && e.setData({
            title: "完善信息"
        }), wx.request({
            url: a.globalData.ip + "/student/getinfo",
            data: {
                openId: a.globalData.openId
            },
            success: function(a) {
                "" != a.data.name && e.setData({
                    realName: a.data.name
                }), "" != a.data.jobId && e.setData({
                    studentId: a.data.jobId
                });
            }
        });
    },
    onReady: function() {
        console.log("onReady");
        var t = this;
        wx.request({
            url: a.globalData.ip + "/student/iffaceimage?openId=" + a.globalData.openId,
            data: {
                openId: a.globalData.openId
            },
            success: function(e) {
                console.log("haveimage" + e.data), 1 == e.data ? (console.log("haveimage"), t.setData({
                    imageUrl: a.globalData.ip + "/student/getfaceimage?openId=" + a.globalData.openId + "&v=" + Math.random()
                }), console.log("this.data.imageUrl" + t.data.imageUrl), t.setData({
                    imageUrl1: t.data.imageUrl
                })) : (console.log("failimage"), t.setData({
                    imgList: "",
                    imageUrl: ""
                }));
            }
        });
    },
    onShow: function() {
        console.log("onShow");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});