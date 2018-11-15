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
        Common.getCategoreType();
        Common.getUsers();
        $('.news_list_con .news_container').data('num',0)
        $('.teji_list .news_container').data('num',0)
        // 置顶新闻
        Common.getNewsData({per_page:3,order:'desc',orderby:'date',categories:99},function(data){
            $(".news_banner .banner_left img").attr("src", data[0].jetpack_featured_media_url);
            $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id);
            $(".news_banner .banner_left .new_title").text(data[0].title.rendered);
            $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
            $(".news_banner .banner_r_top img").attr("src", data[1].jetpack_featured_media_url);
            $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id);
            $(".news_banner .banner_r_top .new_title").text(data[1].title.rendered);
            $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
            $(".news_banner .banner_r_bot img").attr("src", data[2].jetpack_featured_media_url);
            $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id);
            $(".news_banner .banner_r_bot .new_title").text(data[2].title.rendered);
            $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

            $(".news_banner .banner_left .new_catelage").text(Common.categories[data[0].categories[0]]);
            $(".news_banner .banner_r_top .new_catelage").text(Common.categories[data[1].categories[0]]);
            $(".news_banner .banner_r_bot .new_catelage").text(Common.categories[data[2].categories[0]]);
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
                   + '<img class="card-img lazy" src="'+data[i].jetpack_featured_media_url+'" style="display: inline;">'
                   +'</a>'
                   + '</div>';
           }
           $(".news_show .news_show_contain").html(html);
        });
        this.getNewsListData();
        this.getAdvertData();
        // 特集列表
        this.getTejiData();
        // ChainAge Channel列表
        Common.getNewsData({per_page:6,order:'desc',orderby:'date',categories:99},function(data,param){
            var htm = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htm += '<div class="col-md-4 benefit_box">'
                        + '<div class="benefit_box_con">'
                        + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                        + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                        + '<p class="p20 benefit_box_from">'
                        +'<span class="new_list_icon"></span>'
                        +'<span>'+Common.users[data[i].author]+'</span>'
                        +'<div class="time_right"><span class="new_list_time"></span>'
                        +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                        + '</p>'
                        + '<img style="width: 100%; height: 1.52rem;" src="'+data[i].jetpack_featured_media_url+'">'
                        + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                        + '</div>'
                        + '</div>';
                }
                $('.channel_list .news_container').append(htm);
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
    getNewsListData:function(param){
        var paramData={per_page:6,order:'desc',orderby:'date',categories:99};
        if(param){
            paramData.page=param.page;
        }
        // 列表新闻
        Common.getNewsData(paramData,function(data,param){
            homePage.loadNewSData(data,param);
        });
    },
    // 加载更多新闻数据
    loadNewSData: function (data,param) {
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                htm += '<div class="col-md-4 benefit_box"><a href="'+ './newsContent.html?id=' + data[i].id+'">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                    + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                    + '<p class="p20 benefit_box_from">'
                    +'<span class="new_list_icon"></span>'
                    +'<span>'+Common.users[data[i].author]+'</span>'
                    +'<div class="time_right"><span class="new_list_time"></span>'
                    +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                    + '</p>'
                    + '<img style="width: 100%; height: 1.52rem;" src="'+data[i].jetpack_featured_media_url+'">'
                    + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                    + '</div>'
                    + '</a></div>';
            }
            $('.news_list_con .news_container').append(htm);
        }
        var num = $('.news_list_con .news_container').data('num');

        //判断是否需要显示加载更多的按钮
        if (Common.newCounts[param.categories] - ((homePage.pageSize) * num + homePage.pageSize) > 0) {
            $('.listMoreBtn').unbind('click').on('click', function () {
                $('.news_list_con .news_container').data('num', num + 1);
                console.log($('.news_list_con .news_container').data('num'))
                homePage.getNewsListData({
                    "page": $('.news_list_con .news_container').data('num')+1
                });
            });
        } else {
            $('.listMoreBtn').remove(); // 移除加载更多按钮
        }
    },

    getAdvertData:function(param,callback){
        var url = '';
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
    getTejiData:function(param){
        var paramData={per_page:6,order:'desc',orderby:'date',categories:99};
        if(param){
            paramData.page=param.page;
        }
        Common.getNewsData(paramData,function(data,param){
            homePage.loadTejiData(data,param);
        });
    },
    // 加载更多特集数据
    loadTejiData: function (data,param) {
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                htm += '<div class="col-md-4 benefit_box"><a href="'+ './newsContent.html?id=' + data[i].id+'">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                    + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                    + '<p class="p20 benefit_box_from">'
                    +'<span class="new_list_icon"></span>'
                    +'<span>'+Common.users[data[i].author]+'</span>'
                    +'<div class="time_right"><span class="new_list_time"></span>'
                    +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                    + '</p>'
                    + '<img style="width: 100%; height: 1.52rem;" src="'+data[i].jetpack_featured_media_url+'">'
                    + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                    + '</div>'
                    + '</a></div>';
            }
            $('.teji_list .news_container').append(htm);
        }
        var num = $('.teji_list .news_container').data('num');

        //判断是否需要显示加载更多的按钮
        if (Common.newCounts[param.categories] - ((homePage.pageSize) * num + homePage.pageSize) > 0) {
            $('.tejiBtn').unbind('click').on('click', function () {
                $('.teji_list .news_container').data('num', num + 1);
                homePage.getTejiData({
                    "page": $('.teji_list .news_container').data('num')+1
                });
            });
        } else {
            $('.tejiBtn').remove(); // 移除加载更多按钮
        }
    },

}
homePage.init();