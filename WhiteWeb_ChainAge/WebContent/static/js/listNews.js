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
        this.getAdvertData({per_page:3,order:'desc',orderby:'date',categories:99});
        //新闻、交易所....
        if(this.pageFlag==1){
            $(".news_title").text("ニュース");
            // 请求
            this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.pageFlag==2){
            $(".news_title").text("取引所");
            // 请求
            this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:99});
        }else if(this.pageFlag==3){
            $(".news_title").text("基础知识");
            $(".new_tabs li:eq(0)").text("コインリスト");
            $(".new_tabs li:eq(1)").text("用語解説");
            $(".new_tabs li").width("1.6rem");
            // 请求
            this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }else if(this.pageFlag==4){
            $(".news_title").text("ChainAge Channel");
            $(".new_tabs li:eq(0)").text("Moive");
            $(".new_tabs li:eq(1)").text("漫画");
            // 请求
            this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:99},function(param){
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
            Common.getNewsData({per_page:30,order:'desc',orderby:'date',categories:99},function(data){
                listNewsPage.getGovernmentGroup(data);
            });
        }else{
            $(".news_title").text("ニュース");
            // 请求
            this.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:99},function(param){
                listNewsPage.setPagination(param);
            });
        }
        this.getAdvertLastesData();
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
        $('.new_tabs li').click(function() {
            $(this).addClass('current').siblings().removeClass('current');
            // 判断1234 等于5不处理
            if(listNewsPage.pageFlag==1){
                var categories=99;
                if($(this).text()=="国内"){
                    categories=99;
                }else{
                    categories=99;
                }
                listNewsPage.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:categories},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==2){
                var categories=188;
                if($(this).text()=="国内"){
                    categories=188;
                }else{
                    categories=189;
                }
                listNewsPage.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:103});
            }else if(listNewsPage.pageFlag==3){
                var categories=188;
                if($(this).text()=="国内"){
                    categories=188;
                }else{
                    categories=189;
                }
                listNewsPage.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:100},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==4){
                var categories=188;
                if($(this).text()=="国内"){
                    categories=188;
                }else{
                    categories=189;
                }
                listNewsPage.getNewsListData({per_page:12,order:'desc',orderby:'date',categories:148},function(param){
                    listNewsPage.setPagination(param);
                });
            }else if(listNewsPage.pageFlag==5){

            }else{
                var categories=99;
                if($(this).text()=="国内"){
                    categories=99;
                }else{
                    categories=99;
                }
                listNewsPage.getNewsListData({per_page:13,order:'desc',orderby:'date',categories:99},function(param){
                    listNewsPage.setPagination(param);
                });
            }
        });
    },
    getNewsListData:function(param,callback){
        // 列表新闻
        Common.getNewsData(param,function(data){
            data.splice(6, 0,listNewsPage.advertData[0] , listNewsPage.advertData[1],listNewsPage.advertData[2]);
            var htm = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htm += '<div class="col-md-4 benefit_box"><a href="'+ './newsContent.html?id=' + data[i].id+'">'
                        + '<div class="benefit_box_con">'
                        + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                        + '<p class="p20 benefit_box_hea">'+data[i].title.rendered+'</p>'
                        + '<p class="p20 benefit_box_from">'
                        +'<span class="new_list_icon"><img src="'+Common.userImgs[data[i].author]+'" ></span>'
                        +'<span>'+Common.users[data[i].author]+'</span>'
                        +'<div class="time_right"><span class="new_list_time"></span>'
                        +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                        + '</p><div style="clear: both"></div>'
                        + '<div class="benefit_box_img" style="background-image:url('+data[i].jetpack_featured_media_url+') "></div>'
                        + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                        + '</div>'
                        + '</a></div>';
                }
                $('.news_list_con .news_container').html(htm);
            }else{
                $('.news_list_con .news_container').html('');
            }
            if(callback){
                callback(param);
            }
        });
    },
    // 获取图片
    getImgData:function(){

    },
    // 政府团体
    getGovernmentGroup:function(data){
        var url = 'http://data.chainage.jp/blockchain/data/financeDepart';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    var governmentFuc = template($("#governmentShow").html(), {data: data.array});
                    $(".government_con").html(governmentFuc);
                }
            }
        });

    },
    // 获取广告
    getAdvertData:function(){
        var param = {
            categories: 99,
            per_page: 3,
            order: 'desc',
            orderby: 'date'
        }
        Common.getNewsData(param,function(data){
            if(data){
                listNewsPage.advertData=data;
            }
        })
    },
    // 获取最下面广告
    getAdvertLastesData:function(){
        var param = {
            categories: 99,
            per_page: 1,
            order: 'desc',
            orderby: 'date',
            status: 'publish'
        }
        Common.getNewsData(param,function(data){
            if(data){
                var html='<a href="newsContent.html?id='+data[0].id+'" ><img src="'+data[0].jetpack_featured_media_url+'" width="100%" height="100%"></a>';
                $(".advert").html(html);
            }
        })
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
                console.log($page);
                param = $.extend(param, {page: pageIndex+1});
                listNewsPage.getNewsListData(param);
            }, this)
        });
    },

}
listNewsPage.init();