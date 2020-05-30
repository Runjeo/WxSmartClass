var a = getApp();

Page({
    data: {
        hasResult: !1,
        result: ""
    },
    formSubmit: function(t) {
        var n = t.detail.value, o = this;
        n.openId = a.globalData.openId, wx.request({
            url: a.globalData.ip + "/teacher/addclass",
            data: n,
            success: function(a) {
                var t;
                t = "-1" == a.data ? "课程已存在!" : "-2" == a.data ? "课程名不能为空或包含空格!" : "添加成功!课程id为: " + a.data, 
                o.setData({
                    result: t,
                    hasResult: !0
                });
            }
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});