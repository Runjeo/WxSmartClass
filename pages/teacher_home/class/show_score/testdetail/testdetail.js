var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        Custom: t.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        isNull: !0,
        VerticalNavTop: 0,
        value: 0,
        a: "",
        b: "",
        c: "",
        d: "",
        na: "",
        nb: "",
        nc: "",
        nd: "",
        answer: "",
        testitemList: [],
        modalName: null,
        testId: "",
        title: ""
    },
    showdetail: function(t) {
        this.setData({
            modalName: "setWeightModal",
            value: t.currentTarget.dataset.value,
            num: t.currentTarget.dataset.num,
            answer: t.currentTarget.dataset.answer,
            a: t.currentTarget.dataset.a,
            b: t.currentTarget.dataset.b,
            c: t.currentTarget.dataset.c,
            d: t.currentTarget.dataset.d,
            na: t.currentTarget.dataset.na,
            nb: t.currentTarget.dataset.nb,
            nc: t.currentTarget.dataset.nc,
            nd: t.currentTarget.dataset.nd,
            all: t.currentTarget.dataset.all
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
            url: t.globalData.ip + "/teacher/gettestdetail",
            data: {
                testId: this.data.testId
            },
            success: function(t) {
                console.log("gettestdetailsuccess"), a.setData({
                    testitemList: t.data
                });
                var e = [ {} ];
                console.log(a.data.testitemList.length);
                for (var s = 0; s < a.data.testitemList.length; s++) e[s] = {}, e[s].content = a.data.testitemList[s].content, 
                e[s].all = a.data.testitemList[s].all, e[s].value = a.data.testitemList[s].value, 
                console.log("daan" + a.data.testitemList[s].real), e[s].answer = a.data.testitemList[s].real, 
                e[s].a = a.data.testitemList[s].a, e[s].b = a.data.testitemList[s].b, e[s].c = a.data.testitemList[s].c, 
                e[s].d = a.data.testitemList[s].d, e[s].na = a.data.testitemList[s].na, e[s].nb = a.data.testitemList[s].nb, 
                e[s].nc = a.data.testitemList[s].nc, e[s].nd = a.data.testitemList[s].nd, e[s].num = a.data.testitemList[s].num;
                console.log("bijiaolength"), 0 != a.data.testitemList.length && a.setData({
                    testitemList: e,
                    isNull: !1
                }), console.log("bijiaojieshu ");
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            testId: t.testid,
            title: t.name
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
        this.loadlist();
    }
});