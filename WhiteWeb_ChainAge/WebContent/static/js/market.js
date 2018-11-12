// 新闻
var newsFuc= _.template($("#news").html());
$(".summary-con .new-list").append(newsFuc({model:[{id:1},{id:2},{id:3}]}));

var marketFuc= _.template($("#market").html());
$(".summary-con .market-list").append(marketFuc({model:[{id:1},{id:2},{id:3},{id:2},{id:3}]}));

var latestNewsFuc= _.template($("#latestNews").html());
$(".summary-con .latest-news-list").append(latestNewsFuc({model:[{id:1},{id:2},{id:3},{id:2},{id:3}]}));

var exchangeFuc= _.template($("#exchange").html());
$(".summary-con .exchange-list").append(exchangeFuc({model:[{id:1},{id:2},{id:3},{id:2},{id:3}]}));

// var mlFuc= _.template($("#mlContainer").html());
// $("#ml_container").append(mlFuc({mlData:[{id:1},{id:2},{id:3},{id:1},{id:2},{id:3}]}));

$(".page").pagination(100, {
    'items_per_page': 10,
    'current_page': 0,
    'num_display_entries': 6,
    'num_edge_entries': 3,
    'link_to': 'javascript:;',
    'total': '共' + 100 + '条',
    'prev_text': "",
    'next_text': "»",
    'call_callback_at_once': false,
    'callback': $.proxy(function (pageIndex, $page) {
        param = $.extend(param, {start: pageIndex * 10, limit: '10'});
        if (param.level == '1') {
            getList('/ngvlcs/front/sh/menu!execute?uid=a0001', param);
        } else {
            getListTwo('/ngvlcs/front/sh/menu!execute?uid=a0001', param);
        }
    }, this)
})
