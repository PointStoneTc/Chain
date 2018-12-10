var Common = {
    categories: [],
    newCounts: [],
    users: [],
    userImgs: [],
    eventInit: function () {
        $("body").on("click", ".share_btn", function () {
            $(".share_con").toggle();
        });
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
                        self.newCounts.push(d)
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
                    if(callback){
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
    // 查找数组中属性值的对象
    lookUp: function (name, arr) {
        for (var i in arr)
            if (arr[i].name == name) {
                return arr[i].source_url;
            }
    },
    // 查找数组中属性值图片比例相似的对象
    coinLookUp: function (arr,value ) {
        for (var i=0;i<arr.length;i++ ) {
            if (arr[i].specificRate.baseSymbol == value) {
                return arr[i];
            }
        }
    },
    // 获取相似比例图片
    getSimilarImg:function(arr,scale){
        var obj = [];
        for (var i in arr) {
            obj.push([arr[i],i]);
        };
        let myShe=obj.sort(function(a, b) {
            return Math.abs(a[0].width/a[0].height - scale) - Math.abs(b[0].width/b[0].height - scale);
        })[0][0];
        return myShe.source_url;
    },
    // 获取相似宽度图片
    getSimilarWidthImg:function(arr,scale){
        var obj = [];
        for (var i in arr) {
            obj.push([arr[i],i]);
        };

        let myShe=obj.sort(function(a, b) {
            return Math.abs(a[0].width - scale) - Math.abs(b[0].width - scale);
        })[0][0];

        return myShe.source_url;
    },
    // 首页获取相似宽度图片
    getSimilarWidth:function(arr,scale){
        let myShe=arr.sort(function(a, b) {
            return Math.abs(a.width - scale) - Math.abs(b.width - scale);
        })[0];

        return myShe.source_url;
    }

}

Common.eventInit();