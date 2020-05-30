var t = getApp();

Page({
    data: {
        openId: "",
        classId: 0,
        path: "",
        result: "",
        intervalNum: 0,
        intoView: "bottom",
        text: "开始",
        disable: !0,
        backgroud: "green",
        ctx: {},
        isok: !1,
        backgroud1: "grey",
        type: 1
    },
    takePhoto: function() {
        var a = this, e = this;
        wx.createCameraContext().takePhoto({
            quality: "high",
            success: function(o) {
                console.log("takeone"), a.setData({
                    src: o.tempImagePath
                }), wx.uploadFile({
                    url: t.globalData.ip + "/student/setfaceimage",
                    filePath: o.tempImagePath,
                    name: "image",
                    formData: {
                        openId: t.globalData.openId
                    },
                    success: function(t) {
                        wx.hideLoading(), console.log(t.data), "脸部图片上传成功!" == t.data ? (console.log("脸部图片上传成功!"), 
                        wx.showToast({
                            title: t.data,
                            icon: "none",
                            duration: 1e3
                        }), e.setData({
                            text: "开始",
                            backgroud: "green",
                            backgroud1: "green",
                            disable: !1
                        }), clearInterval(e.data.intervalNum)) : (console.log(), wx.showToast({
                            title: "调整脸部位置!",
                            icon: "none",
                            duration: 1e3
                        }));
                    },
                    fail: function(t) {
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
    error: function(t) {
        console.log(t.detail);
    },
    goback: function() {
        var t = this;
        wx.redirectTo({
            url: "../modifyinf/modifyinf?type=" + t.data.type
        });
    },
    start: function() {
        if ("开始" == this.data.text) {
            this.setData({
                text: "停止",
                backgroud: "red"
            }), clearInterval(this.data.intervalNum);
            var t = setInterval(this.takePhoto, 2e3);
            this.setData({
                intervalNum: t
            });
        } else this.setData({
            text: "开始",
            backgroud: "green"
        }), clearInterval(this.data.intervalNum);
    },
    onLoad: function(t) {
        this.setData({
            type: t.type
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
        var t = this;
        wx.setStorage({
            key: "faceCheckData",
            data: {
                id: t.data.id,
                result: t.data.result
            }
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});