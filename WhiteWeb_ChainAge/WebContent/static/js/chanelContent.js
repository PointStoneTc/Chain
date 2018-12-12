(function ($) {
    var newsContent={
        id:null,
        init:function () {
            this.id=Common.getQueryString("id");
            Common.getCategoreType();

            this.postsShow();
            this.getTagsData();
            newsContent.getAdvertData();

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
                var picUrl="static/img/default_700.jpg";
                if( data.jetpack_featured_media_url){
                    picUrl=data.jetpack_featured_media_url;
                }
                $(".post_featured img").attr("src",picUrl);

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

            })
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
                    if(data[0].jetpack_featured_media_url){
                        picUrl=data[0].jetpack_featured_media_url;
                    }
                  var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[192]+'" ><img src="'+picUrl+'"  width="100%" height="100%" style="border-radius: 5px"></a>';
                  $(".post_advert").append(html);
                    // Common.getImgData([5495], function (imgUrl) {
                    //     if (imgUrl && imgUrl[0] && imgUrl[0].media_details) {
                    //         picUrl = Common.getSimilarImg(imgUrl[0].media_details.sizes, 2.8);
                    //     }
                    //     $(".post_advert img").attr("src", picUrl)
                    // });
                }
            });

        }

    }
    newsContent.init();
})(jQuery);

