var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        Custom: t.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        testList: null,
        modalName: null,
        classId: "",
        teststate:'0',
    },

    openclose(){
        var a=this
        wx.request({
            url: t.globalData.ip + "/teacher//changeteststate",
            data: {
                classId:  a.data.classId,
                state:a.data.teststate
            },
            success: function(res) {             
                    a.setData({
                        teststate:res.data
                    })                
            }
        })
    },

    
    showModal: function(t) {
        this.setData({
            modalName: t.currentTarget.dataset.target
        });
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    setWeight: function() {},
    loadlist: function() {
        var a = this;
        wx.request({
            url: t.globalData.ip + "/teacher/gettest",
            data: {
                classId: this.data.classId
            },
            success: function(t) {
                a.setData({
                    testList: t.data
                });
                var s = [ {} ];
                console.log(a.data.testList.length);
                for (var e = 0; e < a.data.testList.length; e++) {
                    s[e] = {}, s[e].name = a.data.testList[e].testname, s[e].id = a.data.testList[e].testid, 
                    s[e].starttime = a.data.testList[e].starttime;
                    var i = a.data.testList[e].endtime, n = new Date(i) - new Date() > 0 ? "进行中" : "已结束";
                    s[e].state = n, i = i.substring(5, 17), s[e].endtime = i;
                    var o = a.data.testList[e].testname;
                    o = o.substring(0, 1), s[e].iconn = o, s[e].category = a.data.testList[e].category;
                }
                0 != a.data.testList.length && a.setData({
                    testList: s,
                    istestNull: !1
                });
            }
        });
    },
    goTodetail: function(t) {
        wx.navigateTo({
            url: "./testmain/testmain?testid=" + t.currentTarget.dataset.tid + "&name=" + t.currentTarget.dataset.name
        });
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            classId: t.classId
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        });
       
    },
    onShow: function() {
        var a=this
        wx.request({
            url: t.globalData.ip + "/teacher//getteststate",
            data: {
                classId:  a.data.classId
            },
            success: function(t) {
                a.setData({
                    teststate:t.data
                })
            }
        })
        this.loadlist();
    }
});