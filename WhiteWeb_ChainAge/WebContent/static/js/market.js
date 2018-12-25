var market={
    id:null,
    init:function () {
        this.id=Common.getQueryString("id");

        $(".cspa .price").html(parseFloat(Number(Common.getQueryString("p")).toFixed(2)).toLocaleString());
        $(".market_name").html(Common.getQueryString("n"));
        $(".voloum_total").html(parseFloat(Number(Common.getQueryString("p")).toFixed(2)).toLocaleString());
        $(".percent").html(Number(Common.getQueryString("per")).toFixed(2)+'%');
        $(".market_desc img").attr("src","static/img/exchange/128/"+ this.id + ".png")
        if(Common.getQueryString("p")=='null'){
            $(".cspa .price").html(0);
            $(".voloum_total").html(0);

        }
        if(Common.getQueryString("per")=='null'){
            $(".percent").html('0%');
        }
        this.getMarketInfo();
        // 热门文章
        this.getHotPostsData();
        this.getAdvertData();
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

    getMarketInfo:function(){
        var url='http://data.chainage.jp/blockchain/coinapi/exchangeMarketInfo';
        $.ajax({
            type: 'GET',
            url: url,
            data:{id:market.id},
            // data:{id:22},
            async: true,
            error: function () {
            },
            success: function (res) {
                if (res && res.markInfoList.length>0) {
                    $(".number").html(res.markInfoList.length);
                    var arr=res.markInfoList;
                    var map = {},html1='',
                        dest = [];
                    for(var i = 0; i < arr.length; i++){
                        var ai = arr[i];
                        if(!map[ai.marketPairQuoteSymbol]){
                            dest.push({
                                marketPairQuoteSymbol: ai.marketPairQuoteSymbol,
                                echangeName:ai.echangeName,
                                data: [ai]
                            });
                            map[ai.marketPairQuoteSymbol] = ai;
                        }else{
                            for(var j = 0; j < dest.length; j++){
                                var dj = dest[j];
                                if(dj.marketPairQuoteSymbol == ai.marketPairQuoteSymbol){
                                    dj.data.push(ai);
                                    break;
                                }
                            }
                        }
                        html1+='<span>'+arr[i].marketPairBaseSymbol+'</span>';
                    }
                    $(".sel-list1").html(html1);

                    template.registerFunction('change', function (valueText) {
                        return parseFloat(valueText.toFixed(2)).toLocaleString();
                    });
                    template.registerFunction('changePercent', function (valueText) {
                        return (valueText*100).toFixed(2)
                    });

                    var html2='';
                    for(var i=0;i<dest.length;i++){
                        html2+='<span>'+dest[i].marketPairQuoteSymbol+'</span>'
                    }
                    $(".sel-list2").html(html2);
                    var newsFuc = template($("#marketList").html(), {data: dest});
                    $(".mr-container").html(newsFuc);

                }
            }
        });
    }
}
market.init();