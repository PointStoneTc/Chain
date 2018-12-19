var listNewsPage = {
    pageSize: 12,
    month: '',
    eventData: [],
    init: function () {
        Common.getCategoreType();
        Common.getUsers();
        this.eventInit();
        // 头部新闻
        Common.getHomeData(function (data) {
            listNewsPage.topNewsShow(data);
            listNewsPage.imgNewsShow(data.postMap["181"]);
        });
        this.getRankingData(99);
        this.getVenuesData();
        this.getEventData();
        laydate.render({
            elem: '.search_date', //指定元素
            lang: 'en',
            format: 'yyyy-MM'
        });
    },
    topNewsShow: function (json) {
        var data = json.postMap["180"];
        // 要改标记
        var imgUrl = 'static/img/default_700.jpg';
        for (var i = 0; i < data.length; i++) {
            if (data[i].metadata) {
                data[i].imgUrl = 'http://chainage.cc' + Common.objLookUp(data[i].metadata).adv_img;
            } else {
                data[i].imgUrl = imgUrl;
            }
        }
        $(".news_banner .banner_left .news_banner_img").css({
            "background": "url(" + data[0].imgUrl + ") center no-repeat",
            "background-size": "cover"
        });
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id + '&cat=' + Common.categories[180]);
        $(".news_banner .banner_left .new_title").text(data[0].title);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top .news_banner_img").css({
            "background": "url(" + data[1].imgUrl + ") center no-repeat",
            "background-size": "cover"
        });
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id + '&cat=' + Common.categories[180]);
        $(".news_banner .banner_r_top .new_title").text(data[1].title);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot .news_banner_img").css({
            "background": "url(" + data[2].imgUrl + ") center no-repeat",
            "background-size": "cover"
        });
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id + '&cat=' + Common.categories[180]);
        $(".news_banner .banner_r_bot .new_title").text(data[2].title);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        // $(".news_banner .banner_left .new_catelage").text(Common.categories[180]);
        // $(".news_banner .banner_r_top .new_catelage").text(Common.categories[180]);
        // $(".news_banner .banner_r_bot .new_catelage").text(Common.categories[180]);
        data[0].cat = Common.categories[180];
        // 手机端
        template.registerFunction('imgUrl', function (valueText) {
            var str = '';
            if (valueText.thumbnailMediaDetail) {
                str = valueText.thumbnailMediaDetail.source_url;
            } else {
                str = imgUrl;
            }
            return str;
        });
        var newsFuc = template($("#news_slider").html(), {data: data});
        $(".carousel-inner").html(newsFuc);
    },
    // 图片新闻
    imgNewsShow: function (data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var linkUrl = './newsContent.html?id=' + data[i].id + '&cat=' + Common.categories[181];
            var imgUrl = 'static/img/default_300x150.jpg';
            if (data[i].thumbnailMediaDetail) {
                imgUrl = data[i].thumbnailMediaDetail.source_url;
            }

            html += '<div class="col-sm-4 bd-card-mod">'
                + '<a href=" ' + linkUrl + ' ">'
                + '<div class="card-img lazy" style="background-image:url(' + imgUrl + ') " ><div class="bg"></div></div>'
                + '<div class="news_title">' + data[i].title + '</div>'
                + '</a>'
                + '</div>';
        }
        $(".news_show .news_show_contain").html(html);
    },
    // 获取排行
    getRankingData: function getData(categories) {
        var url = 'http://data.chainage.jp/caweb/cc/currencyApiController.do?assetTrend';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    var coinData = JSON.parse(data);
                    // var data= JSON.parse(data).splice(0,6);
                    var data = [];
                    data.push(Common.coinLookUp(coinData, 'BTC'))
                    data.push(Common.coinLookUp(coinData, 'ETH'))
                    data.push(Common.coinLookUp(coinData, 'LTC'))
                    data.push(Common.coinLookUp(coinData, 'XRP'))
                    data.push(Common.coinLookUp(coinData, 'BCH'))
                    data.push(Common.coinLookUp(coinData, 'ETC'))
                    // 注册关注 template方法
                    template.registerFunction('price', function (valueText) {
                        return valueText.specificRate.price.toFixed(2);
                    });
                    template.registerFunction('percent', function (valueText) {
                        var str = "up_color";
                        if (parseInt(valueText.specificRate.percentChange24h) >= 0) {
                            str = "up_color";
                        } else {
                            str = "down_color";
                        }
                        return str;
                    });
                    template.registerFunction('percentValue', function (valueText) {
                        return valueText.specificRate.percentChange24h.toFixed(2) + '%';
                    });
                    var newsFuc = template($("#message_show").html(), {data: data});
                    $(".message_show ul").html(newsFuc);
                }
            }
        });
    },
    eventInit: function () {
        // 查找事件
        $(".search_event_btn").on("click", function () {
            $(".operate_con").show();
            var searchDate = $(".search_date").val();
            var searchCon = $(".search_event input").val();
            var searchAdd = $(".m-wrap  option:selected").text();
            var param = '?start_date=' + searchDate + '&search=' + searchCon + '&venue=' + searchAdd;
            if (searchCon == '') {
                param = '?start_date=' + searchDate + '&venue=' + searchAdd;
                if (searchAdd == '请选择') {
                    param = '?start_date=' + searchDate;
                    if (searchDate == '') {
                        param = '';
                    }
                } else {
                    param = '?start_date=' + searchDate + '&venue=' + searchAdd;
                    if (searchDate == '') {
                        param = '?&venue=' + searchAdd;
                    }
                }

            } else {
                if (searchDate == '') {
                    param = '?&search=' + searchCon + '&venue=' + searchAdd;
                    if (searchAdd == '请选择') {
                        param = '?&search=' + searchCon;
                    }
                } else {
                    param = '?start_date=' + searchDate + '&search=' + searchCon + '&venue=' + searchAdd;
                    if (searchAdd == '请选择') {
                        param = '?start_date=' + searchDate + '&search=' + searchCon;
                    }
                }

            }
            listNewsPage.getEventData(param);
        });
        // 按照日历查看
        $(".date_view").on("click", function () {
            $(".news_container").html('<div id="calendar"></div>');
            $(".operate_con").hide();
            listNewsPage.dateView();
        });
        // 上一月
        $(".before_btn").on("click", function () {
            listNewsPage.getEventData('?start_date=' + listNewsPage.getPreMonth(listNewsPage.month));
        });
        // 下一月
        $(".award_btn").on("click", function () {
            listNewsPage.getEventData('?start_date=' + listNewsPage.getNextMonth(listNewsPage.month));
        });
    },
    getVenuesData: function (param) {
        var url = 'http://chainage.cc/wp-json/tribe/events/v1/venues';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    var html = '';
                    var data = data.venues;
                    for (var i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].id + '">' + data[i].id + '</option>';
                    }
                    $(".m-wrap").append(html);
                }

            }
        });
    },

    getEventData: function (param) {
        var url = 'http://chainage.cc/wp-json/tribe/events/v1/events';
        if (param) {
            url = 'http://chainage.cc/wp-json/tribe/events/v1/events' + param;
        }

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
                    $(".news_container").html('');
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
                            + '<div class="event_title">' + data[i].title + '</div>'
                            + '<div style="margin-top: 2px">'
                            + '<span class="event_address"></span>'
                            + '<span>' + data[i].venue.province + '</span>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '<div></a></div>';
                        $(".news_container").append(html);

                        // listNewsPage.eventData.push({
                        //     title: data[i].title,
                        //     start: data[i].start_date,
                        //     // end:data[i].end_date,
                        //     id: data[i].id
                        // });

                    }
                    if (data.length > 0) {
                        listNewsPage.month = data[0].date.substr(0, 10);
                    } else {
                        //获取当前时间
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        if (month < 10) {
                            month = "0" + month;
                        }
                        if (day < 10) {
                            day = "0" + day;
                        }
                        listNewsPage.month = year + "-" + month + "-" + day;
                    }
                }

            }
        });
    },
    getPreMonth: function (date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份

        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }

        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-01';
        return t2;
    },
    getNextMonth: function (date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }

        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-01';
        return t2;
    },
    dateView: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        $('#calendar').fullCalendar({
            defaultDate: nowDate,
            editable: true,
            aspectRatio: 0.8,
            eventLimit: true, // allow "more" link when too many events
            // events: listNewsPage.eventData,
            events: function(start,end,timezone,callback){
                console.log($('#calendar').fullCalendar('getDate'));
                function add0(m){return m<10?'0'+m:m }
                //时间戳转化成时间格式
                function timeFormat(timestamp){
                    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
                    var time = new Date(timestamp);
                    var year = time.getFullYear();
                    var month = time.getMonth()+1;
                    var date = time.getDate();

                    return year+'-'+add0(month)+'-'+add0(date);
                }
                $.ajax({//通过ajax动态查询要展示的课次数据信息
                        url: 'http://chainage.cc/wp-json/tribe/events/v1/events',
                        data : {
                             "start_date": timeFormat($('#calendar').fullCalendar('getDate')),
                        },
                        dataType: 'json',
                        type : 'get',
                        success: function(data) { // 获取当前月的数据
                            var events = [];
                            if(data){//result.body.wesClassCourseList其实就是从后台返回前台的一个课次list，
                                data=data.events;
                                for(var i=0;i<data.length;i++){
                                    events.push({
                                        title: data[i].title,
                                        start: data[i].date,
                                        // end:data[i].end_date,
                                        id: data[i].id
                                    });
                                }
                            }
                            callback(events);
                        }
                    });
                },
            //编辑事件
            eventClick: function (event) {
                if (window.location.origin == 'http://localhost:63342') {
                    window.location.href = 'http://localhost:63342/Chain/WhiteWeb_ChainAge/WebContent/eventContent.html?id=' + event.id;
                } else if(window.location.origin=='http://chainage.cc'){
                    window.location.href = window.location.origin+'/eventContent.html?id=' + event.id;
                }else{
                    window.location.href = window.location.origin+'/wh/eventContent.html?id=' + event.id;
                }
            }
        });


    }

}
listNewsPage.init();