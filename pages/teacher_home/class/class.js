function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp();

Page({
    data: {
        index1: null,
        imgList: [],
        hlist: [],
        isNull: !0,
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        Custom: a.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        list: [],
        load: !0,
        iconList: [ {
            icon: "cardboardfill",
            color: "red",
            badge: 0,
            name: "导入题库",
            tap: "importtest"
        }, {
            icon: "edit",
            color: "orange",
            badge: 0,
            name: "新建测验",
            tap: "maketest"
        }, {
            icon: "roundcheck",
            color: "yellow",
            badge: 0,
            name: "开放加入",
            tap: "openIn"
        }, {
            icon: "locationfill",
            color: "grey",
            badge: 0,
            name: "定位签到",
            tap: "locationCheckin"
        }, {
            icon: "camera",
            color: "cyan",
            badge: 0,
            name: "教师签到",
            tap: "faceCheckin"
        }, {
            icon: "form",
            color: "blue",
            badge: 0,
            name: "学生签到",
            tap: "sfaceCheckin"
        }, {
            icon: "home",
            color: "purple",
            badge: 0,
            name: "课程成绩",
            tap: "showscore"
        }, {
            icon: "refresh",
            color: "green",
            badge: 0,
            name: "刷新纪录",
            tap: "refresh"
        } ],
        gridCol: 4,
        skin: !1,
        categorys: [],
        category: "",
        hidden: !0,
        nocancel: !1,
        title: "",
        classId: 0,
        modalName: "",
        showCheckinDialog: !1,
        showDeleteDialog: !1,
        showFaceCheckDialog: !1,
        showOpenInDialog: !1,
        showsFaceCheckDialog: !1,
        recentFaceCheck: "",
        latitude: 0,
        longitude: 0,
        result: "",
        hasResult: !1,
        faceCheckId: -1,
        table: [],
        tablehis: [],
        index: 0,
        historys: [ {
            id: 0,
            type: "face",
            text: "2019-5-4 15:10:30 Fri 人脸签到"
        } ],
        testname: "",
        testnum: "",
        testtime: "",
        filePath: "",
        fileUrl: "",
        hidden1: !0,
        hidden2: !0,
        hidden3: !0,
        hidden4: !0,
        openpwd: null,
        opentime: null,
        sopentime: null
    },
    DelFile: function() {
        var t = this;
        wx.showModal({
            title: "删除文件",
            content: "确定要删除这个文件吗？",
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {
                a.confirm && t.setData({
                    imgList: []
                }), a.cancel && t.setDate({
                    hidden1: !0
                });
            }
        });
    },
    formInputpwd: function(t) {
        this.setData({
            openpwd: t.detail.value
        });
    },
    formInputtime: function(t) {
        this.setData({
            opentime: t.detail.value
        });
    },
    formInputstime: function(t) {
        this.setData({
            sopentime: t.detail.value
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
            url: a.globalData.ip + "/teacher/addtestitem",
            filePath: e.data.filePath,
            name: "file",
            formData: {
                classId: e.data.classId
            },
            success: function(t) {
                wx.hideLoading(), console.log(t), wx.showModal({
                    title: "提示",
                    content: t.data,
                    success: function(t) {
                        t.confirm ? (console.log("用户点击确定"), e.cancel()) : t.cancel && (console.log("用户点击取消"), 
                        e.cancel());
                    }
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "提交失败",
                    icon: "none",
                    duration: 5e3
                });
            }
        }));
    },
    chooseFile: function() {
        var t = this;
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success: function(a) {
                console.log("res-chooseExcel", a), t.data.filePath = a.tempFiles[0].path, console.log("resl", t.data.filePath), 
                t.setData({
                    imgList: "i"
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    NameInput: function(t) {
        this.data.testname = t.detail.value;
    },
    NumberInput: function(t) {
        this.data.testnum = t.detail.value;
    },
    TimeInput: function(t) {
        this.data.testtime = t.detail.value;
    },
    bindChange: function(t) {
        var a = t.detail.value;
        this.setData({
            category: this.data.categorys[a[0]]
        });
    },
    cancel: function() {
        var a;
        this.setData((a = {
            hidden: !0,
            hidden1: !0,
            imgList: [],
            filePath: "",
            fileUrl: ""
        }, t(a, "hidden1", !0), t(a, "hidden2", !0), t(a, "hidden3", !0), t(a, "hidden4", !0), 
        a));
    },
    confirm: function() {
        var t = this;
        console.log("clicked 确定发布" + this.data.testname + this.data.category + this.data.testnum + "时间" + this.data.testtime), 
        "" != this.data.testnum && "" != this.data.testtime && "" != this.data.testname ? this.isInteger(t.data.testtime) && this.isInteger(t.data.testnum) ? "" == this.data.testnum || "" == this.data.testtime || "" == this.data.testname ? wx.showToast({
            title: "请检查是否填写完整！",
            icon: "none",
            duration: 1e3
        }) : wx.request({
            url: a.globalData.ip + "/teacher/makerandomtest",
            data: {
                classId: this.data.classId,
                testname: this.data.testname,
                category: this.data.category,
                testnum: this.data.testnum,
                testtime: this.data.testtime
            },
            success: function(a) {
                wx.showToast({
                    title: a.data,
                    icon: "none",
                    duration: 1e3
                }), t.setData({
                    hidden: !0
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "试卷创建失败" + t.data,
                    icon: "none",
                    duration: 1e3
                });
            }
        }) : wx.showToast({
            title: "试题数量或时间应为整数",
            icon: "none",
            duration: 1e3
        }) : wx.showToast({
            title: "请检查是否填写完整！",
            icon: "none",
            duration: 1e3
        });
    },
    loadHistorys: function() {
        var t = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: a.globalData.ip + "/teacher/gethistorys",
            data: {
                classId: t.data.classId
            },
            success: function(a) {
                wx.hideLoading(), t.setData({
                    historys: a.data
                }), console.log(t.data.historys);
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
    isInteger: function(t) {
        return /^\+?[1-9][0-9]*$/.test(t);
    },
    checkPasswd: function(t) {
        return /^[a-z0-9_-]{6,18}$/.test(t);
    },
    showCheckinDialog: function() {
        this.setData({
            showCheckinDialog: !this.data.showCheckinDialog,
            result: ""
        });
    },
    showdelete: function() {
        this.setData({
            hidden3: !1
        });
    },
    showFaceCheckDialog: function() {
        this.setData({
            showFaceCheckDialog: !this.data.showFaceCheckDialog
        });
    },
    showOpenInDialog: function() {
        this.setData({
            showOpenInDialog: !this.data.showOpenInDialog
        });
    },
    sfaceCheckinSubmit: function() {
        var t = this;
        this.isInteger(t.data.sopentime) ? wx.request({
            url: a.globalData.ip + "/teacher/sfacecheckin",
            data: {
                classId: t.data.classId,
                lastTime: t.data.sopentime
            },
            success: function(a) {
                wx.showToast({
                    title: a.data,
                    icon: "success",
                    duration: 1e3
                }), t.setData({
                    hidden4: !0,
                    sopentime: null
                });
            },
            fail: function(t) {}
        }) : wx.showToast({
            title: "时长必须为正整数",
            icon: "none",
            duration: 2e3
        });
    },
    locationCheckin: function() {
        var t = this;
        wx.showLoading({
            title: "定位中",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading();
        }, 5e3), wx.getLocation({
            type: "gcj02",
            success: function(a) {
                wx.hideLoading(), t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude
                }), t.showCheckinDialog();
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "定位失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    locationSubmit: function(t) {
        var e = this;
        this.isInteger(t.detail.value.min) ? this.mapCtx.getCenterLocation({
            success: function(i) {
                wx.request({
                    url: a.globalData.ip + "/teacher/locationcheckin",
                    data: {
                        classId: e.data.classId,
                        type: "location",
                        lastTime: t.detail.value.min,
                        latitude: i.latitude,
                        longitude: i.longitude
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data,
                            icon: "none",
                            duration: 1e3
                        }), e.showCheckinDialog();
                    },
                    fail: function(t) {}
                });
            }
        }) : wx.showToast({
            title: "请输入正整数",
            icon: "none",
            duration: 1e3
        });
    },
    openInSubmit: function(t) {
        var e = this;
        this.isInteger(e.data.opentime) && this.checkPasswd(e.data.openpwd) ? wx.request({
            url: a.globalData.ip + "/teacher/openin",
            data: {
                classId: e.data.classId,
                lastMin: e.data.opentime,
                passwd: e.data.openpwd
            },
            success: function(t) {
                wx.showToast({
                    title: "已开放",
                    icon: "success",
                    duration: 1e3
                }), e.setData({
                    hidden2: !0,
                    openpwd: null,
                    opentime: null
                });
            }
        }) : wx.showToast({
            title: "时长必须为正整数,密码必须为6-18位数字字母组合",
            icon: "none",
            duration: 2e3
        });
    },
    showscore: function() {
        var t = this;
        wx.navigateTo({
            url: "./show_score/show_score?classId=" + t.data.classId
        });
    },
    deleteClass: function() {
        var t = this;
        wx.showLoading({
            title: "删除中"
        }), wx.request({
            url: a.globalData.ip + "/teacher/deleteclass",
            data: {
                classId: t.data.classId
            },
            success: function(t) {
                wx.redirectTo({
                    url: "../teacher_main/teacher_main"
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "删除失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    cancelDelete: function() {
        this.showDeleteDialog();
    },
    faceCheckin: function() {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/getrecentfacecheck",
            data: {
                classId: t.data.classId
            },
            success: function(a) {
                var e;
                e = -1 == a.data.id ? "无" : "id: " + a.data.id + "\n开始时间: " + a.data.startTime, 
                t.setData({
                    recentFaceCheck: e,
                    faceCheckId: a.data.id,
                    modalName: "DialogModal2"
                });
            }
        }), this.showFaceCheckDialog();
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    continueFaceCheck: function() {
        -1 != this.data.faceCheckId && wx.navigateTo({
            url: "./face_checkin/face_checkin?id=" + this.data.faceCheckId + "&classId=" + this.data.classId
        });
    },
    newFaceCheck: function() {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/newfacecheckin",
            data: {
                classId: t.data.classId
            },
            success: function(a) {
                console.log(a.data), wx.navigateTo({
                    url: "./face_checkin/face_checkin?id=" + a.data + "&classId=" + t.data.classId
                });
            }
        });
    },
    openIn: function() {
        this.setData({
            hidden2: !1
        });
    },
    sfaceCheckin: function() {
        this.setData({
            hidden4: !1
        });
    },
    bindPickerChange: function(t) {
        var a = t.detail.value, e = this.data.historys[a], i = this;
        wx.navigateTo({
            url: "./history/history?id=" + e.id + "&type=" + e.type + "&text=" + e.text + "&classId=" + i.data.classId
        });
    },
    importtest: function() {
        this.setData({
            hidden1: !1
        });
    },
    gohisdetail: function(t) {
        var a = this;
        console.log("csid" + t.currentTarget.dataset.sid), wx.navigateTo({
            url: "./detail/detail?type=" + t.currentTarget.dataset.type + "&sid=" + t.currentTarget.dataset.sid + "&classId=" + a.data.classId
        });
    },
    getcategory: function() {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/getcategory",
            data: {
                classId: t.data.classId
            },
            success: function(a) {
                console.log("请求category" + a), t.setData({
                    categorys: a.data
                }), t.data.category = t.data.categorys[0];
            }
        });
    },
    refresh: function() {
        this.gethistory();
    },
    gethistory: function() {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/gethistorylist",
            data: {
                classId: t.data.classId
            },
            success: function(a) {
                wx.hideLoading(), t.setData({
                    historys: a.data
                });
                for (var e = [ {} ], i = 0; i < t.data.historys.length; i++) {
                    e[i] = {}, e[i].type = t.data.historys[i].type, e[i].num = t.data.historys[i].num, 
                    e[i].sid = t.data.historys[i].id;
                    var s = t.data.historys[i].starttime, n = t.data.historys[i].starttime, o = t.data.historys[i].starttime;
                    s = s.substring(0, 4), n = n.substring(5, 10), o = o.substring(11, 16), e[i].year = s, 
                    e[i].day = n, i >= 1 && (e[i].year == t.data.historys[i - 1].starttime.substring(0, 4) && (e[i].year = 0), 
                    e[i].day == t.data.historys[i - 1].starttime.substring(5, 10) && (e[i].day = 0)), 
                    e[i].time = o;
                }
                0 == a.data.length ? (t.setData({
                    hlist: [],
                    isNull: !0
                }), console.log("isNull" + t.data.isNull)) : (t.setData({
                    hlist: e,
                    isNull: !1,
                    listCur: e[0]
                }), console.log("isNull" + t.data.isNull));
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
    maketest: function() {
        this.setData({
            hidden: !1
        });
    },
    onLoad: function(t) {
        this.setData({
            title: t.name,
            classId: t.id
        });
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
    },
    onReady: function() {
        wx.hideLoading(), this.mapCtx = wx.createMapContext("myMap");
    },
    onShow: function() {
        this.setData({
            showFaceCheckDialog: !1
        }), this.gethistory(), this.getcategory();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    tabSelect: function(t) {
        this.setData({
            TabCur: t.currentTarget.dataset.id,
            MainCur: t.currentTarget.dataset.id,
            VerticalNavTop: 50 * (t.currentTarget.dataset.id - 1)
        });
    }
});