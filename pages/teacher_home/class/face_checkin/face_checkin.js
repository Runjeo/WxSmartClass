var t = getApp();

Page({
    data: {
        id: 0,
        classId: 0,
        path: "",
        result: "",
        intervalNum: 0,
        intoView: "bottom",
        text: "开始",
        backgroud: "#F0F0F0",
        ctx: {}
    },
    takePhoto: function() {
        console.log(this.data);
        var a = this;
        this.ctx = wx.createCameraContext(), this.ctx.takePhoto({
            quality: "high",
            success: function(e) {
                wx.uploadFile({
                    url: t.globalData.ip + "/teacher/facecheckin",
                    filePath: e.tempImagePath,
                    name: "image",
                    formData: {
                        id: a.data.id,
                        classId: a.data.classId
                    },
                    success: function(t) {
                        "" != t.data && a.setData({
                            result: a.data.result + t.data + "\n",
                            intoView: "bottom"
                        });
                    }
                });
            }
        });
    },
    error: function(t) {
        console.log(t.detail);
    },
    start: function() {
        if ("开始" == this.data.text) {
            this.setData({
                text: "停止",
                backgroud: "#FF0000"
            }), clearInterval(this.data.intervalNum);
            var t = setInterval(this.takePhoto, 1e3);
            this.setData({
                intervalNum: t
            });
        } else this.setData({
            text: "开始",
            backgroud: "#F0F0F0"
        }), clearInterval(this.data.intervalNum);
    },
    onLoad: function(t) {
        console.log("onLoad");
        var a = this;
        wx.getStorage({
            key: "faceCheckData",
            success: function(e) {
                var o = "";
                e.data.id == t.id && (o = e.data.result), a.setData({
                    id: t.id,
                    classId: t.classId,
                    result: o
                });
            },
            fail: function(e) {
                console.log("get faild " + e), a.setData({
                    id: t.id,
                    classId: t.classId
                });
            }
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