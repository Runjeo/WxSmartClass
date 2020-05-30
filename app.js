App({
    onLaunch: function() {
        var t = this;
        wx.login({
            success: function(t) {
                console.log(" onLaunch:wx.login");
            }
        }), wx.getSystemInfo({
            success: function(e) {
                t.globalData.StatusBar = e.statusBarHeight;
                var o = wx.getMenuButtonBoundingClientRect();
                o ? (t.globalData.Custom = o, t.globalData.CustomBar = o.bottom + o.top - e.statusBarHeight) : t.globalData.CustomBar = e.statusBarHeight + 50;
            }
        }), wx.getSetting({
            success: function(e) {
                console.log("wx.gstSetting"), e.authSetting["scope.userInfo"] ? (console.log("已经授权"), 
                wx.getUserInfo({
                    success: function(e) {
                        console.log("wx.getUserInfo"), t.globalData.userInfo = e.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(e);
                    }
                })) : console.log("未授权");
            }
        });
    },
    globalData: {
        username: "",
        userInfo: null,
        ip: "https://smartclass.fun:54656/",
        //ip:"http://192.168.0.104:6680/",
        openId: "",
        studentId: "",
        teacherId: "",
        ColorList: [ {
            title: "嫣红",
            name: "red",
            color: "#e54d42"
        }, {
            title: "桔橙",
            name: "orange",
            color: "#f37b1d"
        }, {
            title: "明黄",
            name: "yellow",
            color: "#fbbd08"
        }, {
            title: "橄榄",
            name: "olive",
            color: "#8dc63f"
        }, {
            title: "森绿",
            name: "green",
            color: "#39b54a"
        }, {
            title: "天青",
            name: "cyan",
            color: "#1cbbb4"
        }, {
            title: "海蓝",
            name: "blue",
            color: "#0081ff"
        }, {
            title: "姹紫",
            name: "purple",
            color: "#6739b6"
        }, {
            title: "木槿",
            name: "mauve",
            color: "#9c26b0"
        }, {
            title: "桃粉",
            name: "pink",
            color: "#e03997"
        }, {
            title: "棕褐",
            name: "brown",
            color: "#a5673f"
        }, {
            title: "玄灰",
            name: "grey",
            color: "#8799a3"
        }, {
            title: "草灰",
            name: "gray",
            color: "#aaaaaa"
        }, {
            title: "墨黑",
            name: "black",
            color: "#333333"
        }, {
            title: "雅白",
            name: "white",
            color: "#ffffff"
        } ]
    }
});