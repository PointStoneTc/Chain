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
    pageSize: 6,
    caterories:{},
    init: function () {
        Common.getCategoreType();
        Common.getHomeData(function (data) {
            homePage.topNewsShow(data);
            homePage.imgNewsShow(data.postMap["181"]);

            if ($(".news_mobile_container").is(':hidden')) {
                homePage.newsListShow(data.postMap["99"], $('.news_list_con .news_container'),99);
                homePage.newsListShow(data.postMap["184"], $('.teji_list .news_container'),184);
                homePage.newsListShow(data.postMap["185"], $('.channel_list .news_container'),185);
            } else {
                homePage.mobileNewsListShow(data.postMap["99"], $('.news_list_con .news_mobile_container'),99);
                homePage.mobileNewsListShow(data.postMap["184"], $('.teji_list .news_mobile_container'),184);
                homePage.mobileNewsListShow(data.postMap["185"], $('.channel_list .news_mobile_container'),185);
            }
            homePage.getAdvertData(data);

        });
        // 排行
        this.getRankingData(99);
    },
    topNewsShow: function (json) {
        var data = json.postMap["180"];
        // 要改标记
        var imgUrl= data[0].featuredmedia.media_details[2].source_url;
        if(data[2].featuredmedia){
           imgUrl= data[2].featuredmedia.media_details[2].source_url;
        }
        $(".news_banner .banner_left img").attr("src", data[0].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id);
        $(".news_banner .banner_left .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top img").attr("src", data[1].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id);
        $(".news_banner .banner_r_top .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot img").attr("src", imgUrl );
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id);
        $(".news_banner .banner_r_bot .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        $(".news_banner .banner_left .new_catelage").text(Common.categories[180]);
        $(".news_banner .banner_r_top .new_catelage").text(Common.categories[180]);
        $(".news_banner .banner_r_bot .new_catelage").text(Common.categories[180]);

        // 手机端
        var newsFuc = template($("#news_slider").html(), {data: data});
        $(".carousel-inner").html(newsFuc);
    },
    // 获取排行
    getRankingData: function getData(categories) {
        // var url = 'https://www.chainage.jp/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&categories=' + categories;
        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     async: true,
        //     error: function () {
        //     },
        //     success: function (data) {
        //         if (data) {
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
        // }
        //     }
        // });
    },
    // 图片新闻
    imgNewsShow:function(data){
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var linkUrl = './newsContent.html?id=' + data[i].id;
            html += '<div class="col-sm-4 bd-card-mod">'
                + '<a href=" ' + linkUrl + ' ">'
                + '<div class="card-img lazy" style="background-image:url(' + data[i].featuredmedia.media_details[7].source_url + ') " ></div>'
                + '<div class="bg"></div>'
                + '<div class="news_title">' + JSON.parse(data[i].title).rendered + '</div>'
                + '</a>'
                + '</div>';
        }
        $(".news_show .news_show_contain").html(html);
    },
    // 要修改
    getAdvertData: function (data) {
        var data1=data.postMap["186"];
        var data2=data.postMap["187"];
         var html = '<a href="newsContent.html?id=' + data1[0].id + '" ><img src="' + data.postMap["99"][3].featuredmedia.media_details[5].source_url + '" width="100%" height="100%"></a>';
         $(".advert1").html(html);

         var html = '<a href="newsContent.html?id=' + data2[0].id + '" ><img src="' + data.postMap["99"][3].featuredmedia.media_details[5].source_url + '" width="100%" height="100%"></a>';
         $(".advert2").html(html);

    },
    newsListShow: function (data, element,categories) {
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < 6; i++) {
                var title = JSON.parse(data[i].title).rendered;
                var topicurl = data[i].author.avatar_urls["24"];
                var imgUrl="static/img/aa.png";
                if(data[i].featuredmedia){
                    imgurl = data[i].featuredmedia.media_details[1].source_url;
                }
                htm = '<div class="col-md-4 benefit_box"><a href="' + './newsContent.html?id=' + data[i].id + '">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">' + Common.categories[categories] + '</p>'
                    + '<p class="p20 benefit_box_hea">' + title + '</p>'
                    + '<p class="p20 benefit_box_from">'
                    + '<span class="new_list_icon"><img src="' + topicurl + '"></span>'
                    + '<span>' + data[i].author.name + '</span>'
                    + '<div class="time_right"><span class="new_list_time"></span>'
                    + '<span>' + Common.timeonverseFunc(new Date(data[1].date)) + '</span></div>'
                    + '</p><div style="clear: both"></div>'
                    + '<div class="benefit_box_img" style="background-image:url(' + imgurl + ') "></div>'
                    + '<div class="p20 benefit_box_com news_dec">' + data[i].excerpt + '</div>'
                    + '</div>'
                    + '</a></div>';
                element.append(htm);
            }

        }
    },
    mobileNewsListShow: function (data, element,categories) {
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < 6; i++) {
                var title = JSON.parse(data[i].title).rendered;
                var topicurl = data[i].author.avatar_urls["24"];
                var imgUrl="static/img/aa.png";
                if(data[i].featuredmedia){
                    imgurl = data[i].featuredmedia.media_details[1].source_url;
                }

                htm = '<div style=" border-bottom: 1px dashed #CECECE;margin-bottom: 25px;">'
                    + '<a href="newsContent.html?id=' + data[i].id + '" class="new_mobile_con">'
                    + '<div class="media">'
                    + '<div class="media-left media-middle">'
                    + '<div class="benefit_box_img" style="background-image:url(' + imgurl + ') "></div>'
                    + '</div>'
                    + '<div class="media-body">'
                    + '<div class="hot_posts_title">' + title + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="new_dec">'
                    + '<img src="' + topicurl + '" alt="">'
                    + '<div class="edit_detail">'
                    + '<div>' + data[i].author.name + '</div>'
                    + '<div>' + Common.categories[categories] + '</div>'
                    + '</div>'
                    + '<div style="float: right;margin-top: 0.35rem;">'
                    + '<span class="new_list_time"></span>'
                    + '<span class="new_des_time">' + Common.timeonverseFunc(new Date(data[1].date)) + '</span>'
                    + '</div>'
                    + '</div>'
                    + '</a>'
                    + '<div>'
                ;
                element.append(htm);
            }

        }
    }
}
homePage.init();