var Common={
    categories: [],
    newCounts:[],
    users:[],
    // 请求新闻数据
    getNewsData: function getData(param,callback) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/posts';
        $.ajax({
            type: 'GET',
            url: url,
            data:param,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length>0) {
                    if(callback){
                        callback(data,param);
                    }
                }
            }
        });
    },
    // 获取分类名称
    getCategoreType: function () {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/categories?per_page=50';
        var self = this;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length>0) {
                    for (var i = 0; i <data.length; i++) {
                        var id=data[i].id;
                        var c = self.categories[id] = data[i].name;
                        var d = self.newCounts[id] = data[i].count;
                        self.categories.push(c);
                        self.newCounts.push(d)
                    }
                }
            }
        });
    },
    getUsers:function(){
        var url = 'https://www.chainage.jp/wp-json/wp/v2/users';
        var self = this;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length>0) {
                    for (var i = 0; i <data.length; i++) {
                        var id=data[i].id;
                        var c = self.users[id] = data[i].name;
                        self.users.push(c);
                    }
                }
            }
        });
    },
    // 计算多长时间之前
    timeonverseFunc: function (dateTimeStamp,flag) {
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
            if(flag){
                result = parseInt(monthC) + " 月前";
            }else{
                result = parseInt(monthC) + " month ago";
            }
        }
        else if (weekC >= 1) {
            if(flag){
                result = parseInt(weekC) + " 週間 前";
            }else{
                result = parseInt(weekC) + " week ago";
            }
        }
        else if (dayC >= 1) {
            if(flag){
                result = parseInt(dayC) + " 日 前";
            }else{
                result = parseInt(dayC) + " days ago";
            }
        }
        else if (hourC >= 1) {
            if(flag){
                result = parseInt(hourC) + " 時間 前";
            }else{
                result = parseInt(hourC) + " hours ago";
            }
        }
        else if (minC >= 1) {
            if(flag){
                result = parseInt(minC) + " 分 前";
            }else{
                result = parseInt(minC) + " minutes ago";
            }
        } else{
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
    getSingleData: function getData(id,callback) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/posts/'+id;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    if(callback){
                        callback(data);
                    }
                }
            }
        });
    },
}