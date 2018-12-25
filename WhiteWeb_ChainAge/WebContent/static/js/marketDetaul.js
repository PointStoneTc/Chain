var market = {
    id: null,
    param: null,
    init: function () {
        this.param = JSON.parse(localStorage.getItem("param"));
        this.id = this.param.id;
        $(".mt_h_container").html(this.param.name);
        $(".symbol").html(this.param.symbol);
        $(".price").html(this.param.price);
        $(".price-cange").html(parseFloat(Number(this.param.volume)).toLocaleString());
        $(".percent").html(Number(this.param.per).toFixed(2)+'%')
        $(".market_name").html(this.param.symbol);
        $(".name_del").html(this.param.name);
        $(".circulatingSupply").html(parseFloat(Number(this.param.circulatingSupply)).toLocaleString());
        $(".totalSupply").html(parseFloat(Number(this.param.totalSupply)).toLocaleString());
        $(".quoteMarketCap").html(parseFloat(Number(this.param.quoteMarketCap)).toLocaleString());

        this.getCurrencyInfo(this.id);
        // 热门文章
        this.getHotPostsData();
        this.setPagination();
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
    // 分页显示
    setPagination: function (param) {
        $(".page").pagination(100, {
            'items_per_page': 15,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + 100 + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                // console.log($page);
                // param = $.extend(param, {page: pageIndex+1});
                // listNewsPage.getNewsListData(param);
            }, this)
        });
    },
    // 获取指定货币支持的交易所信息
    getCurrencyInfo: function () {
        var url = 'http://data.chainage.jp/blockchain/coinapi/assetInfoExchange?id=' + this.id;
        $.ajax({
            type: 'GET',
            url: url,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    data = data.list;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<a href="market.html?id=' + data[i].eid + '&n=' + data[i].name + '"><span>' + data[i].name + '</span></a>'
                    }
                    $(".sel_exchange").html(html);
                }
            }
        });

    }
}
market.init();