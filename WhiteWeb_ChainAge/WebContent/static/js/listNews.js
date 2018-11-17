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
    pageFlag:1,
    pageSize: 15,
    init: function () {
        this.pageFlag=Common.getQueryString("pageFlag");
        Common.getCategoreType();
        Common.getUsers();
        this.eventInit();

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
        //新闻、交易所....
        if(this.pageFlag==1){
            $(".news_title").text("ニュース");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.pageFlag==2){
            $(".news_title").text("取引所");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99});
        }else if(this.pageFlag==3){
            $(".news_title").text("基础知识");
            $(".new_tabs li:eq(0)").text("コインリスト");
            $(".new_tabs li:eq(1)").text("用語解説");
            $(".new_tabs li").width("1.6rem");
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.pageFlag==4){
            $(".news_title").text("ChainAge Channel");
            $(".new_tabs li:eq(0)").text("Moive");
            $(".new_tabs li:eq(1)").text("漫画");
            // 请求
            // 请求
            this.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.pageFlag==5){
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
                    // 注册 template方法
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
            if(listNewsPage.pageFlag==1){
                listNewsPage.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==2){

                listNewsPage.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:103});
            }else if(listNewsPage.pageFlag==3){

                listNewsPage.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:100},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==4){

                listNewsPage.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:148},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==5){

            }else{
                listNewsPage.getNewsListData({per_page:15,order:'desc',orderby:'date',categories:99},function(param){
                    listNewsPage.setPagination(param);
                });
            }
        });
    },

    getNewsListData:function(param,callback){
        // 列表新闻
        Common.getNewsData(param,function(data){
            var htm = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htm += '<a href="'+ './newsContent.html?id=' + data[i].id+'"><div class="col-md-4 benefit_box">'
                        + '<div class="benefit_box_con">'
                        + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                        + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                        + '<p class="p20 benefit_box_from">'
                        +'<span class="new_list_icon"><img src="'+Common.userImgs[data[i].author]+'" ></span>'
                        +'<span>'+Common.users[data[i].author]+'</span>'
                        +'<div class="time_right"><span class="new_list_time"></span>'
                        +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
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

    // 分页显示
    setPagination:function(param){
        $(".page").pagination(Common.newCounts[param.categories], {
            'items_per_page': 15,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + Common.newCounts[param.categories] + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                console.log($page);
                param = $.extend(param, {page: pageIndex+1});
                listNewsPage.getNewsListData(param);
            }, this)
        });
    },

}
listNewsPage.init();