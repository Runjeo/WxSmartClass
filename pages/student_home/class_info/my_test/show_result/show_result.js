var t = getApp();

Page({
    data: {
        testid: "",
        stestitemList: []
    },
    loadresult: function() {
        var e = this;
        wx.request({
            url: t.globalData.ip + "/student/gettestresult",
            data: {
                testId: e.data.testid,
                openId: t.globalData.openId
            },
            success: function(t) {
                e.setData({
                    stestitemList: t.data
                });
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            testid: t.testid
        }), this.loadresult();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});