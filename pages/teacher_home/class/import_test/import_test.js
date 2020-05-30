var o = getApp();

Page({
    data: {
        filePath: "",
        fileUrl: "",
        classId: 0
    },
    chooseFile: function() {
        var o = this;
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success: function(t) {
                console.log("res-chooseExcel", t), o.data.filePath = t.tempFiles[0].path, console.log("resl", o.data.filePath);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    formSubmit: function(t) {
        var e = this;
        "" == this.data.filePath ? wx.showToast({
            title: "请选择一个excel文件",
            icon: "none",
            duration: 1e3
        }) : (wx.showLoading({
            title: "提交中",
            mask: !0
        }), "" != this.data.filePath && wx.uploadFile({
            url: o.globalData.ip + "/teacher/addtestitem",
            filePath: e.data.filePath,
            name: "file",
            formData: {
                classId: e.data.classId
            },
            success: function(o) {
                wx.hideLoading(), console.log(o), wx.showModal({
                    title: "提示",
                    content: o.data,
                    success: function(o) {
                        o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(o) {
                wx.hideLoading(), wx.showToast({
                    title: "提交失败",
                    icon: "none",
                    duration: 5e3
                });
            }
        }));
    },
    onLoad: function(o) {
        this.setData({
            classId: o.id
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