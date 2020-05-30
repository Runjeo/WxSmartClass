Page({
    data: {
        isPopping: !1,
        animPlus: {},
        animCollect: {},
        animTranspond: {},
        animInput: {}
    },
    plus: function() {
        this.data.isPopping ? (this.popp(), this.setData({
            isPopping: !1
        })) : this.data.isPopping || (this.takeback(), this.setData({
            isPopping: !0
        }));
    },
    minus_class: function() {
        console.log("minusclass");
    },
    add_class: function() {
        this.takeback(), this.setData({
            isPopping: !1
        }), console.log("addclass"), wx.navigateTo({
            url: "../search_class/search_class"
        });
    },
    go_top: function() {
        console.log("gotop");
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        });
        t.rotateZ(180).step(), n.translate(-40, -40).rotateZ(180).opacity(1).step(), a.translate(-80, 0).rotateZ(180).opacity(1).step(), 
        o.translate(-40, 40).rotateZ(180).opacity(1).step(), this.setData({
            animPlus: t.export(),
            animCollect: n.export(),
            animTranspond: a.export(),
            animInput: o.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-out"
        });
        t.rotateZ(0).step(), n.translate(0, 0).rotateZ(0).opacity(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).step(), this.setData({
            animPlus: t.export(),
            animCollect: n.export(),
            animTranspond: a.export(),
            animInput: o.export()
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "title",
            desc: "desc",
            path: "path"
        };
    }
});