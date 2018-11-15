var newsContent={
    init:function () {
        Common.getCategoreType();
        Common.getUsers();
        this.postsShow();
        // 热门文章
        this.getHotPostsData();
        // this.getPostsListData();
    },
    // 文章内容
    postsShow:function(){
        Common.getSingleData(Common.getQueryString("id"),function(data){
            $(".post_header .post_category").text(Common.categories[data.categories[0]]);
            $(".post_header .post_title").text(data.title.rendered);
            $(".post_featured img").attr("src",data.jetpack_featured_media_url);
            $(".post_desc").html(data.excerpt.rendered);
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
                    htm += '<a href="'+ './newsContent.html?id=' + data[i].id+'"><div class="col-md-4 benefit_box">'
                        + '<div class="benefit_box_con">'
                        + '<p class="p20 benefit_box_tit">'+Common.categories[data[i].categories[0]]+'</p>'
                        + '<p class="p20 benefit_box_com">'+data[i].title.rendered+'</p>'
                        + '<p class="p20 benefit_box_from">'
                        +'<span class="new_list_icon"></span>'
                        +'<span>'+Common.users[data[i].author]+'</span>'
                        +'<div class="time_right"><span class="new_list_time"></span>'
                        +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                        + '</p>'
                        + '<img style="width: 100%; height: 1.52rem;" src="'+data[i].jetpack_featured_media_url+'">'
                        + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt.rendered+'</div>'
                        + '</div>'
                        + '</div></a>';
                }
                $('.news_contain').html(htm);
            }
        });
    }

}
newsContent.init();