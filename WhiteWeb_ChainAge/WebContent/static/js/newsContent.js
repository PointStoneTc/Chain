(function ($) {
    var newsContent={
        id:null,
        init:function () {
            this.id=Common.getQueryString("id");
            Common.getCategoreType();
            Common.getUsers();
            this.postsShow();
            // 文章图片
            Common.getImgData([this.id,5495,6176,6178],function(data){
                $(".post_featured img").attr("src",data[0].source_url);
                // 广告
                newsContent.getAdvertData(data);
            });
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

                $(".post_header .post_title").text(data.title.rendered);
                $(".post_desc").html(data.content.rendered);
                $(".post_icon1 img").attr("src",Common.userImgs[data.author]);
                $(".post_autor").text(Common.users[data.author]);
                $(".post_meta_time").text(Common.timeonverseFunc(new Date(data.date).getTime(),1));
                $(".post_read_time").text(parseInt(data.content.rendered.length/400));
                $(".post_count").text(data._links["version-history"][0].count);
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
                var imgUrl="static/img/aa.png";
                if(valueText.featuredmedia){
                    imgUrl = valueText.featuredmedia.media_details[1].source_url;
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
                  var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[192]+'" ><img src="'+imgData[1].source_url+'" width="100%" height="100%" style="border-radius: 5px"></a>';
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
            Common.getNewsData(param2,function(data){
                if(data){
                    var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[193]+'" ><img src="'+imgData[2].media_details.sizes["hoverex-thumb-extra"].source_url+'" width="100%" height="100%" ></a>';
                    $(".post_advert_top").append(html);
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
                    var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[194]+'" ><img src="'+imgData[3].media_details.sizes["hoverex-thumb-extra"].source_url+'" width="100%" height="100%" ></a>';
                    $(".post_advert_bot").append(html);
                }
            });

        }

    }
    newsContent.init();
})(jQuery);

