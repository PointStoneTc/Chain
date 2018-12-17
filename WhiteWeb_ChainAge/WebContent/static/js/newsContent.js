(function ($) {
    var newsContent = {
        id: null,
        catid: null,
        init: function () {
            this.id = Common.getQueryString("id");
            Common.getCategoreType();
            Common.getUsers();
            this.postsShow();
            // 文章图片
            if(Common.getQueryString("cat")!='movie'){
                Common.getImgData([this.id], function (imgUrl) {
                    var picUrl = "static/img/default_700.jpg";
                    if (imgUrl && imgUrl[0] && imgUrl[0].source_url) {
                        picUrl = imgUrl[0].source_url;
                    }
                    $(".post_featured img").attr("src", picUrl);

                });
            }

            newsContent.getAdvertData();
            // 热门文章
            this.getHotPostsData();
            $('.comment_list').attr('num', 0);
            // 评论
            this.getCommentData(1);

            this.getTagsData();
            this.eventInit()
        },
        eventInit: function () {
            $(".comment_btn").on("click", function () {
                var content = $(".reply_con input").val();
                if (content == '') {
                    Common.showToast("请输入评论内容");
                    return;
                }
                if (Common.getCookie("email") && Common.getCookie("nickname")) {
                    newsContent.CommentFunc(Common.getCookie("email"), Common.getCookie("nickname"));
                } else {
                    $("#indexPopup").show();
                }

            });
            $(".pop_cancle_btn").on("click", function () {
                $("#indexPopup").hide();
                $(".email").val('');
                $(".nickname").val('');
            });
            $(".pop_confirm_btn").on("click", function () {
                Common.setCookie('email', $('.email').val());
                Common.setCookie('nickname', $('.nickname').val());
                newsContent.CommentFunc(Common.getCookie("email"), Common.getCookie("nickname"));
            });
            $(".cancle_btn").on("click", function () {
                $(".reply_con input").val('');
            })
            $("body").on("click",".reply_btn",function(){
                $(this).next().show();
            })
            $("body").on("click",".replar_cancle",function(){
                $(this).parent().hide();
                $(this).prev().val('');
            })
            $("body").on("click",".reply_confirm",function(){
                var comurl = 'http://chainage.cc/wp-json/wp/v2/comments';
                var data = {
                    author_email: Common.getCookie("email"),
                    author_name: Common.getCookie("nickname"),
                    content: $(".reply_con input").val(),
                    date: new Date().Format('yyyy-MM-dd hh:mm:ss').split(" ").join("T"),
                    parent: 0,
                    post: newsContent.id
                }
                $.ajax({
                    type: 'POST',
                    url: comurl,
                    data: data,
                    error: function () {
                        Common.showToast("评论失败");
                    },
                    success: function (data) {
                        if (data) {
                            var authorImg = "static/img/default_autor.png";
                            var html = '<li>'
                                + '<div class="comment_item_header clearfix">'
                                + '<div><img src="' + authorImg + '" class="comment_headpic"></div>'
                                + '<div class="anthor_name">'+Common.getCookie("nickname")+'</div>'
                                + '<div style="color: #8C96AB;margin:0 0.08rem 0 0.23rem;">回复</div>'
                                + '<div>'+$(this).parent().parent().parent().children(".comment_item_header ").children(".author_name").html()+'</div>'
                                + '<div style="float: right;color:#8C96AB">' + Common.timeonverseFunc(new Date().getTime(), "flag") + '</div>'
                                + '</div>'
                                + '<div class="comment_con">' +  $(this).prev().prev().val()
                                + '</div>'
                                + '<div class="comment_edit">'
                                + '<span class="reply_icon"></span><span class="reply_btn">回复</span>'
                                + '<div class="reply_input">'
                                + '<input type="text" /><span class="t-btn replar_cancle">取消</span><span class="t-btn reply_confirm">确定</span></div>'
                                + '</div>'
                                + '</li>';
                            $(this).parent().parent().parent().after(html);
                            Common.showToast("评论成功");

                            $(this).parent().hide();
                            $(this).prev().prev().val('');
                        } else {
                            Common.showToast("评论失败");
                        }
                    }
                });

            })
        },
        // 文章内容
        postsShow: function () {
            Common.getSingleData(newsContent.id, function (data) {
                if (Common.getQueryString("cat")) {
                    $(".post_header .post_category").text(Common.getQueryString("cat"));
                } else {
                    $(".post_header .post_category").text(Common.categories[data.categories[0]]);
                    newsContent.catid=data.categories[0];
                }
                Common.getUsers(function () {
                    $(".post_icon1 img").attr("src", Common.userImgs[data.author]);
                    $(".post_autor").text(Common.users[data.author]);
                });
                $(".post_header .post_title").text(data.title.rendered);
                $(".post_desc").html(data.content.rendered);
                $(".post_meta_time").text(Common.timeonverseFunc(new Date(data.date).getTime(), 1));
                $(".post_read_time").text(parseInt(data.content.rendered.length / 400));
                $(".post_count").text(data._links["version-history"][0].count);

                $(".post_desc img").each(function (i, value) {
                    if ($(value).attr("width") < $(".post_desc").width()) {
                        $(value).width($(value).attr("width"));
                        $(value).parent().css("text-align", "center");
                    }
                })
                $(".post_desc li").each(function (i, value) {
                    $(value).css("list-style-type", "disc");
                })
                $(".post_desc p").each(function (i, value) {
                    $(value).css("marginBottom", "20px");
                })
                // 评论下方新闻
                newsContent.getPostsListData();
            })
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
        // 评论
        getCommentData: function (param) {
            // 要改
            var url = 'http://chainage.cc/wp-json/wp/v2/comments?post=' + this.id + '&page='+param;
            // var url = 'http://chainage.cc/wp-json/wp/v2/comments?post=4898&page=1';
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data) {
                        newsContent.loadCommentData(data);
                    }
                }
            });
        },
        // 加载更多评论
        loadCommentData: function (data) {
            var more = '<div class="more_btn">加载更多</div>';
            var html = '';

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var authorImg = "static/img/default_autor.png";
                    if (Common.userImgs[data[i].author]) {
                        authorImg = Common.userImgs[data[i].author];
                    }

                    html += '<li>'
                        + '<div class="comment_item_header clearfix">'
                        + '<div><img src="' + authorImg + '" class="comment_headpic"></div>'
                        + '<div class="author_name">' + data[i].author_name + '</div>'
                        + '<div style="float: right;color:#8C96AB">' + Common.timeonverseFunc(new Date(data[i].date), "flag") + '</div>'
                        + '</div>'
                        + '<div class="comment_con">' + data[i].content.rendered + '</div>'
                        + '<div class="comment_edit">'
                        + '<span class="reply_icon"></span><span class="reply_btn">回复</span>'
                        + '<div class="reply_input">'
                        + '<input type="text" /><span class="t-btn replar_cancle">取消</span><span class="t-btn reply_confirm">确定</span></div>'
                        + '</div>'
                        + '</li>';
                }
                $(".comment_list").append(html);
                var num = $('.comment_list').attr('num');
                //判断是否需要显示加载更多的按钮
                if (data.length>=10) {
                    $('.comment_list').after(more);
                    $(".more_btn").unbind('click').on('click', function () {
                        $('.more_btn').remove();  //移除加载更多按钮
                        $('.comment_list').attr('num', num + 1);
                       newsContent.getCommentData( $('.comment_list').data('num', num + 1));
                    });
                } else {
                    $('.more_btn').remove(); // 移除加载更多按钮
                }
            }
        },
        CommentFunc: function (email, nickname) {
            var url = 'http://data.chainage.jp/blockchain/data/addWpCommentUser?mail=' + email + '&nickname=' + nickname;
            $.ajax({
                type: 'POST',
                url: url,
                error: function () {
                    Common.showToast("评论失败");
                },
                success: function (data) {
                    var comurl = 'http://chainage.cc/wp-json/wp/v2/comments';
                    var data = {
                        author_email: Common.getCookie("email"),
                        author_name: Common.getCookie("nickname"),
                        content: $(".reply_con input").val(),
                        date: new Date().Format('yyyy-MM-dd hh:mm:ss').split(" ").join("T"),
                        parent: 0,
                        post: newsContent.id
                    }
                    $.ajax({
                        type: 'POST',
                        url: comurl,
                        data: data,
                        error: function () {
                            Common.showToast("评论失败");
                        },
                        success: function (data) {
                            if (data) {
                                var authorImg = "static/img/default_autor.png";
                                var html= '<li>'
                                    + '<div class="comment_item_header clearfix">'
                                    + '<div><img src="' + authorImg + '" class="comment_headpic"></div>'
                                    + '<div class="author_name">'+Common.getCookie("nickname")+'</div>'
                                    + '<div style="float: right;color:#8C96AB">' + Common.timeonverseFunc(new Date().getTime(), "flag") + '</div>'
                                    + '</div>'
                                    + '<div class="comment_con">' + $(".reply_con input").val()
                                    + '</div>'
                                    + '<div class="comment_edit">'
                                    + '<span class="reply_icon"></span><span class="reply_btn">回复</span>'
                                    + '<div class="reply_input">'
                                    + '<input type="text" /><span class="t-btn replar_cancle">取消</span><span class="t-btn reply_confirm">确定</span></div>'
                                    + '</div>'
                                    + '</li>';
                                $(".comment_list").append(html);
                                $(".reply_con input").val('');
                                Common.showToast("评论成功");
                                $("#indexPopup").hide();
                            } else {

                                Common.showToast("评论失败");
                            }
                        }
                    });

                }
            });

        },
        getPostsListData: function () {
            var id = newsContent.catid;
            if (Common.getQueryString("cat")) {
                id = Common.lookUpCat(Common.categoriesArr, Common.getQueryString("cat")).id;
            }
            var url = 'http://data.chainage.jp/blockchain/data/ctRecommend?cats=' + id + '&postId=' + this.id;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data) {
                        var htm = '';
                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                var imgUrl = 'static/img/default_300x150.jpg';
                                if (data[i].featuredMedia) {
                                    imgUrl = Common.contentSimilarImg(data[i].featuredMedia.media_details, 2);
                                }
                                htm += ' <div class="col-md-4 benefit_box"><a href="newsContent.html?id=' + data[i].id + '&cat=' + id + '"><div class="benefit_box_con">'
                                    + '<div style="width: 100%; height: 70px;background:url(' + imgUrl + ') center no-repeat;background-size: cover"></div>'
                                    + '<p class="p10 benefit_box_com news_tit">' + data[i].title + '</p>'
                                    + '</div></a></div>';
                            }
                            $('.news_contain').html(htm);
                        }
                    }
                }
            });
        },
        // 获取标签
        getTagsData: function () {
            var url = 'http://chainage.cc/wp-json/wp/v2/tags?post=' + newsContent.id;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            html += '<span>' + data[i].name + '</span>';
                        }
                        $(".tags_name").html(html);
                    }
                }
            });
        },
        getAdvertData: function (imgData) {
            var param1 = {
                categories: 192,
                per_page: 1,
                order: 'desc',
                orderby: 'date',
                status: 'publish'
            };

            Common.getNewsData(param1, function (data) {
                if (data) {
                    var picUrl = "static/img/default_700.jpg";
                    if (data[0].jetpack_featured_media_url) {
                        picUrl = data[0].jetpack_featured_media_url;
                    }
                    var html = '<a href="newsContent.html?id=' + data[0].id + '&cat=' + Common.categories[192] + '" ><img src="' + data[0].jetpack_featured_media_url + '" width="100%" height="100%" style="border-radius: 5px"></a>';
                    $(".post_advert").append(html);
                    console.log($(".post_content .advert_share ").children());
                    $(".post_content .advert_share").children().eq(0).attr("data-url","http://data.chainage.jp/wh/newsContent.html?id=" + data[0].id + "&cat=" + Common.categories[192] + "");

                }
            });

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

        }

    }
    newsContent.init();
})(jQuery);

