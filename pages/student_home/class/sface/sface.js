var a = getApp();

Page({
    data: {
        base64: "",
        token: "",
        msg: null,
        src: "",
        classId: ""
    },
    myRequest: function() {
        var s = this;
        console.log("myrequest"), wx.request({
            url: "https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=" + s.data.token,
            method: "POST",
            data: {
                image: s.data.base64,
                image_type: "BASE64",
                group_id_list: s.data.classId
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                if (console.log("success"), wx.hideToast(), 0 == t.data.error_code) {
                    var e = t.data.result;
                    if (null != e.user_list) {
                        var o = e.user_list[0].score, c = e.user_list[0].user_id;
                        console.log(c + "and" + a.globalData.openId), c = c.replace(/_6_6_6_/g, "-"), console.log(c + "and" + a.globalData.openId), 
                        o > 80 && c == a.globalData.openId ? wx.request({
                            url: a.globalData.ip + "/student/setfacecheckinf",
                            data: {
                                openId: a.globalData.openId,
                                classId: s.data.classId
                            },
                            success: function(a) {
                                "签到成功!" == a.data || "签到已结束!" == a.data ? (wx.showToast({
                                    title: a.data,
                                    icon: "success",
                                    duration: 1500
                                }), wx.redirectTo({
                                    url: "../../class_info/class_info?id=" + s.data.classId
                                })) : wx.showToast({
                                    title: "请勿重复签到！",
                                    icon: "success",
                                    duration: 1500
                                });
                            },
                            fail: function() {
                                wx.showToast({
                                    title: "请重新签到！",
                                    icon: "success",
                                    duration: 1500
                                });
                            }
                        }) : (console.log("不匹配"), wx.showToast({
                            title: "不匹配",
                            icon: "success",
                            duration: 1500
                        }));
                    }
                } else console.log("访问失败"), wx.showToast({
                    title: "请调整位置",
                    icon: "success",
                    duration: 1500
                });
            }
        });
    },
    takePhoto: function() {
        var a = this;
        wx.createCameraContext().takePhoto({
            quality: "high",
            success: function(s) {
                a.setData({
                    src: s.tempImagePath
                }), console.log(a.data.src), wx.getFileSystemManager().readFile({
                    filePath: a.data.src,
                    encoding: "base64",
                    success: function(s) {
                        a.setData({
                            base64: s.data
                        }), a.myRequest(), console.log("endrequest");
                    }
                });
            }
        }), wx.showToast({
            title: "验证中...",
            icon: "loading",
            duration: 1e4
        });
    },
    error: function(a) {
        console.log(a.detail);
    },
    onLoad: function(s) {
        var t = this;
        t.setData({
            classId: s.classId
        }), wx.request({
            url: a.globalData.ip + "/student/gettoken",
            data: {},
            success: function(a) {
                t.setData({
                    token: a.data
                }), console.log(t.data.classId), console.log("token" + t.data.token);
            }
        });
    }
});