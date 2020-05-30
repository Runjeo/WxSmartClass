var t = getApp();

Page({
    data: {
        id: 0,
        text: "",
        type: "face",
        classId: 0,
        table: [ {
            name: "abcd",
            jobId: 123456789,
            isCheckedIn: "n"
        } ]
    },
    loadTable: function() {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: t.globalData.ip + "/teacher/getahistory",
            data: {
                id: a.data.id,
                classId: a.data.classId,
                type: a.data.type
            },
            success: function(t) {
                wx.hideLoading(), a.setData({
                    table: t.data
                });
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
        this.setData({
            id: t.id,
            text: t.text,
            type: t.type,
            classId: t.classId
        });
    },
    onReady: function() {},
    onShow: function() {
        this.loadTable();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});