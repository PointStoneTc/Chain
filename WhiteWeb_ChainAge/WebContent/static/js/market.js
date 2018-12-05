var market={
    id:null,
    init:function () {
        this.id=Common.getQueryString("id");
        this.getMarketInfo();
        // 热门文章
        this.getHotPostsData();
    },
    // 热门文章
    getHotPostsData:function () {
        // 注册关注 template方法
        template.registerFunction('date', function (valueText) {
            return Common.timeonverseFunc(new Date(valueText).getTime());
        });
        template.registerFunction('year', function (valueText) {
            return valueText.substr(0,4);
        });
        template.registerFunction('title', function (valueText) {
            return JSON.parse(valueText).rendered;
        });
        template.registerFunction('imgUrl', function (valueText) {
            var imgUrl="static/img/aa.png";
            if(valueText.featuredmedia){
                imgUrl = valueText.featuredmedia.media_details[1].source_url;
            }
            return imgUrl;
        });

        Common.getHotPostsData(function(data){
            var newsFuc= template($("#news").html(),{data:data.list});
            $(".news_con_right .new-list").append(newsFuc);
        })
    },

    getMarketInfo:function(){
        var url='http://data.chainage.jp/caweb/cc/currencyApiController.do?exchangeMarketInfo';
        $.ajax({
            type: 'GET',
            url: url,
            data:{id:market.id},
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length>0) {
                    for (var i = 0; i <data.length; i++) {

                    }
                }
            }
        });
    },
    getExchangeInfo:function(){
        var url='http://data.chainage.jp/caweb/cc/currencyApiController.do?topFloatingExchange';
        $.ajax({
            type: 'GET',
            url: url,
            data:{id:market.id},
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data && data.length>0) {
                    for (var i = 0; i <data.length; i++) {

                    }
                }
            }
        });
    }
}
market.init();