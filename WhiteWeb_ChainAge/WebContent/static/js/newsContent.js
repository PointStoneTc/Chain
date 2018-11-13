function loadProperties(type) {
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: '../i18n/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: type, // 对应的语言
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
            //   $('.aa').html($.i18n.prop('string_text'));

        }
    });
}

$(document).ready(function () {
    var LANGUAGE_CODE = jQuery.i18n.normaliseLanguageCode({}); //获取浏览器的语言
    loadProperties(LANGUAGE_CODE);
});

var newsContent={
    init:function () {

        // 新闻
        var newsFuc= template($("#news").html(),{model:[{id:1},{id:2},{id:3}]});
        $(".news_con_right .new-list").append(newsFuc);

        // var marketFuc= template($("#market").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        // $(".news_con_right .market-list").append(marketFuc);
        //
        // var latestNewsFuc= template($("#latestNews").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        // $(".news_con_right .latest-news-list").append(latestNewsFuc);
        //
        // var exchangeFuc= template($("#exchange").html(),{model:[{id:1},{id:2},{id:3},{id:2},{id:3}]});
        // $(".news_con_right .exchange-list").append(exchangeFuc);

    },

}
newsContent.init();