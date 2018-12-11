var listNewsPage = {
    pageSize: 12,
    init: function () {
        Common.getCategoreType();
        Common.getUsers();
        this.eventInit();
        // 头部新闻
        Common.getHomeData(function (data) {
            listNewsPage.topNewsShow(data);
            listNewsPage.imgNewsShow(data.postMap["181"]);
        });
        this.getRankingData(99);
        this.getEventData();

    },
    topNewsShow: function (json) {
        var data = json.postMap["180"];
        // 要改标记
        var imgUrl= 'static/img/default_700.jpg';
        for(var i=0;i<data.length;i++){
            if(data[i].metadata){
                data[i].imgUrl='http://chainage.cc'+data[i].metadata[32].adv_img;
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

    eventInit:function(){
        // 查找事件
        $(".search_event_btn").on("click",function(){

        });
        // 按照日历查看
        $(".data_view").on("click",function(){

        });
        // 上一页
        $(".before_btn").on("click",function(){

        });
        // 下一页
        $(".award_btn").on("click",function(){

        });
    },
    getEventData:function(){
        // var url = 'http://chainage.cc/wp-json/tribe/events/v1/events';
        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     async: true,
        //     error: function () {
        //     },
        //     success: function (data) {
        //         if (data) {
        //             var html='';
        //             var data=data.events;
                    for(var i=0;i<6;i++){

                        html='<div class="event_item col-xs-12 col-sm-4">'
                            +'<a href="eventContent.html">'
                            +'<div class="event_item_con">'
                            +'<div class="event_img"></div>'
                            +'<div class="event_date">'
                            +'<div style="font-size: 0.12rem;line-height: 11px">2018</div>'
                            +'<div style="font-size: 0.17rem">9月</div>'
                            +'<div style="font-size: 0.13rem;line-height: 11px">17日</div>'
                            +'</div>'
                            +'<div class="event-des clearfix">'
                            +'<div class="col-xs-3">'
                            +'<img src="static/img/chainge_editer.png" alt="">'
                            +'</div>'
                            +'<div class="col-xs-9" >'
                            +'<div class="event_title">hhaa好好说话是是是护手霜时好时坏水水水水是</div>'
                            +'<div style="margin-top: 2px">'
                            +'<span class="event_address"></span>'
                            +'<span>地区</span>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                            +'<div></a></div>';
                        $(".news_container").append(html);
                    }
                // }
        //     }
        // });
    }

}
listNewsPage.init();