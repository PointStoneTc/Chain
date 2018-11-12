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
    pageSize: 3,
    init: function () {
        //新闻、交易所....
        if(this.getQueryString('pageFlag')==1){
            $(".pageFlag").text("ニュース");
            // 请求
            this.getNewsData();
        }else if(this.getQueryString('pageFlag')==2){
            $(".pageFlag").text("取引所");
            // 请求
            this.getNewsData();
        }else if(this.getQueryString('pageFlag')==3){
            $(".pageFlag").text("基础知识");
            $(".new_tabs li:eq(0)").text("コインリスト");
            $(".new_tabs li:eq(1)").text("用語解説");
            $(".new_tabs li").width("1.6rem");
            // 请求
            this.getNewsData();
        }else if(this.getQueryString('pageFlag')==4){
            $(".pageFlag").text("ChainAge Channel");
            $(".new_tabs li:eq(0)").text("Moive");
            $(".new_tabs li:eq(1)").text("漫画");
            // 请求
            this.getNewsData();
        }else{
            $(".pageFlag").text("ChainAge Channel");
            $(".new_tabs li:eq(0)").text("Moive");
            $(".new_tabs li:eq(1)").remove()
            $(".news_contain").hide()
            $(".page_con").hide();
            $(".government_con").show();
           // 请求 政府
        }
        this.eventInit();
        this.getNewsBannerData(99);
        this.getCategoreType(99);

    },
    eventInit:function(){
        $('.new_tabs li').click(function() {
            $(this).addClass('current').siblings().removeClass('current');
            // 判断1234 等于5不处理
            listNewsPage.getNewsData();
        });
    },
    // 请求数据
    getNewsBannerData: function getData(categories) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&categories=' + categories;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    $(".news_banner .banner_left img").attr("src", data[0].jetpack_featured_media_url);
                    $(".news_banner .banner_left a").attr("href", data[0].link);
                    $(".news_banner .banner_left .new_title").text(data[0].title.rendered);
                    $(".news_banner .banner_left .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
                    $(".news_banner .banner_r_top img").attr("src", data[0].jetpack_featured_media_url);
                    $(".news_banner .banner_r_top a").attr("href", data[0].link);
                    $(".news_banner .banner_r_top .new_title").text(data[0].title.rendered);
                    $(".news_banner .banner_r_top .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
                    $(".news_banner .banner_r_bot img").attr("src", data[0].jetpack_featured_media_url);
                    $(".news_banner .banner_r_bot a").attr("href", data[0].link);
                    $(".news_banner .banner_r_bot .new_title").text(data[0].title.rendered);
                    $(".news_banner .banner_r_bot .time_fabu").text(listNewsPage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
                }
            }
        });
    },
    // 获取分类名称
    getCategoreType: function (categories) {
        var url = 'https://www.chainage.jp/wp-json/wp/v2/categories/' + categories;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    $(".news_banner .new_catelage").text(data.name);
                }
            }
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
    // 请求ニュース数据
    getNewsData: function getData(param) {
        var url = 'http://data.chainage.jp/caweb/cc/currencyApiController.do?assetTrend';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            dataType: "text",
            error: function () {

            },
            success: function (data) {
                if (data) {
                    listNewsPage.setPagination();
                }
            }
        });
    },
    // 分页显示
    setPagination:function(data){
        $(".page").pagination(100, {
            'items_per_page': 10,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + 100 + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                param = $.extend(param, {start: pageIndex * 10, limit: '10'});
                if (param.level == '1') {
                    getList('/ngvlcs/front/sh/menu!execute?uid=a0001', param);
                } else {
                    getListTwo('/ngvlcs/front/sh/menu!execute?uid=a0001', param);
                }
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