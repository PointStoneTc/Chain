var digitalCurrency={
    param:'',
    init:function () {

        this.getCurrencyInfo('A-C');
        // 热门文章
        this.getAdvertData();
        this.getHotPostsData();
        $(".filter_con").on("click",".button",function(){
            $(this).addClass('active').siblings().removeClass('active');
            var name=$(this).html();
            if(name=='All'){
                name='ALL';
            }
            if(name=='Other'){
                name='OTHER';
            }
            digitalCurrency.getCurrencyInfo(name);
        })
        $("#ml_container").on("click",".list_item",function(){
            var i=$(this).index();
            var data=digitalCurrency.param;
            var arr={
                id:data[i].cid,
                price:data[i].quotePrice,
                volume:data[i].quoteVolume24h,
                per:data[i].quotePercentChange24h,
                name:data[i].name,
                symbol:data[i].symbol,
                circulatingSupply:data[i].circulatingSupply,
                totalSupply:data[i].totalSupply,
                quoteMarketCap:data[i].quoteMarketCap
            }
            localStorage.setItem("param",JSON.stringify(arr));
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
        var url='http://data.chainage.jp/blockchain/coinapi/assetsGeneral?name='+name;
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
                    if(name=='OTHER'){
                        data=res.OTHER;
                    }
                    if(name!='ALL' && name!='OTHER'){
                        for(var key in res){
                          data= data.concat(res[key]);
                        }
                    }
                    digitalCurrency.param=data;
                    for (var i = 0; i <data.length; i++) {
                        var volume=parseFloat(Number(data[i].quoteVolume24h).toFixed(2)).toLocaleString();

                        html='<div class="list_item col-xs-4 col-sm-3 ">'
                            +'<a id="ml_template" class="ml" href="marketDetail.html">'
                            +'<div class="pri-name">'+data[i].name+'</div>'
                            +'<div class="pri-code-list">'+data[i].symbol+'</div>'
                            // +'<div class="volume-desc">24h交易量</div>'
                            // +'<div class="volume c-bitcoin">'+volume+'</div>'
                            +'</a>'
                            +'<div>';
                        $("#ml_container").append(html);
                    }
                }
            }
        });

    }
}
digitalCurrency.init();