function loadProperties(type) {
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: '../i18n/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: type, // 对应的语言
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
            //   $('.aa').html($.i18n.prop('string_text'));

        }
    });
}

$(document).ready(function () {
    var LANGUAGE_CODE = jQuery.i18n.normaliseLanguageCode({}); //获取浏览器的语言
    loadProperties(LANGUAGE_CODE);
});

var listNewsPage = {
    pageSize: 15,
    categories: [],
    newCounts:[],
    users:[],
    init: function () {
        this.getCategoreType();
        this.getUsers();
        this.eventInit();

        // 置顶新闻
        this.getNewsData({per_page:3,order:'desc',orderby:'date',categories:99},function(data){
            $(".news_banner .banner_left img").attr("src", data[0].jetpack_featured_media_url);
            $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id);
            $(".news_banner .banner_left .new_title").text(data[0].title.rendered);
            $(".news_banner .banner_left .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[0].date).getTime()));
            $(".news_banner .banner_r_top img").attr("src", data[1].jetpack_featured_media_url);
            $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id);
            $(".news_banner .banner_r_top .new_title").text(data[1].title.rendered);
            $(".news_banner .banner_r_top .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[1].date).getTime()));
            $(".news_banner .banner_r_bot img").attr("src", data[2].jetpack_featured_media_url);
            $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id);
            $(".news_banner .banner_r_bot .new_title").text(data[2].title.rendered);
            $(".news_banner .banner_r_bot .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[2].date).getTime()));

            $(".news_banner .banner_left .new_catelage").text(listNewsPage.categories[data[0].categories[0]]);
            $(".news_banner .banner_r_top .new_catelage").text(listNewsPage.categories[data[1].categories[0]]);
            $(".news_banner .banner_r_bot .new_catelage").text(listNewsPage.categories[data[2].categories[0]]);
        });
        // 排行
        this.getRankingData(99);
        // 图片新闻
        this.getNewsData({per_page:3,order:'desc',orderby:'date',categories:99},function(data){
            var html='';
            for(var i=0;i<data.length;i++){
                var linkUrl='./newsContent.html?id=' + data[i].id;
                html+='<div class="col-sm-4 bd-card-mod">'
                    +'<a href=" '+linkUrl+' ">'
                    + '<img class="card-img lazy" src="'+data[i].jetpack_featured_media_url+'" style="display: inline;">'
                    +'</a>'
                    + '</div>';
            }
            $(".news_show .news_show_contain").html(html);
        });
        //新闻、交易所....
        if(this.getQueryString('pageFlag')==1){
            $(".news_title").text("ニュース");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.getQueryString('pageFlag')==2){
            $(".news_title").text("取引所");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99});
        }else if(this.getQueryString('pageFlag')==3){
            $(".news_title").text("基础知识");
            $(".new_tabs li:eq(0)").text("コインリスト");
            $(".new_tabs li:eq(1)").text("用語解説");
            $(".new_tabs li").width("1.6rem");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.getQueryString('pageFlag')==4){
            $(".news_title").text("ChainAge Channel");
            $(".new_tabs li:eq(0)").text("Moive");
            $(".new_tabs li:eq(1)").text("漫画");
            // 请求
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.getQueryString('pageFlag')==5){
            $(".news_title").text("政府团体");
            $(".new_tabs li:eq(0)").text("金融厅");
            $(".new_tabs li:eq(1)").remove()
            $(".news_contain").hide()
            $(".page_con").hide();
            $(".government_con").show();
            // 请求 政府
        }else{
            $(".news_title").text("ニュース");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }

    },
    // 请求新闻数据
    getNewsData: function getData(param,callback) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/posts?per_page='+param.per_page+'&order='+param.order+'&orderby='+param.orderby+'&categories=' + param.categories;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
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
                if (data) {
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
                if (data) {
                    for (var i = 0; i <data.length; i++) {
                        var id=data[i].id;
                        var c = self.users[id] = data[i].name;
                        self.users.push(c);
                    }
                }
            }
        });
    },
    // 获取排行
    getRankingData: function getData(categories) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&categories=' + categories;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    var data = [{persion: "20%"}, {persion: "20%"}, {persion: "-20%"}, {persion: "-20%"}, {persion: "20%"}, {persion: "20%"}];
                    // 注册关注 template方法
                    template.registerFunction('percent', function (valueText) {
                        var str = "up_color";
                        if (parseInt(valueText) >= 0) {
                            str = "up_color";
                        } else {
                            str = "down_color";
                        }
                        return str;
                    });
                    var newsFuc = template($("#message_show").html(), {data: data});
                    $(".message_show ul").html(newsFuc);
                }
            }
        });
    },
    eventInit:function(){
        $('.new_tabs li').click(function() {
            $(this).addClass('current').siblings().removeClass('current');
            // 判断1234 等于5不处理
            listNewsPage.getNewsData();
        });
    },
    // 计算多长时间之前
    timeonverseFunc: function (dateTimeStamp) {
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
            result = parseInt(monthC) + "个月前";
        }
        else if (weekC >= 1) {
            result = parseInt(weekC) + " week ago";
        }
        else if (dayC >= 1) {
            result = parseInt(dayC) + " days ago";
        }
        else if (hourC >= 1) {
            result = parseInt(hourC) + " hours ago";
        }
        else if (minC >= 1) {
            result = parseInt(minC) + " minutes ago";
        } else
            result = "刚刚";
        return result;

    },
    getNewsListData:function(param,callback){
        // 列表新闻
        this.getNewsData(param,function(data){
            var htm = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htm += '<a href="'+ './newsContent.html?id=' + data[i].id+'"><div class="col-md-4 benefit_box">'
                        + '<div class="benefit_box_con">'
                        + '<p class="p20 benefit_box_tit">'+listNewsPage.categories[data[i].categories[0]]+'</p>'
                        + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                        + '<p class="p20 benefit_box_from">'
                        +'<span class="new_list_icon"></span>'
                        +'<span>'+listNewsPage.users[data[i].author]+'</span>'
                        +'<div class="time_right"><span class="new_list_time"></span>'
                        +'<span>'+listNewsPage.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                        + '</p>'
                        + '<img style="width: 100%; height: 1.52rem;" src="'+data[i].jetpack_featured_media_url+'">'
                        + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                        + '</div>'
                        + '</div></a>';
                }
                $('.news_list_con .news_container').html(htm);
            }
            if(callback){
                callback(param);
            }
        });
    },
    // 加载更多新闻数据
    loadNewSData: function (data,param) {

    },
    // 分页显示
    setPagination:function(param){
        $(".page").pagination(listNewsPage.newCounts[param.categories], {
            'items_per_page': 15,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + listNewsPage.newCounts[param.categories] + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                param = $.extend(param, {start: pageIndex * 15, limit: '15'});
                console.log(param);
                listNewsPage.getNewsListData(param);
            }, this)
        });
    },
    // 获取地址栏参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return '';
    }
}
listNewsPage.init();