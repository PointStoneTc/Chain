(function ($) {
    var newsContent={
        id:null,
        init:function () {
            this.id=Common.getQueryString("id");
            Common.getCategoreType();

            this.postsShow();
            // 文章图片
            Common.getImgData([this.id],function(imgUrl){
                var picUrl="static/img/default_700.jpg";
                if( imgUrl && imgUrl[0] && imgUrl[0].source_url){
                    picUrl=imgUrl[0].source_url;
                }
                $(".post_featured img").attr("src",picUrl);

            });
            newsContent.getAdvertData();
            // 热门文章
            this.getHotPostsData();
            // 评论下方新闻
            // this.getPostsListData();
            this.getTagsData();

        },
        // 文章内容
        postsShow:function(){
            Common.getSingleData(newsContent.id,function(data){
                if(Common.getQueryString("cat")){
                    $(".post_header .post_category").text(Common.getQueryString("cat"));
                }else{
                    $(".post_header .post_category").text(Common.categories[data.categories[0]]);
                }
                Common.getUsers(function () {
                    $(".post_icon1 img").attr("src",Common.userImgs[data.author]);
                    $(".post_autor").text(Common.users[data.author]);
                });
                $(".post_header .post_title").text(data.title.rendered);
                $(".post_desc").html(data.content.rendered);

                $(".post_meta_time").text(Common.timeonverseFunc(new Date(data.date).getTime(),1));
                $(".post_read_time").text(parseInt(data.content.rendered.length/400));
                $(".post_count").text(data._links["version-history"][0].count);

                $(".post_desc img").each(function(i,value){
                    if($(value).attr("width")<$(".post_desc").width()){
                        $(value).width($(value).attr("width"));
                        $(value).parent().css("text-align","center");
                    }
                })
                $(".post_desc li").each(function(i,value){
                   $(value).css("list-style-type","disc");
                })
                $(".post_desc p").each(function(i,value){
                    $(value).css("marginBottom","20px");
                })
            })
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
                var imgUrl= 'static/img/defalut_300.jpg';
                if(valueText.thumbnailMediaDetail){
                    imgUrl=valueText.thumbnailMediaDetail.source_url;
                }
                return imgUrl;
            });

            Common.getHotPostsData(function(data){
                var newsFuc= template($("#news").html(),{data:data.list});
                $(".news_con_right .new-list").append(newsFuc);
            })
        },
        getPostsListData:function(){
            // 列表新闻
            Common.getNewsData({per_page:9,order:'desc',orderby:'date',categories:99},function(data){
                var htm = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        htm+=' <div class="col-md-4 benefit_box"><a href="newsContent.html?id=' + data[i].id+'&cat='+Common.categories[99]+'"><div class="benefit_box_con">'
                            +'<img style="width: 100%; height: 0.94rem;" src="'+data[i].jetpack_featured_media_url+'">'
                            +'<p class="p10 benefit_box_com news_tit">'+data[i].title.rendered+'</p>'
                            +'<div class="p10 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                            +'</div></a></div>';
                    }
                    $('.news_contain').html(htm);
                }
            });
        },
        // 获取标签
        getTagsData:function(){
            var url='http://chainage.cc/wp-json/wp/v2/tags?post='+newsContent.id;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                error: function () {
                },
                success: function (data) {
                    if (data && data.length>0) {
                        var html='';
                        for(var i=0;i<data.length;i++){
                            html+='<span>'+data[i].name+'</span>';
                        }
                        $(".tags_name").html(html);
                    }
                }
            });
        },
        getAdvertData:function(imgData){
            var param1 = {
                categories: 192,
                per_page: 1,
                order: 'desc',
                orderby: 'date',
                status: 'publish'
            };

            Common.getNewsData(param1,function(data){
                if(data){
                    var picUrl="static/img/default_700.jpg";
                    if (data[0].jetpack_featured_media_url) {
                        picUrl =data[0].jetpack_featured_media_url;
                    }
                  var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[192]+'" ><img src="'+data[0].jetpack_featured_media_url+'" width="100%" height="100%" style="border-radius: 5px"></a>';
                  $(".post_advert").append(html);
                    // Common.getImgData([data[0].id], function (imgUrl) {
                    //     if (imgUrl && imgUrl[0] && imgUrl[0].media_details) {
                    //         picUrl = Common.getSimilarImg(imgUrl[0].media_details.sizes, 2.8);
                    //     }
                    //     $(".post_advert img").attr("src", picUrl)
                    // });
                }
            });

            var param2 = {
                categories: 193,
                per_page: 1,
                order: 'desc',
                orderby: 'date',
                status: 'publish'
            };

            Common.getNewsData(param2,function(data){
                if(data){
                    var picUrl="static/img/defalut_300.jpg";
                    var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[193]+'" ><img  width="100%" height="100%" ></a>';
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

            Common.getNewsData(param3,function(data){
                if(data){
                    var picUrl="static/img/defalut_300.jpg";
                    var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[194]+'" ><img width="100%" height="100%" ></a>';
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

