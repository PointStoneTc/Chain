var listNewsPage = {
    pageFlag: 1,
    pageSize: 12,
    advertData: [],
    init: function () {
        this.eventInit();
        $('.news_mobile_container').data('num', 0)
        //新闻、交易所....

        $(".search_title").text("ニュース");
        // 请求
        this.getNewsListData({per_page: 12, order: 'desc', orderby: 'date', categories: 188}, function (param) {
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
    getNewsListData: function (param, callback) {
        // 列表新闻
        Common.getNewsData(param, function (data) {

                var htm = '';
                $('.news_list_con .news_container').html('');
                var categories = param.categories
                for (var i = 0; i < data.length; i++) {
                    var linkUrl = 'newsContent.html?id=' + data[i].id + '&cat=' + Common.categories[param.categories];

                    if (categories == 147) {
                        linkUrl = 'chanelContent.html?id=' + data[i].id + '&cat=' + Common.categories[param.categories];
                    }
                    listNewsPage.getTagsData(data[i].id,function(json){
                        var html = '';
                        for (var i = 0; i < json.length; i++) {
                            html += '<span id="' + json[i].id + '">' + json[i].name + '</span>';
                        }

                        htm = '<div class="search_item"><a href="' + linkUrl + '">'
                            +'<div class="publishDate">'+data[i].date.substr(0,4)+'年'+data[i].date.substr(5,2)+'月'+data[i].date.substr(8,2)+'日</div>'
                            +'<div class="search_item_tit">'+345667+'</div>'
                            +'<div class="search_item_des">'+data[i].excerpt+'</div>'
                            +'<div class="tags_name">'+html+'</div>'
                            + '</a></div>';
                        $('.news_list_con .news_container').append(htm);
                        var key=Common.getQueryString('n');
                        $(".search_item_tit").html($(".search_item_tit").html().replace(new RegExp(key,'g'),"<span style='color:red'>"+key+"</span>"));
                    })

                }
                if (callback) {
                    callback(param);
                }



        });

    },

    // 加载新闻数据
    loadNewsDataData: function (data, param) {
        var more = '<div class="more_btn">加载更多</div>';
        var htm = '';
        var categories = param.categories;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var linkUrl = 'newsContent.html?id=' + data[i].id + '&cat=' + Common.categories[param.categories];
                var chanelImg = '<div class="benefit_box_img"></div> ';
                if (data[i].jetpack_featured_media_url) {
                    chanelImg = '<div class="benefit_box_img" style="background-image:url(' + data[i].jetpack_featured_media_url + ')"></div>';

                } else {
                    var defaultImg = 'static/img/default_300x150.jpg';
                    chanelImg = '<div class="benefit_box_img" style="background-image:url(' + defaultImg + ')"></div>';
                }
                if (categories == 147) {
                    linkUrl = 'chanelContent.html?id=' + data[i].id + '&cat=' + Common.categories[param.categories];
                }
                var catName = '';
                var categoriesData = data[i].categories;
                for (var j = 0; j < categoriesData.length; j++) {
                    if (j != categoriesData.length - 1) {
                        catName += Common.categories[categoriesData[j]] + '、';
                    } else {
                        catName += Common.categories[categoriesData[j]]
                    }
                }
                htm = '<div class="mobile_list_item" style=" border-bottom: 1px dashed #CECECE;margin-bottom: 25px;">'
                    + '<a href="' + linkUrl + '" class="new_mobile_con">'
                    + '<div class="media">'
                    + '<div class="media-left media-middle">'
                    + chanelImg
                    + '</div>'
                    + '<div class="media-body">'
                    + '<div class="hot_posts_title">' + data[i].title.rendered + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="new_dec">'
                    + '<img src="' + Common.userImgs[data[i].author] + '" alt="">'
                    + '<div class="edit_detail">'
                    + '<div>' + Common.users[data[i].author] + '</div>'
                    + '<div>' + catName + '</div>'
                    + '</div>'
                    + '<div style="float: right;margin-top: 0.35rem;">'
                    + '<span class="new_list_time"></span>'
                    + '<span class="new_des_time">' + Common.timeonverseFunc(new Date(data[i].date)) + '</span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</a>'
                    + '<div>';
                $('.news_list_con .news_mobile_container').append(htm);
            }


            var num = $('.news_mobile_container').data('num');
            //判断是否需要显示加载更多的按钮
            if (Common.newCounts[param.categories] - ((listNewsPage.pageSize) * num + listNewsPage.pageSize) > 0) {
                $('.news_mobile_container ').after(more);
                $(".more_btn").unbind('click').on('click', function () {
                    $('.more_btn').remove();  //移除加载更多按钮
                    $('.news_mobile_container').data('num', num + 1);
                    localStorage.removeItem(param.categories);
                    listNewsPage.getNewsListData({
                        per_page: 12,
                        order: 'desc',
                        orderby: 'date',
                        categories: param.categories,
                        "start": (listNewsPage.pageSize) * num + listNewsPage.pageSize,
                        "isLoadMore": true
                    });
                });
            } else {
                $('.more_btn').remove(); // 移除加载更多按钮
            }
        }
    },
    // 分页显示
    setPagination: function (param) {
        $(".page").pagination(Common.newCounts[param.categories], {
            'items_per_page': 12,
            'current_page': 0,
            'num_display_entries': 6,
            'num_edge_entries': 3,
            'link_to': 'javascript:;',
            'total': '共' + Common.newCounts[param.categories] + '条',
            'prev_text': "",
            'next_text': "»",
            'call_callback_at_once': false,
            'callback': $.proxy(function (pageIndex, $page) {
                param = $.extend(param, {page: pageIndex + 1});
                localStorage.removeItem(param.categories);
                listNewsPage.getNewsListData(param);
            }, this)
        });
    },
    // 获取标签
    getTagsData: function (id,callback) {
        var url = 'http://chainage.cc/wp-json/wp/v2/tags?post=' + id;
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
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