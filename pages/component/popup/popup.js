Page({
    data: {
        showModal: !1
    },
    btn: function() {
        this.setData({
            showModal: !0
        });
    },
    preventTouchMove: function() {},
    ok: function() {
        this.setData({
            showModal: !1
        });
    }
});