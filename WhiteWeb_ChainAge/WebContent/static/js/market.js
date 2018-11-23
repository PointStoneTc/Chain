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
        Common.getNewsData({per_page:10,order:'desc',orderby:'date',categories:99},function(data){
            var newsFuc= template($("#news").html(),{data:data});
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