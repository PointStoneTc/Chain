var Common = {
    categories: [],
    newCounts: [],
    users: [],
    userImgs: [],
    categoriesArr:[],
    eventInit: function () {
        $(".at-label").html('');
        $("body").on("click", ".share_btn", function () {
            $(".share_con").toggle();
        });
        this.getCoinLData();
        this.getCoinRData();
    },
    // 获取首页数据
    getHomeData: function (callback) {
        var url = 'http://data.chainage.jp/blockchain/data/home';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    if (callback) {
                        callback(data);
                    }
                }
            }
        });
    },
    // 请求新闻数据
    getNewsData: function getData(param, callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/posts';
        $.ajax({
            type: 'GET',
            url: url,
            data: param,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    if (callback) {
                        callback(data, param);
                    }
                }
            }
        });
    },
    // 获取分类名称
    getCategoreType: function () {
        var url = 'http://chainage.cc/wp-json/wp/v2/categories?per_page=50';
        var self = this;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            error: function () {
            },
            success: function (data) {
                if (data && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var id = data[i].id;
                        var c = self.categories[id] = data[i].name;
                        var d = self.newCounts[id] = data[i].count;
                        self.categories.push(c);
                        self.newCounts.push(d);
                        self.categoriesArr.push(data[i]);
                    }
                }
            }
        });
    },
    getUsers: function (callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/users';
        var self = this;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var id = data[i].id;
                        var c = self.users[id] = data[i].name;
                        var d = self.userImgs[id] = data[i].avatar_urls["96"];
                        self.users.push(c);
                        self.userImgs.push(d);
                    }
                    if (callback) {
                        callback();
                    }
                }
            }
        });
    },
    // 计算多长时间之前
    timeonverseFunc: function (dateTimeStamp, flag) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var result = '';

        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            //若日期不符则弹出窗口告之
            //alert("结束日期不能小于开始日期！");
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            if (flag) {
                result = parseInt(monthC) + "月前";
            } else {
                result = parseInt(monthC) + " month ago";
            }
        }
        else if (weekC >= 1) {
            if (flag) {
                result = parseInt(weekC) + "週間 前";
            } else {
                result = parseInt(weekC) + " week ago";
            }
        }
        else if (dayC >= 1) {
            if (flag) {
                result = parseInt(dayC) + "日 前";
            } else {
                result = parseInt(dayC) + " days ago";
            }
        }
        else if (hourC >= 1) {
            if (flag) {
                result = parseInt(hourC) + "時間 前";
            } else {
                result = parseInt(hourC) + " hours ago";
            }
        }
        else if (minC >= 1) {
            if (flag) {
                result = parseInt(minC) + "分 前";
            } else {
                result = parseInt(minC) + " minutes ago";
            }
        } else {
            result = "ちょうど";
        }
        return result;
    },
    // 获取地址栏参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return '';
    },
    // 获取单个文章
    getSingleData: function getData(id, callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/posts/' + id;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    if (callback) {
                        callback(data);
                    }
                }
            }
        });
    },
    // 获取热门文章
    getHotPostsData: function (callback) {
        var url = 'http://data.chainage.jp/blockchain/data/rightPopular';
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    callback(data);
                }
            }
        });
    },
    // 获取左上角数据
    getCoinRData:function(){
        var url = 'http://data.chainage.jp/blockchain/coinapi/onedayCap';
        $.ajax({
            type: 'GET',
            url: url,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    $(".header-left span").eq(6).html('¥ '+data.list[0].total_volume_24h.toFixed(2));
                }
            }
        });
    },
    // 获取左上角数据
    getCoinLData:function(){
        var url = 'http://data.chainage.jp/blockchain/coinapi/assetTrend';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {

            },
            success: function (data) {
              if(data){

                  var coinData=Common.coinLookUp(data, 'BTC');
                  $(".header-left span").eq(2).html('¥ '+coinData.specificRate.volume24h.toFixed(2));
              }
            }
        });
    },
    // 获取图片
    getImgData: function (imgArr, callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/media?per_page=' + imgArr.length + '&parent=' + imgArr.join(',');
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    callback(data);
                }
            }
        });

    },
    dataFormat: function (shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return m + '月' + d + '日';
    },
    // 转换年月日
    dateFormat: function (startTime) {
        startTime = startTime.substr(0, startTime.length - 3);
        var yMD = startTime.split(" ")[0];
        var hMS = startTime.split(" ")[1];
        var startTimeArr = yMD.split("-");
        if (startTimeArr[1].substr(0, 1) == 0) {
            startTimeArr[1] = startTimeArr[1].substr(1, 2)
        }
        if (startTimeArr[2].substr(0, 1) == 0) {
            startTimeArr[2] = startTimeArr[1].substr(1, 2)
        }
        startTime = startTimeArr[0] + '年' + startTimeArr[1] + '月' + startTimeArr[2] + '日';
        return startTime;
    },

    // 查找数组中属性值的对
    lookUp: function (name, arr) {
        for (var i in arr)
            if (arr[i].name == name) {
                return arr[i].source_url;
            }
    },
    // 查找数组中属性值图片比例相似的对象
    coinLookUp: function (arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].specificRate.baseSymbol == value) {
                return arr[i];
            }
        }
    },
    lookUpCat: function (arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == value) {
                return arr[i];
            }
        }
    },
    // 获取相似比例图片
    getSimilarImg: function (arr, scale) {
        var obj = [];
        for (var i in arr) {
            obj.push([arr[i], i]);
        }
        ;
        let myShe = obj.sort(function (a, b) {
            return Math.abs(a[0].width / a[0].height - scale) - Math.abs(b[0].width / b[0].height - scale);
        })[0][0];

        if (myShe.source_url) {
            return myShe.source_url;
        } else {
            return myShe.url;
        }
    }, // 获取相似比例图片
    contentSimilarImg: function (arr, scale) {
        let myShe = arr.sort(function (a, b) {
            return Math.abs(a.width / a.height - scale) - Math.abs(b.width / b.height - scale);
        })[0];
        return myShe.source_url;
    },

    // 获取相似宽度图片
    getSimilarWidthImg: function (arr, scale) {
        var obj = [];
        for (var i in arr) {
            obj.push([arr[i], i]);
        }
        ;

        let myShe = obj.sort(function (a, b) {
            return Math.abs(a[0].width - scale) - Math.abs(b[0].width - scale);
        })[0][0];

        return myShe.source_url;
    },
    // 首页获取相似宽度图片
    getSimilarWidth: function (arr, scale) {
        let myShe = arr.sort(function (a, b) {
            return Math.abs(a.width - scale) - Math.abs(b.width - scale);
        })[0];

        return myShe.source_url;
    },
    // 查找数组中具有某个属性值的对象
    objLookUp: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if ('adv_img' in arr[i]) {
                return arr[i];
            }
        }

    },
    /**
     * showToast 提示
     * @param msg
     * @param timeout
     */
    showToast: function (msg, timeout) {
        var time = timeout || 2000;
        $("#showToast").show();
        $("#showToast").html(msg);
        setTimeout(function () {
            $("#showToast").hide();
        }, time);

    },

    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        var str = name + "=" + encodeURIComponent(value)+ ";expires=" + exp.toGMTString();
        document.cookie = str;
    },
    /**
     * 获取指定名称的cookie值
     * @method get
     * @param {String} name cookie名称
     * @return {String} 获取到的cookie值
     */
    getCookie: function (name) {
        var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return v ? decodeURIComponent(v[1]) : null;
    },
    remove : function(name, path, domain) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }

}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Common.eventInit();