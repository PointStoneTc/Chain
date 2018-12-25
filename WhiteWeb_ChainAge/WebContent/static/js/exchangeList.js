var digitalCurrency={
    init:function () {

        this.getCurrencyInfo('ALL');
        // 热门文章
        this.getAdvertData();
        this.getHotPostsData();
        $(".filter_con").on("click",".button",function(){
            $(this).addClass('active').siblings().removeClass('active');
            var name=$(this).html();
            if(name=='All'){
                name='ALL';
            }

            digitalCurrency.getCurrencyInfo(name);
        })
    },
    // 热门文章
    getHotPostsData: function () {
        // 注册关注 template方法
        template.registerFunction('date', function (valueText) {
            return Common.timeonverseFunc(new Date(valueText).getTime());
        });
        template.registerFunction('year', function (valueText) {
            return valueText.substr(0, 4);
        });
        template.registerFunction('title', function (valueText) {
            return JSON.parse(valueText).rendered;
        });
        template.registerFunction('imgUrl', function (valueText) {
            var imgUrl = 'static/img/defalut_300.jpg';
            if (valueText.thumbnailMediaDetail) {
                imgUrl = valueText.thumbnailMediaDetail.source_url;
            }
            return imgUrl;
        });

        Common.getHotPostsData(function (data) {
            var newsFuc = template($("#news").html(), {data: data.list});
            $(".news_con_right .new-list").append(newsFuc);
        })
    },
    getAdvertData: function (imgData) {

        var param2 = {
            categories: 193,
            per_page: 1,
            order: 'desc',
            orderby: 'date',
            status: 'publish'
        };

        Common.getNewsData(param2, function (data) {
            if (data) {
                var picUrl = "static/img/defalut_300.jpg";
                var html = '<a href="newsContent.html?id=' + data[0].id + '&cat=' + Common.categories[193] + '" ><img  width="100%" height="100%" ></a>';
                $(".post_advert_top").append(html);
                Common.getImgData([data[0].id], function (imgUrl) {
                    if (imgUrl && imgUrl[0] && imgUrl[0].media_details) {
                        picUrl = Common.getSimilarWidthImg(imgUrl[0].media_details.sizes, 300);
                    }
                    $(".post_advert_top img").attr("src", picUrl)
                });
            }
        });

        var param3 = {
            categories: 194,
            per_page: 1,
            order: 'desc',
            orderby: 'date',
            status: 'publish'
        };

        Common.getNewsData(param3, function (data) {
            if (data) {
                var picUrl = "static/img/defalut_300.jpg";
                var html = '<a href="newsContent.html?id=' + data[0].id + '&cat=' + Common.categories[194] + '" ><img width="100%" height="100%" ></a>';
                $(".post_advert_bot").append(html);
                Common.getImgData([data[0].id], function (imgUrl) {
                    if (imgUrl && imgUrl[0] && imgUrl[0].media_details) {
                        picUrl = Common.getSimilarWidthImg(imgUrl[0].media_details.sizes, 300);
                    }
                    $(".post_advert_bot img").attr("src", picUrl)
                });
            }
        });

    },

    getCurrencyInfo:function(name){
        var url='http://data.chainage.jp/blockchain/coinapi/exchangesGeneral?name='+name;
        $.ajax({
            type: 'GET',
            url: url,
            error: function () {
            },
            success: function (res) {
                if (res) {
                    $("#ml_container").html('');
                    var html='',data=[];
                    if(name=='ALL'){
                        data=res.ALL;
                    }

                    if(name!='ALL' ){
                        for(var key in res){
                          data= data.concat(res[key]);
                        }
                    }

                    for (var i = 0; i <data.length; i++) {
                        var volume=parseFloat(Number(data[i].volume_24h).toFixed(2)).toLocaleString();
                        if(data[i].percent_change_volume_24h!='null'){
                            var percent=Number(data[i].percent_change_volume_24h).toFixed(2)+'%';
                        }else{
                            var percent='0%';
                        }
                        html='<div class="exchange_item clearfix">'
                            +'<a href="market.html?id='+data[i].eid+'&n='+data[i].name+'&p='+data[i].volume_24h+'&per='+data[i].percent_change_volume_24h+'">'
                            +'<div class="exchange_left fl">'
                            +'<div>'
                            +'<img src="static/img/exchange/128/' + data[i].eid + '.png">'
                            +'<span class="exchange_name">'+data[i].name+'</span>'
                            +'</div>'
                            +'<div class="exchange_del">24h交易量：'+volume+'JPY</div>'
                            +'<div class="exchange_del">24h交易量涨跌：'+percent+'</div>'
                            +'</div>'
                            +'<div class="exchange_right fr">'
                            +'<div class="exchange_time">支持<span>'+data[i].num_market_pairs+'</span>个市场交易</div>'
                            +'<div class="exchange_join">进入交易平台</div>'
                            +'</div>'
                            +'</a>'
                            +'</div>';
                        $("#ml_container").append(html);
                    }
                }
            }
        });

    }
}
digitalCurrency.init();