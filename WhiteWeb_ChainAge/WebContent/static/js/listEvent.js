var listNewsPage = {
    pageFlag:1,
    pageSize: 12,
    advertData:[],
    init: function () {
        this.pageFlag=Common.getQueryString("pageFlag");
        Common.getCategoreType();
        Common.getUsers();
        this.eventInit();
        // 头部新闻
        Common.getHomeData(function (data) {
            listNewsPage.topNewsShow(data);
            listNewsPage.imgNewsShow(data.postMap["181"]);
        });

        this.getRankingData(99);

            $(".news_title").text("ニュース");
            // 请求
            // this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:188},function(param){

            // });

    },
    topNewsShow: function (json) {
        var data = json.postMap["180"];
        // 要改标记
        var imgUrl= data[0].featuredmedia.media_details[2].source_url;
        if(data[2].featuredmedia){
            imgUrl= data[2].featuredmedia.media_details[2].source_url;
        }
        $(".news_banner .banner_left img").attr("src", data[0].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_left .new_title").text(data[0].title);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top img").attr("src", data[1].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_r_top .new_title").text(data[1].title);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot img").attr("src", imgUrl );
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id+'&cat='+Common.categories[180]);
        $(".news_banner .banner_r_bot .new_title").text(data[2].title);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        $(".news_banner .banner_left .new_catelage").text(Common.categories[180]);
        $(".news_banner .banner_r_top .new_catelage").text(Common.categories[180]);
        $(".news_banner .banner_r_bot .new_catelage").text(Common.categories[180]);
        data[0].cat=Common.categories[180];
        // 手机端
        var newsFuc = template($("#news_slider").html(), {data: data});
        $(".carousel-inner").html(newsFuc);
    },
    // 图片新闻
    imgNewsShow:function(data){
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var linkUrl = './newsContent.html?id=' + data[i].id+'&cat='+Common.categories[181];
            html += '<div class="col-sm-4 bd-card-mod">'
                + '<a href=" ' + linkUrl + ' ">'
                + '<div class="card-img lazy" style="background-image:url(' + data[i].featuredmedia.media_details[7].source_url + ') " ></div>'
                + '<div class="bg"></div>'
                + '<div class="news_title">' + data[i].title + '</div>'
                + '</a>'
                + '</div>';
        }
        $(".news_show .news_show_contain").html(html);
    },

    // 获取排行
    getRankingData: function getData(categories) {
        var url = 'http://chainage.cc/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&categories=' + categories;
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

    },
    getNewsListData:function(param,callback){
        // 列表新闻
        Common.getNewsData(param,function(data){
            var imgId=[];
            for(var i=0;i<data.length;i++){
                imgId.push(data[i].id);
            }

            listNewsPage.getImgData(imgId,function (imgUrl) {
                var htm='';
                $('.news_list_con .news_container').html('');
                for (var i = 0; i < data.length; i++) {
                    var title = data[i].title.rendered;
                    var topicurl = Common.userImgs["24"];
                    var imgUrl="static/img/aa.png";
                    if(data[i].featuredmedia){
                        imgUrl = data[i].featuredmedia.media_details[1].source_url;
                    }
                    htm = '<div style=" border-bottom: 1px dashed #CECECE;margin-bottom: 25px;">'
                        + '<a href="newsContent.html?id=' + data[i].id+'" class="new_mobile_con">'
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
                        + '<div> errrt </div>'
                        + '<div>fffff</div>'
                        + '</div>'
                        + '<div style="float: right;margin-top: 0.35rem;">'
                        + '<span class="new_list_time"></span>'
                        + '<span class="new_des_time">' + Common.timeonverseFunc(new Date(data[1].date)) + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div>';
                    $('.news_list_con .news_container').append(htm);
                }
                // $('.news_list_con .news_container').html(htm);
            });


            if(callback){
                callback(param);
            }
        });
    },
    // 获取图片
    getImgData:function(imgId,callback){
        var url = 'http://chainage.cc/wp-json/wp/v2/media?per_page='+imgId.length+'&parent='+imgId.join(',');
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


    // 分页显示
    setPagination:function(param){
        $(".page").pagination(Common.newCounts[param.categories], {
            'items_per_page': 12,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + Common.newCounts[param.categories] + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                param = $.extend(param, {page: pageIndex+1});
                listNewsPage.getNewsListData(param);
            }, this)
        });
    },

}
listNewsPage.init();