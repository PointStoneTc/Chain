var newsContent={
    id:null,
    init:function () {
        this.id=Common.getQueryString("id");
        Common.getCategoreType();
        Common.getUsers();
        this.postsShow();
        // 热门文章
        this.getHotPostsData();
        this.getPostsListData();
        this.getTagsData();
    },
    // 文章内容
    postsShow:function(){
        Common.getSingleData(newsContent.id,function(data){
            $(".post_header .post_category").text(Common.categories[data.categories[0]]);
            $(".post_header .post_title").text(data.title.rendered);
            $(".post_featured img").attr("src",data.jetpack_featured_media_url);
            $(".post_desc").html(data.content.rendered);
            $(".post_icon1 img").attr("src",Common.userImgs[data.author])
            $(".post_autor").text(Common.users[data.author]);
            $(".post_meta_time").text(Common.timeonverseFunc(new Date(data.date).getTime(),1));
            $(".post_count").text(data._links["version-history"][0].count);
        })

    },
    // 热门文章
    getHotPostsData:function () {
        // 注册关注 template方法
        template.registerFunction('date', function (valueText) {
            return Common.timeonverseFunc(new Date(valueText).getTime());
        });
        Common.getNewsData({per_page:10,order:'desc',orderby:'date',categories:99},function(data){
            var newsFuc= template($("#news").html(),{data:data});
            $(".news_con_right .new-list").append(newsFuc);
        })
    },
    getPostsListData:function(){
        // 列表新闻
        Common.getNewsData({per_page:9,order:'desc',orderby:'date',categories:99},function(data){
            var htm = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htm+=' <div class="col-md-4 benefit_box"><a href="newsContent.html?id=' + data[i].id+'"><div class="benefit_box_con">'
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
       var url='https://www.chainage.jp/wp-json/wp/v2/tags?post='+newsContent.id;
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
    }

}
newsContent.init();