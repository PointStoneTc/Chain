var listNewsPage = {
    pageFlag: 1,
    pageSize: 12,
    advertData: [],
    total:0,
    init: function () {
        this.eventInit();
        $('.news_mobile_container').attr('num', 0)
        //新闻、交易所....

        $(".search_title").text(Common.getQueryString('n'));
        // 请求
        this.getNewsListData(1, function (param) {
            listNewsPage.setPagination(param);
        });

    },

    eventInit: function () {
        // tag跳转
        $(".tags_name").on("click", "span", function () {

            if (window.location.origin == 'http://localhost:63342') {
                window.location.href = 'http://localhost:63342/Chain/WhiteWeb_ChainAge/WebContent/tagPage.html?tag=' + $(this).attr("id") + '&n=' + $(this).text();
            } else if (window.location.origin == 'http://chainage.cc') {
                window.location.href = window.location.origin + '/tagPage.html?tag=' + $(this).attr("id") + '&n=' + $(this).text();
            } else {
                window.location.href = window.location.origin + '/wh/tagPage.html?tag=' + $(this).attr("id") + '&n=' + $(this).text();
            }
        })
    },
    getNewsListData: function (page,callback) {
        var url = 'http://data.chainage.jp/blockchain/data/post/query?key='+Common.getQueryString('n')+'&page='+page+'&num=10';
        $.ajax({
            type: 'GET',
            url: url,
            error: function () {
            },
            success: function (res) {
                if (res) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://chainage.cc/wp-json/wp/v2/posts?include='+JSON.parse(res).ids,
                        error: function () {
                        },
                        success: function (data) {
                            if ($(".news_mobile_container").is(':hidden')) {//pc端
                                var htm = '';
                                $('.news_list_con .news_container').html('');
                               var tagIds=[];
                                for (var i = 0; i < data.length; i++) {
                                    tagIds.push(data[i].id);
                                    var linkUrl = 'newsContent.html?id=' + data[i].id ;
                                       htm = '<div class="search_item" ><a href="' + linkUrl + '">'
                                           + '<div class="publishDate">' + data[i].date.substr(0, 4) + '年' + data[i].date.substr(5, 2) + '月' + data[i].date.substr(8, 2) + '日</div>'
                                           + '<div class="search_item_tit">' + data[i].title.rendered + '</div>'
                                           + '<div class="search_item_des">' + data[i].excerpt.rendered + '</div>'
                                           + '<div class="tags_name" id="'+data[i].id+'"></div>'
                                           + '</a></div>';
                                       $('.news_list_con .news_container').append(htm);
                                       var key = Common.getQueryString('n');
                                       $(".search_item_tit").html($(".search_item_tit").html().replace(new RegExp(key, 'g'), "<span style='color:red'>" + key + "</span>"));

                                }
                                for(var i=0;i<tagIds.length;i++){
                                    listNewsPage.getTagsData(tagIds[i], function (json) {
                                        var html = '';
                                        for (var j = 0; j < json.length; j++) {
                                            html += '<span id="' + json[j].id + '">' + json[j].name + '</span>';
                                        }
                                        console.log($(".tags_name").eq(i));
                                        $(".tags_name").eq(i).html(html);
                                    })

                                }
                                if (callback) {
                                    callback(JSON.parse(res).total);
                                }
                            }else {
                                listNewsPage.loadNewsDataData(data,JSON.parse(res).total);
                            }

                        }

                    })

                }
            }
        });

    },

    // 加载更多
    loadNewsDataData: function (data, total) {
        var more = '<div class="more_btn">加载更多</div>';
        var htm = '';

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                listNewsPage.total++;
                var linkUrl = 'newsContent.html?id=' + data[i].id ;
                listNewsPage.getTagsData(data[i].id, function (json) {
                    var html = '';
                    for (var j = 0; j < json.length; j++) {
                        html += '<span id="' + json[j].id + '">' + json[j].name + '</span>';
                    }

                    htm = '<div class="search_item" ><a href="' + linkUrl + '">'
                        + '<div class="publishDate">' + data[i].date.substr(0, 4) + '年' + data[i].date.substr(5, 2) + '月' + data[i].date.substr(8, 2) + '日</div>'
                        + '<div class="search_item_tit">' + data[i].title.rendered + '</div>'
                        + '<div class="search_item_des">' + data[i].excerpt.rendered + '</div>'
                        + '<div class="tags_name" id="'+data[i].id+'">'+html+'</div>'
                        + '</a></div>';
                    $(' .news_mobile_container').append(htm);
                    var key = Common.getQueryString('n');
                    $(".search_item_tit").html($(".search_item_tit").html().replace(new RegExp(key, 'g'), "<span style='color:red'>" + key + "</span>"));

                })
            }

            var num = parseInt($('.news_mobile_container').attr('num'));
            //判断是否需要显示加载更多的按钮
            if (listNewsPage.total<total) {
                $('.news_mobile_container ').after(more);
                $(".more_btn").unbind('click').on('click', function () {
                    $('.more_btn').remove();  //移除加载更多按钮
                    $('.news_mobile_container').attr('num', num + 1);

                    listNewsPage.getNewsListData($('.news_mobile_container').attr('num'));
                });
            } else {
                $('.more_btn').remove(); // 移除加载更多按钮
            }
        }
    },
    // 分页显示
    setPagination: function (total) {
        $(".page").pagination(total, {
            'items_per_page': 12,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + total + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                listNewsPage.getNewsListData(pageIndex + 1);
            }, this)
        });
    },
    // 获取标签
    getTagsData: function (id,callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/tags?post=' + id;
        $.ajax({
            type: 'GET',
            url: url,
            // async: false,
            error: function () {
            },
            success: function (data) {
                if (data) {
                   callback(data);
                }
            }
        });
    }
}
listNewsPage.init();