(function ($) {
    var newsContent={
        id:null,
        catid:null,
        cat:null,
        init:function () {
            this.id=Common.getQueryString("id");
            Common.getCategoreType();

            this.postsShow();
            this.getTagsData();
            newsContent.getAdvertData();
            this.getPostsListData();
            $(".post_header").on("click",".post_category",function(){
                var pageFlag=4;

                if (window.location.origin == 'http://localhost:63342') {
                    window.location.href = 'http://localhost:63342/Chain/WhiteWeb_ChainAge/WebContent/listNews.html?pageFlag='+pageFlag +'&cat='+ Common.getQueryString("cat");
                } else if(window.location.origin=='http://chainage.cc'){
                    window.location.href = window.location.origin+'/listNews.html?pageFlag='+pageFlag +'&cat='+ Common.getQueryString("cat");
                }else{
                    window.location.href = window.location.origin+'/wh/listNews.html?pageFlag='+pageFlag +'&cat='+ Common.getQueryString("cat");
                }
            })
            // tag跳转
            $(".tags_name").on("click","span",function(){

                if (window.location.origin == 'http://localhost:63342') {
                    window.location.href = 'http://localhost:63342/Chain/WhiteWeb_ChainAge/WebContent/tagPage.html?tag='+$(this).attr("id")+'&n='+$(this).text();
                } else if(window.location.origin=='http://chainage.cc'){
                    window.location.href = window.location.origin+'/tagPage.html?tag='+$(this).attr("id")+'&n='+$(this).text();
                }else{
                    window.location.href = window.location.origin+'/wh/tagPage.html?tag='+$(this).attr("id")+'&n='+$(this).text();
                }
            })
        },
        // 文章内容
        postsShow:function(){
            Common.getSingleData(newsContent.id,function(data){
                var catName='';
                var categoriesData=data.categories;
                for(var j=0;j<categoriesData.length;j++){
                    if(j!=categoriesData.length-1){
                        catName+=Common.categories[categoriesData[j]]+'、';
                    }else{
                        catName+=Common.categories[categoriesData[j]]
                    }
                }

                $(".post_header .post_category").text(catName);

                if (Common.getQueryString("cat")) {
                    newsContent.cat = Common.lookUpCat(Common.categoriesArr, Common.getQueryString("cat")).id;
                }else{
                    newsContent.cat=data.categories[0];
                    newsContent.catid=data.categories[0];
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
                $(".post_read_time").text(parseInt($(".post_desc").text().length / 350));
                $(".post_count").text(data._links["version-history"][0].count);

                $(".post_desc img").each(function(i,value){
                    if($(value).attr("width")<$(".post_desc").width()){
                        $(value).width($(value).attr("width"));
                        $(value).parent().css("text-align","center");
                    }
                })

            })
        },
        getPostsListData: function () {
            var id=newsContent.catid;
            if (Common.getQueryString("cat")) {
                id=Common.lookUpCat(Common.categoriesArr, Common.getQueryString("cat")).id;
            }
            var url = 'http://data.chainage.jp/blockchain/data/ctRecommend?cats='+id+'&postId=' + this.id;
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
                                htm += ' <div class="col-md-4 benefit_box"><a href="chanelContent.html?id=' + data[i].id + '&cat=' + Common.categories[id]+ '"><div class="benefit_box_con">'
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
                            html+='<span id="'+data[i].id+'">'+data[i].name+'</span>';
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

