function loadProperties(type) {
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: 'static/i18n/', // 资源文件所在目录路径
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
        var imgUrl= 'static/img/default_700.jpg';
        for(var i=0;i<data.length;i++){
            if(data[i].metadata){
                data[i].imgUrl='http://chainage.cc'+Common.objLookUp(data[i].metadata).adv_img;
            }else{
                data[i].imgUrl= imgUrl;
            }
        }
        $(".news_banner .banner_left .news_banner_img").css({"background":"url("+data[0].imgUrl+") center no-repeat","background-size":"cover"});
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_left .new_title").text(data[0].title);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top .news_banner_img").css({"background":"url("+data[1].imgUrl+") center no-repeat","background-size":"cover"});
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_r_top .new_title").text(data[1].title);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot .news_banner_img").css({"background":"url("+data[2].imgUrl+") center no-repeat","background-size":"cover"});
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_r_bot .new_title").text(data[2].title);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        // $(".news_banner .banner_left .new_catelage").text(Common.categories[180]);
        // $(".news_banner .banner_r_top .new_catelage").text(Common.categories[180]);
        // $(".news_banner .banner_r_bot .new_catelage").text(Common.categories[180]);
        data[0].cat=Common.categories[180];
        // 手机端
        template.registerFunction('imgUrl', function (valueText) {
            var str='';
            if (valueText.thumbnailMediaDetail ) {
                str = valueText.thumbnailMediaDetail.source_url ;
            } else {
                str = imgUrl;
            }
            return str;
        });
        var newsFuc = template($("#news_slider").html(), {data: data});
        $(".carousel-inner").html(newsFuc);
    },
   // 图片新闻
    imgNewsShow:function(data){
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var linkUrl = './newsContent.html?id=' + data[i].id+'&cat='+Common.categories[181];
            var imgUrl= 'static/img/default_300x150.jpg';
            if(data[i].thumbnailMediaDetail){
                imgUrl=data[i].thumbnailMediaDetail.source_url;
            }

            html += '<div class="col-sm-4 bd-card-mod">'
                + '<a href=" ' + linkUrl + ' ">'
                + '<div class="card-img lazy" style="background-image:url(' + imgUrl+ ') " ><div class="bg"></div></div>'
                + '<div class="news_title">' + data[i].title + '</div>'
                + '</a>'
                + '</div>';
        }
        $(".news_show .news_show_contain").html(html);
    },
    // 获取排行
    getRankingData: function getData(categories) {
        var url = 'http://data.chainage.jp/caweb/cc/currencyApiController.do?assetTrend';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    var coinData=JSON.parse(data);
                   // var data= JSON.parse(data).splice(0,6);
                   var data=[];
                   data.push(Common.coinLookUp(coinData,'BTC'))
                   data.push(Common.coinLookUp(coinData,'ETH'))
                   data.push(Common.coinLookUp(coinData,'LTC'))
                   data.push(Common.coinLookUp(coinData,'XRP'))
                   data.push(Common.coinLookUp(coinData,'BCH'))
                   data.push(Common.coinLookUp(coinData,'ETC'))
                    // 注册关注 template方法
                    template.registerFunction('price', function (valueText) {
                        return valueText.specificRate.price.toFixed(2);
                    });
                    template.registerFunction('percent', function (valueText) {
                        var str = "up_color";
                        if (parseInt(valueText.specificRate.percentChange24h) >= 0) {
                            str = "up_color";
                        } else {
                            str = "down_color";
                        }
                        return str;
                    });
                    template.registerFunction('percentValue', function (valueText) {
                        return valueText.specificRate.percentChange24h.toFixed(2)+'%';
                    });
                    var newsFuc = template($("#message_show").html(), {data: data});
                    $(".message_show ul").html(newsFuc);
        }
            }
        });
    },
    // 要修改
    getAdvertData: function (data) {
        var data1=data.postMap["186"];
        var data2=data.postMap["187"];
        var imgUrl1= 'static/img/default_700.jpg';
        var imgUrl2= 'static/img/default_700.jpg';

        if( data1 && data1[0] && data1[0].featuredMedia){
            imgUrl1=Common.getSimilarWidth(data1[0].featuredMedia.media_details,800);
        }
        if( data2 && data2[0] && data2[0].featuredMedia){
            imgUrl2=Common.getSimilarWidth(data2[0].featuredMedia.media_details,800);
        }

         var html = '<a href="newsContent.html?id=' + data1[0].id + '&cat='+Common.categories[186]+'" ><img src="' + imgUrl1+ '" width="100%" height="100%"></a>';
         $(".advert1").html(html);

         var html = '<a href="newsContent.html?id=' + data2[0].id + '&cat='+Common.categories[187]+'"><img src="' + imgUrl2 + '" width="100%" height="100%"></a>';
         $(".advert2").html(html);

    },
    newsListShow: function (data, element,categories) {
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < 6; i++) {
                var title = data[i].title;
                var topicurl = data[i].author.avatar_urls["24"];
                var imgUrl= 'static/img/default_300x150.jpg';
                if(data[i].thumbnailMediaDetail){
                    imgUrl=data[i].thumbnailMediaDetail.source_url;
                }
                htm = '<div class="col-md-4 benefit_box"><a href="' + './newsContent.html?id=' + data[i].id + '&cat='+Common.categories[categories]+'">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">' + Common.categories[categories] + '</p>'
                    + '<p class="p20 benefit_box_hea">' + title + '</p>'
                    + '<p class="p20 benefit_box_from">'
                    + '<span class="new_list_icon"><img src="' + topicurl + '"></span>'
                    + '<span>' + data[i].author.name + '</span>'
                    + '<div class="time_right"><span class="new_list_time"></span>'
                    + '<span>' + Common.timeonverseFunc(new Date(data[1].date)) + '</span></div>'
                    + '</p><div style="clear: both"></div>'
                    + '<div class="benefit_box_img" style="background-image:url(' + imgUrl + ') "></div>'
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
                var title = data[i].title;
                var topicurl = data[i].author.avatar_urls["24"];
                var imgUrl= 'static/img/default_300x150.jpg';
                if(data[i].thumbnailMediaDetail){
                    imgUrl=data[i].thumbnailMediaDetail.source_url;
                }

                htm = '<div style=" border-bottom: 1px dashed #CECECE;margin-bottom: 25px;">'
                    + '<a href="newsContent.html?id=' + data[i].id + '&cat='+Common.categories[categories]+'" class="new_mobile_con">'
                    + '<div class="media">'
                    + '<div class="media-left media-middle">'
                    + '<div class="benefit_box_img" style="background-image:url(' + imgUrl + ') "></div>'
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