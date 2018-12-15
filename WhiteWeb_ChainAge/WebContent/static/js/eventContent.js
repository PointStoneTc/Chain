(function ($) {
    var newsContent = {
        id: null,
        init: function () {
            this.id = Common.getQueryString("id");
            Common.getCategoreType();

            this.postsShow();
            this.getTagsData();

            newsContent.getAdvertData();
            // 热门文章
            this.getHotPostsData();
            // 评论下方新闻
            this.getPostsListData();


        },
        // 文章内容
        postsShow: function () {
            var url = 'http://chainage.cc/wp-json/tribe/events/v1/events/' + this.id;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data) {
                        Common.getUsers(function () {
                            var authorImg = "static/img/default_autor.png";
                            if (Common.userImgs[data.author]) {
                                authorImg = Common.userImgs[data.author];
                            }
                            $(".event_ahour img").attr("src", authorImg);
                        });
                        $(".event_top_date").html(Common.dateFormat(data.date));
                        $(".event_title").text(data.title);
                        $(".event_top_content").html(data.excerpt);
                        $(".address_name").html(data.venue.province + '、' + data.venue.province);
                        var imgUrl = "static/img/default_700.jpg";
                        if (data.image) {
                            imgUrl = data.image.url;
                        }
                        $(".post_desc").html(data.description);
                        $(".post_featured img").attr("src", imgUrl);
                        $(".event_start_time").html(Common.dateFormat(data.start_date));
                        $(".event_end_time").html(Common.dateFormat(data.end_date));
                        $(".event_cat").html();
                        $(".event_url").html(data.url);
                        $(".event_address_name").html(data.venue.city);
                        $(".event_detail_address").html(data.venue.address);

                        var startTime = data.start_date.split(":").join("").split("-").join("").split(" ").join("T");
                        var endTime = data.end_date.split(":").join("").split("-").join("").split(" ").join("T");
                        var url = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + data.title + '&dates=' + startTime + '/' + endTime + '&details=&ctz=';
                        $(".link_btn").parent().attr("href", url);
                        var exportUrl = 'https://wpshindig.com/event/seattle-beercode/' + data.start_date.substr(0, 10) + '/?ical=1&tribe_display=';
                        $(".export_btn").parent().attr("href", exportUrl);
                        newsContent.gooleMapInit(data.venue.city + data.venue.address);
                    }
                }
            });

        },
        gooleMapInit: function (address) {
            var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc&address=" + address + "&sensor=true";
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data) {
                        var latlng = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
                        var map = null;

                        function initialize() {
                            var mapProp = {
                                center: latlng,
                                zoom: 15,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
                            map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

                        }

                        google.maps.event.addDomListener(window, 'load', initialize);
                        var marker = new google.maps.Marker({
                            position: latlng      //将前面设定的坐标标出来

                        });
                        marker.setMap(map);

                    }
                }

            });


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
        getPostsListData: function () {
            var url = 'http://chainage.cc/wp-json/tribe/events/v1/events';
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data) {
                        var html = '';
                        var data = data.events;
                        for (var i = 0; i < data.length; i++) {
                            var authorImg = "static/img/default_autor.png";
                            var imgUrl = "static/img/defalut_300.jpg";
                            if (Common.userImgs[data[i].author]) {
                                authorImg = Common.userImgs[data[i].author];
                            }
                            if (data[i].image) {
                                imgUrl = Common.getSimilarImg(data[i].image.sizes, 2.1);
                            }
                            html = '<div class="event_item col-xs-12 col-sm-4">'
                                + '<a href="eventContent.html?id=' + data[i].id + '">'
                                + '<div class="event_item_con">'
                                + '<div class="event_img" style="background-image: url(' + imgUrl + ')"></div>'
                                + '<div class="event_date">'
                                + '<div style="font-size: 0.12rem;line-height: 11px">' + data[i].date.substring(0, 4) + '</div>'
                                + '<div style="font-size: 0.17rem">' + data[i].date.substring(5, 7) + '月</div>'
                                + '<div style="font-size: 0.13rem;line-height: 11px">' + data[i].date.substring(8, 10) + '日</div>'
                                + '</div>'
                                + '<div class="event-des clearfix">'
                                + '<div class="col-xs-3">'
                                + '<img src="' + authorImg + '" >'
                                + '</div>'
                                + '<div class="col-xs-9" >'
                                + '<div class="event_item_title">' + data[i].title + '</div>'
                                + '<div style="margin-top: 2px">'
                                + '<span class="event_address"></span>'
                                + '<span>' + data[i].venue.province + '</span>'
                                + '</div>'
                                + '</div>'
                                + '</div>'
                                + '<div></a></div>';
                            $('.news_contain').append(html);
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
                            html += '<span class="event_tag">' + data[i].name + '</span>';
                        }
                        $(".event_top_tag").append(html);
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

