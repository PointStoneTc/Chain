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

var homePage = {
    pageSize: 3,
    init: function () {
        this.getNewsBannerData(99);
        this.getCategoreType(99);
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
                    $(".news_banner .banner_left .time_fabu").text(homePage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
                    $(".news_banner .banner_r_top img").attr("src", data[0].jetpack_featured_media_url);
                    $(".news_banner .banner_r_top a").attr("href", data[0].link);
                    $(".news_banner .banner_r_top .new_title").text(data[0].title.rendered);
                    $(".news_banner .banner_r_top .time_fabu").text(homePage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
                    $(".news_banner .banner_r_bot img").attr("src", data[0].jetpack_featured_media_url);
                    $(".news_banner .banner_r_bot a").attr("href", data[0].link);
                    $(".news_banner .banner_r_bot .new_title").text(data[0].title.rendered);
                    $(".news_banner .banner_r_bot .time_fabu").text(homePage.timeonverseFunc(new Date(data[0].date_gmt).getTime()));
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
                    homePage.loadNewSData(us009);
                }
            }
        });
    },
    // 加载新闻数据
    loadNewSData: function (data) {
        var more = '<div class="more_btn">もっと読む</div>';
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                htm += '<div class="col-md-4 benefit_box">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">ニュース</p>'
                    + '<p class="p20 benefit_box_com">Zaif関連ニュースまとめ｜金融庁立ち入り検査、麻生財務相発言など</p>'
                    + '<p class="p20 benefit_box_from"><span class="new_list_icon"></span><span>ChainAge Editor</span><span class="new_list_time"></span><span>5 hours ago</span>'
                    + '</p>'
                    + '<img style="width: 100%; height: 1.52rem;" src="../img/aa.png">'
                    + '<p class="p20 benefit_box_com news_dec">仮想通貨交換業者のテックビューロ（大阪市）は２０日、システムへの不正アクセスにより、ビッ</p>'
                    + '<p class="p20" style="font-size: 0.18rem;color: #999">トコインなど仮想通貨が外部に流出したと発表した。</p>'
                    + '</div>'
                    + '</div>';
            }
            $('.news_contain .news_container').append(htm);
        }
        var num = $('#_userOnlineTable.t-table-striped tbody').data('num');
        //判断是否需要显示加载更多的按钮
        if (data.trueCount - ((homePage.pageSize) * num + homePage.pageSize) > 0) {
            $('.news_contain ').after(more);
            $(".news_contain .more_btn").unbind('click').on('click', function () {
                $('.more_btn').remove();  //移除加载更多按钮
                $('.news_contain .news_container').data('num', num + 1);
                homePage.getNewsData({
                    "start": (homePage.pageSize) * num + homePage.pageSize,
                    "isLoadMore": true
                });
            });
        } else {
            $('.more_btn').remove(); // 移除加载更多按钮
        }
    },
}
homePage.init();