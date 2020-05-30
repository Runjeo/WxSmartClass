var t = getApp();

Page({
    data: {
        classId: 0,
        latitude: 0,
        longitude: 0,
        t_latitude: 0,
        t_longitude: 0,
        markers: [],
        circles: [],
        include_points: [],
        result: "",
        hasResult: !1
    },
    locationCheckin: function() {
        var a = this;
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                a.setData({
                    latitude: e.latitude,
                    longitude: e.longitude,
                    markers: [ {
                        latitude: a.data.t_latitude,
                        longitude: a.data.t_longitude
                    } ],
                    circles: [ {
                        latitude: a.data.t_latitude,
                        longitude: a.data.t_longitude,
                        color: "#00FF00",
                        radius: 20,
                        fillColor: "#FF000000"
                    } ],
                    include_points: [ {
                        latitude: a.data.t_latitude,
                        longitude: a.data.t_longitude
                    }, {
                        latitude: e.latitude,
                        longitude: e.longitude
                    } ]
                }), wx.request({
                    url: t.globalData.ip + "/student/locationcheckin",
                    data: {
                        openId: t.globalData.openId,
                        classId: a.data.classId,
                        latitude: a.data.latitude,
                        longitude: a.data.longitude
                    },
                    success: function(t) {
                        a.setData({
                            result: t.data,
                            hasResult: !0
                        });
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t);
        this.setData({
            classId: t.classId,
            t_latitude: t.latitude,
            t_longitude: t.longitude
        });
    },
    onReady: function() {
        this.mapCtx = wx.createMapContext("myMap"), this.locationCheckin();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});