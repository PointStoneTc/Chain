var digitalCurrency={
    init:function () {

        this.getCurrencyInfo();
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
    getCurrencyInfo:function(){
        var url='http://data.chainage.jp/caweb/cc/currencyApiController.do?exchangeMarketInfo';
        $.ajax({
            type: 'GET',
            url: url,
            data:{id:1},
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
        var data=[{id:1},{id:2},{id:3},{id:1},{id:2},{id:3}];
        var mlFuc= template($("#mlContainer").html(),{data:data});
        $("#ml_container").append(mlFuc);
    }
}
digitalCurrency.init();