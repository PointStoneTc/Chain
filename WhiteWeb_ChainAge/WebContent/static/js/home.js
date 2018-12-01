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
    init: function () {
        Common.getHomeData(function(data){
            homePage.topNewsShow(data);
            homePage.newsListShow(data.postMap["99"],$('.news_list_con .news_container'));
            homePage.newsListShow(data.postMap["99"],$('.teji_list .news_container'));
            homePage.newsListShow(data.postMap["99"],$('.channel_list .news_container'));
        });

        // 排行
        this.getRankingData(99);
        // 图片新闻
        Common.getNewsData({per_page:3,order:'desc',orderby:'date',categories:99},function(data){
           var html='';
            for(var i=0;i<data.length;i++){
                var linkUrl='./newsContent.html?id=' + data[i].id;
                html+='<div class="col-sm-4 bd-card-mod">'
                    +'<a href=" '+linkUrl+' ">'
                    +'<div class="card-img lazy" style="background-image:url('+data[i].jetpack_featured_media_url+') " ></div>'
                    +'<div class="bg"></div>'
                    +'<div class="news_title">'+data[i].title.rendered+'</div>'
                    +'</a>'
                    + '</div>';
           }
           $(".news_show .news_show_contain").html(html);
        });

        // 广告1
        this.getAdvertData();
    },
    topNewsShow:function(json){
        var data=json.postMap["99"];
        $(".news_banner .banner_left img").attr("src", data[0].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id);
        $(".news_banner .banner_left .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top img").attr("src", data[1].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id);
        $(".news_banner .banner_r_top .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot img").attr("src", data[2].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id);
        $(".news_banner .banner_r_bot .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        $(".news_banner .banner_left .new_catelage").text(data[0].categories[0].name);
        $(".news_banner .banner_r_top .new_catelage").text(data[1].categories[0].name);
        $(".news_banner .banner_r_bot .new_catelage").text(data[2].categories[0].name);

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
    getAdvertData:function(){
        var param1 = {
            categories: 99,
            per_page: 1,
            order: 'desc',
            orderby: 'date',
            status: 'publish'
        }
        Common.getNewsData(param1,function (data) {
            var html='<a href="newsContent.html?id='+data[0].id+'" ><img src="'+data[0].jetpack_featured_media_url+'" width="100%" height="100%"></a>';
            $(".advert1").html(html);
        });
        var param2 = {
            categories: 99,
            per_page: 1,
            order: 'desc',
            orderby: 'date',
            status: 'publish'
        }
        Common.getNewsData(param2,function (data) {
            var html = '<a href="newsContent.html?id=' + data[0].id + '" ><img src="' + data[0].jetpack_featured_media_url + '" width="100%" height="100%"></a>';
            $(".advert2").html(html);
        });

    },
    newsListShow:function(data,element){
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < 6; i++) {
                var title=JSON.parse(data[i].title).rendered;
                var topicurl=data[i].author.avatar_urls["24"];
                var imgurl=data[i].jetpack_featured_media_url;
                if(data[i].featuredmedia){
                    imgurl=data[i].featuredmedia.media_details[1].source_url;
                }

                htm = '<div class="col-md-4 benefit_box"><a href="'+ './newsContent.html?id=' + data[i].id+'">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">'+data[i].categories[0].name+'</p>'
                    + '<p class="p20 benefit_box_hea">'+title+'</p>'
                    + '<p class="p20 benefit_box_from">'
                    +'<span class="new_list_icon"><img src="'+topicurl+'"></span>'
                    +'<span>'+data[i].author.name+'</span>'
                    +'<div class="time_right"><span class="new_list_time"></span>'
                    +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                    + '</p><div style="clear: both"></div>'
                    + '<div class="benefit_box_img" style="background-image:url('+imgurl+') "></div>'
                    + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt+'</div>'
                    + '</div>'
                    + '</a></div>';
                element.append(htm);
            }

        }
    }
}
homePage.init();