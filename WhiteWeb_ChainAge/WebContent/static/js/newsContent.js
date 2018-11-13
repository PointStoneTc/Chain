var newsContent={
    init:function () {

        // 新闻
        var newsFuc= template($("#news").html(),{model:[{id:1},{id:2},{id:3}]});
        $(".news_con_right .new-list").append(newsFuc);

        var marketFuc= template($("#market").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        $(".news_con_right .market-list").append(marketFuc);

        var latestNewsFuc= template($("#latestNews").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        $(".news_con_right .latest-news-list").append(latestNewsFuc);

        var exchangeFuc= template($("#exchange").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        $(".news_con_right .exchange-list").append(exchangeFuc);

    },

}
newsContent.init();