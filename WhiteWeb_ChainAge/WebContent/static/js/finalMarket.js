var market = {
    base: null,
    quot: null,
    number:0,
    init: function () {
        this.base = Common.getQueryString("base");
        this.quot = Common.getQueryString("quot");
        $(".mt_h_container span").html(Common.getQueryString("n"));
        $(".exchange .sel-list").attr('num',0);
        this.getExchangeData(1);
        // 热门文章
        this.getHotPostsData();
        this.getAdvertData();
    },
    // 获取支持的交易所信息
    getExchangeData: function (page) {
        var url = 'http://data.chainage.jp/blockchain/coinapi/marketInfoExchange?base=' + this.base + '&quote=' + this.quot + '&start='+page;
        var self = this;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    $(".expore_name").html(data.market_pairs);
                    market.loadCommentData(data);

                }
            }
        });
    },
    // 加载更多
    loadCommentData: function (data) {
        var more = '<div class="more_btn">' +
            '<img src="static/img/more_icon.png" >' +
            '</div>';
        var html = '';
        if (data.exchangeList.length > 0) {

            for (var i = 0; i < data.exchangeList.length; i++) {
                market.number++;
                html += '<a href="market.html?id=' + data.exchangeList[i].exchange.eid + '&n=' + data.exchangeList[i].exchange.name + '&p=' + data.exchangeList[i].quoteVolume24hQuote + '&per="><span>' + data.exchangeList[i].exchange.name + '</span></a>'
            }

            $(".exchange .sel-list").append(html);

            var num = $(".exchange .sel-list").attr('num');
            //判断是否需要显示加载更多的按钮
            // if (market.number < data.num_market_pairs) {
                $(".exchange .sel-list").after(more);
                $(".more_btn").unbind('click').on('click', function () {
                    $('.more_btn').remove();  //移除加载更多按钮
                    $(".exchange .sel-list").attr('num', Number(num) + 1);
                    market.getExchangeData(data.start);
                });
            // } else {
            //     $('.more_btn').remove(); // 移除加载更多按钮
            // }
        }
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

    }

}
market.init();