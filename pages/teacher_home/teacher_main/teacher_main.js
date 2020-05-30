var a = getApp();

Page({
    data: {
        isclassNull: !0,
        tag: ["全部课程", "课程管理", "作业情况"],
        classList: [{
            name: "",
            id: "",
            teacher_id: ""
        }],
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        TabCur: 0,
        scrollLeft: 0,
        classInput: "",
        modalName: "",
        hidden2: 1,
        modaltext: "",
        hasResult: !1,
        result: "zongyoushenme",
        place: "",
        classname: "",
        classid: "",
        time: '12:00',
        date: '2020-12-25',
    },

    getsubscribe(e) {
        var that = this
        wx.request({
            url: a.globalData.ip + "/teacher/getsubscribe",
            data: {
                classid: e.currentTarget.dataset.id,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    hidden2: 0,
                    classid: e.currentTarget.dataset.id,
                    place: res.data.place,
                    date: res.data.date,
                    time: res.data.time,
                    classname: res.data.classname
                });

            }
        })

    },

    formInputclassname: function(a) {
        this.setData({
            classname: a.detail.value
        });
    },

    formInputplace: function(a) {
        this.setData({
            place: a.detail.value
        });
    },

    formInputdate: function(a) {
        this.setData({
            date: a.detail.value
        });
    },

    TimeChange(e) {
        this.setData({
          time: e.detail.value
        })
      },
    DateChange(e) {
        this.setData({
          date: e.detail.value
        })
      },

    formSubmit() {
        var that = this
        if(that.data.place!=""&&that.data.date!=""&&that.data.classname!=""){
            wx.request({
                url: a.globalData.ip + "/teacher/sendsubscribe",
                data: {
                    classId: that.data.classid,
                    place: that.data.place,
                    date: that.data.date,
                    time:that.data.time,
                    classname: that.data.classname
                },
                success: function (res) {
                    console.log(res)
                    that.setData({
                        hidden2: !0,   
                        //place: res.data.place,
                        //date: res.data.date,
                        //classname: res.data.classname
                    });
                    wx.showToast({
                        title: "提醒成功",
                        icon: "none",
                        duration: 1000
                    });
                }
            })
        }else{
            console.log("有空")
            wx.showToast({
                title: "选项不能为空",
                icon: "none",
                duration: 1000
            });
        }
        

    },

    cancel: function () {
        this.setData({
            hidden2: !0,
            place:"",
            date: "",
            classname: ""
        });
    },
    addclass: function () {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/addclass",
            data: {
                name: this.data.classInput,
                openId: a.globalData.openId
            },
            success: function (a) {
                var s;
                s = "-1" == a.data ? "课程已存在!" : "-2" == a.data ? "课程名不能为空或包含空格!" : "添加成功!课程id为: " + a.data,
                    t.setData({
                        result: s,
                        hasResult: !0,
                        modalName: null
                    });
            }
        });
    },
    hideModal: function (a) {
        this.setData({
            modalName: null
        });
    },
    classInput: function (a) {
        this.setData({
            classInput: a.detail.value
        });
    },
    search: function () {
        var a = this,
            t = !1;
        if (console.log("search" + this.data.classInput), "" == this.data.classInput) a.setData({
            modalName: "Modal",
            modaltext: "请输入课程名！"
        });
        else {
            for (var s = 0; s < a.data.classList.length; s++) a.data.classList[s].name == a.data.classInput && (t = !0);
            t ? a.setData({
                modalName: "Modal",
                modaltext: "该课程已存在！"
            }) : a.setData({
                modalName: "Modal1"
            });
        }
    },
    tabSelect: function (a) {
        this.setData({
            TabCur: a.currentTarget.dataset.id,
            scrollLeft: 60 * (a.currentTarget.dataset.id - 1)
        }), 0 == a.currentTarget.dataset.id && this.loadlist();
    },
    onLoad: function (a) {
        var t = this;
        wx.getSystemInfo({
            success: function (a) {
                t.setData({
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight
                });
            }
        });
    },
    bindChange: function (a) {
        this.setData({
            currentTab: a.detail.current
        });
    },
    swichNav: function (a) {
        var t = this;
        if (this.data.currentTab === a.target.dataset.current) return !1;
        t.setData({
            currentTab: a.target.dataset.current
        });
    },
    goToClass: function (a) {
        wx.navigateTo({
            url: "../class/class?id=" + a.currentTarget.dataset.id + "&name=" + a.currentTarget.dataset.name
        });
    },
    onReady: function () {},
    loadlist: function () {
        var t = this;
        wx.request({
            url: a.globalData.ip + "/teacher/getclass",
            data: {
                openId: a.globalData.openId
            },
            success: function (a) {
                t.setData({
                    classList: a.data
                });
                var s = [{}];
                console.log(t.data.classList.length), 0 != t.data.classList.length && t.setData({
                    isclassNull: !1
                });
                for (var e = 0; e < t.data.classList.length; e++) {
                    s[e] = {}, s[e].name = t.data.classList[e].name, s[e].id = t.data.classList[e].id,
                        s[e].teacher_id = t.data.classList[e].teacher_id;
                    var n = t.data.classList[e].name;
                    n = n.substring(0, 1), s[e].iconn = n;
                }
                t.setData({
                    classList: s
                });
            }
        });
    },
    onShow: function () {
        var t = this;
        this.data.classList;
        wx.request({
            url: a.globalData.ip + "/teacher/getinfo",
            data: {
                openId: a.globalData.openId
            },
            success: function (a) {
                "" != a.data.name && "" != a.data.jobId || wx.navigateTo({
                    url: "../fill_info/fill_info"
                });
            }
        }), t.loadlist();
    },
    onHide: function () {},
    onUnload: function () {
        wx.redirectTo({
            url: "../../index/index"
        });
    },
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});