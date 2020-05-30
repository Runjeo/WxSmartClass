var a = getApp();

Page({
    data: {
        id: 0,
        openId: "",
        classId: 0,
        name: "",
        path: "",
        result: "",
        intervalNum: 0,
        intoView: "bottom",
        text: "开始",
        disable: !0,
        backgroud: "green",
        ctx: {},
        isok: !1,
        backgroud1: "grey"
    },
    takePhoto: function() {
        var t = this, e = this;
        wx.createCameraContext().takePhoto({
            quality: "high",
            success: function(o) {
                console.log("takeone"), t.setData({
                    src: o.tempImagePath
                }), wx.uploadFile({
                    url: a.globalData.ip + "/student/facecheck",
                    filePath: o.tempImagePath,
                    name: "image",
                    formData: {
                        openId: a.globalData.openId,
                        classId: e.data.classId
                    },
                    success: function(a) {
                        wx.hideLoading(), console.log(a.data), "签到成功!" == a.data ? (console.log("签到成功!"), 
                        wx.showToast({
                            title: a.data,
                            icon: "none",
                            duration: 1e3
                        }), e.setData({
                            text: "开始",
                            backgroud: "green",
                            backgroud1: "green",
                            disable: !1
                        }), clearInterval(e.data.intervalNum)) : (console.log(), wx.showToast({
                            title: a.data,
                            icon: "none",
                            duration: 1e3
                        }));
                    },
                    fail: function(a) {
                        wx.hideLoading(), wx.showToast({
                            title: "提交失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    error: function(a) {
        console.log(a.detail);
    },
    goback: function() {
        var a = this;
        wx.redirectTo({
            url: "../../class_info/class_info?id=" + a.data.classId + "&name=" + a.data.name
        });
    },
    start: function() {
        if ("开始" == this.data.text) {
            this.setData({
                text: "停止",
                backgroud: "red"
            }), clearInterval(this.data.intervalNum);
            var a = setInterval(this.takePhoto, 2e3);
            this.setData({
                intervalNum: a
            });
        } else this.setData({
            text: "开始",
            backgroud: "green"
        }), clearInterval(this.data.intervalNum);
    },
    onLoad: function(a) {
        console.log("onLoad"), this.setData({
            classId: a.classId,
            name: a.name
        });
    },
    onReady: function() {
        console.log("onReady");
    },
    onShow: function() {
        console.log("onShow");
    },
    onHide: function() {
        console.log("onHide"), clearInterval(this.data.intervalNum);
    },
    onUnload: function() {
        console.log("onUnload"), clearInterval(this.data.intervalNum);
        var a = this;
        wx.setStorage({
            key: "faceCheckData",
            data: {
                id: a.data.id,
                result: a.data.result
            }
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});