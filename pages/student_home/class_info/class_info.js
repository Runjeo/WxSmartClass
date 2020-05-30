function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page((t = {
    data: {
        classId: 0,
        title: "",
        list: [],
        isNull: !0,
        showDeleteDialog: !1,
        table: [ {
            time: "2019-05-03 11:27:20 Fri",
            type: "定位",
            isCheckedIn: "y"
        } ],
        iconList: [ {
            icon: "locationfill",
            color: "green",
            badge: 0,
            name: "定位签到",
            tap: "location"
        }, {
            icon: "myfill",
            color: "green",
            badge: 0,
            name: "扫脸签到",
            tap: "testfacecheck"
        }, {
            icon: "edit",
            color: "orange",
            badge: 0,
            name: "课程练习",
            tap: "my_test"
        } ],
        gridCol: 3
    },

    subscribe(){
        var a=this
        wx.requestSubscribeMessage({
            tmplIds: ['O1xZ9awOYFRyBRGVJxXaAopoqkycDAj1XEzfhHrfF-Y'],
            success (res) { 
                wx.request({
                    url: e.globalData.ip + "/student/codesubscribe",
                    data: {
                        openid: e.globalData.openId,
                        classId: a.data.classId
                    },
                    success: function(res){
                        wx.showToast({
                            title: '该提醒一次有效',
                        })
                    }
                })
                
            }
          })
    },

    my_test: function() {
        console.log(this.data.classId + "my_test"), wx.navigateTo({
            url: "./my_test/my_test?classId=" + this.data.classId + "&title=" + this.data.title
        });
    },
    showDeleteDialog: function() {
        this.setData({
            showDeleteDialog: !this.data.showDeleteDialog
        });
    },
    delete: function() {
        var a = this;
        wx.request({
            url: e.globalData.ip + "/student/deleteclass",
            data: {
                openId: e.globalData.openId,
                classId: a.data.classId
            },
            success: function(a) {
                wx.showToast({
                    title: "退选成功",
                    icon: "none",
                    duration: 2e3
                }), wx.navigateBack({
                    delta: 1
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    cancelDelete: function() {
        this.showDeleteDialog();
    },
    onLoad: function(a) {
        this.setData({
            classId: a.id,
            title: a.name
        });
    },
    location: function() {
        var a = this;
        wx.request({
            url: e.globalData.ip + "/student/getlocation",
            data: {
                classId: a.data.classId
            },
            success: function(t) {
                t.data.isValid ? (a.setData({
                    latitude: t.data.latitude,
                    longitude: t.data.longitude
                }), wx.navigateTo({
                    url: "../class/location_checkin/location_checkin?latitude=" + t.data.latitude + "&longitude=" + t.data.longitude + "&classId=" + a.data.classId
                })) : wx.showToast({
                    title: "不在签到时段",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    testfacecheck: function() {
        var a = this;
        wx.request({
            url: e.globalData.ip + "/student/canfacecheckin",
            data: {
                openId: e.globalData.openId,
                classId: a.data.classId
            },
            success: function(t) {
                "cancheck" == t.data ? wx.redirectTo({
                    url: "../class/sface/sface?classId=" + a.data.classId
                }) : wx.showToast({
                    title: t.data,
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    facecheck: function() {
        var a = this;
        wx.request({
            url: e.globalData.ip + "/student//canfacecheckin",
            data: {
                classId: a.data.classId
            },
            success: function(t) {
                "cancheck" == t.data ? wx.navigateTo({
                    url: "../class/face_checkin/face_checkin?classId=" + a.data.classId + "&id=" + t.data.id + "&name=" + a.data.title
                }) : wx.showToast({
                    title: t.data,
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    loadList: function() {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: e.globalData.ip + "/student/gethistory",
            data: {
                openId: e.globalData.openId,
                classId: a.data.classId
            },
            success: function(t) {
                wx.hideLoading(), a.setData({
                    table: t.data
                });
                var e = [ {} ];
                console.log("zheshi" + a.data.table.length);
                for (var s = 0; s < a.data.table.length; s++) {
                    e[s] = {};
                    var n = a.data.table[s].time, i = a.data.table[s].time;
                    n = n.substring(2, 10), i = i.substring(20, 23), e[s].xq = i, e[s].date = n, n = (n = a.data.table[s].time).substring(11, 16), 
                    e[s].time = n, e[s].type = a.data.table[s].type, e[s].isCheckedIn = a.data.table[s].isCheckedIn;
                }
                0 == t.data.length ? (a.setData({
                    list: [],
                    isNull: !0
                }), console.log("isNull" + a.data.isNull)) : (a.setData({
                    list: e,
                    isNull: !1
                }), console.log("isNull" + a.data.isNull));
            },
            fail: function(a) {
                wx.hideLoading();
            }
        });
    }
}, a(t, "onLoad", function(a) {
    this.setData({
        classId: a.id,
        title: a.name
    });
}), a(t, "onReady", function() {}), a(t, "onShow", function() {
    this.loadList();
}), a(t, "onHide", function() {}), a(t, "onUnload", function() {}), a(t, "onPullDownRefresh", function() {}), 
a(t, "onReachBottom", function() {}), a(t, "onShareAppMessage", function() {}), 
t));