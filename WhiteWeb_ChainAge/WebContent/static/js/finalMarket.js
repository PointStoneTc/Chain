var market={
    id:null,
    init:function () {
        this.id=Common.getQueryString("id");
        Common.getCategoreType();
        Common.getUsers();
        // 热门文章
        this.getHotPostsData();
        this.setPagination();
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
            if(valueText.featuredMedia){
                imgUrl = valueText.featuredMedia.media_details[1].source_url;
            }
            return imgUrl;
        });

        Common.getHotPostsData(function(data){
            var newsFuc= template($("#news").html(),{data:data.list});
            $(".news_con_right .new-list").append(newsFuc);
        })
    },
    // 分页显示
    setPagination:function(param){
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

}
market.init();