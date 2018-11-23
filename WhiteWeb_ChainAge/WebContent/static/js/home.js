function loadProperties(type) {
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: '../i18n/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: type, // 对应的语言
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
            //   $('.aa').html($.i18n.prop('string_text'));
        }
    });
}

$(document).ready(function () {
    var LANGUAGE_CODE = jQuery.i18n.normaliseLanguageCode({}); //获取浏览器的语言
    loadProperties(LANGUAGE_CODE);
});

var homePage = {
    pageSize: 6,
    init: function () {
        Common.getHomeData(function(data){
            homePage.topNewsShow(data);
            homePage.newsListShow(data.postMap["99"],$('.news_list_con .news_container'));
            homePage.newsListShow(data.postMap["99"],$('.teji_list .news_container'));
            homePage.newsListShow(data.postMap["99"],$('.channel_list .news_container'));
        });

        // 排行
        this.getRankingData(99);
        // 图片新闻
        // Common.getNewsData({per_page:3,order:'desc',orderby:'date',categories:99},function(data){
           var html='';
        var data=[
            {
                "id": 5389,
                "date": "2018-11-10T14:26:22",
                "status": "publish",
                "title": "{\"rendered\":\"【NinjaCoin上場記念インタビュー】仮想通貨、100年後の未来は｜株式会社電縁　取締役・石原玲一に聞く\"}",
                "content": "<p>※この記事は一般社団法人・手ぶら観光協会の提供記事です。</p>\n<p>2018年11月3日、ついにNinjaCoinが仮想通貨取引所「MERCATOX」への上場を果たしました。旅行において基盤となる通貨ができることによって、観光産業に新たな歴史の１ページが加わります。</p>\n<p><strong>・MERCATOXは<a href=\"https://www.google.com/url?q=https://mercatox.com&amp;sa=D&amp;ust=1541671411125000&amp;usg=AFQjCNElTX66VLN6sX_VM3ybljXTWa-vtA\" target=\"_blank\" rel=\"noopener\">こちら</a></strong><br />\n<strong>・NinjaCoinの公式サイトは<a href=\"https://www.google.com/url?q=https://tebura.ninja/ico/?lang%3Dja&amp;sa=D&amp;ust=1541671411123000&amp;usg=AFQjCNGLWEJEHclIglR2DV66kA4ed0bWlQ\" target=\"_blank\" rel=\"noopener\">こちら</a></strong></p>\n<p>NinjaCoinプロジェクトには世界各国から経験豊かなメンバーが多数集い、DiscordのNinjaCoinコミュニティには1万人を超える参加者がいます。今回、その中からコアメンバー4人のスペシャルインタビューをお届けします。</p>\n<p>最初に登場いただくのは株式会社電縁取締役の石原玲一氏。</p>\n<p><img data-attachment-id=\"5391\" data-permalink=\"https://www.chainage.jp/interview_ninja-coin_part1.html/%e7%94%bb%e5%83%8f%ef%bc%91-2\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/11/画像１.jpg\" data-orig-size=\"270,270\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}\" data-image-title=\"画像１\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/11/画像１.jpg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/11/画像１.jpg\" class=\"aligncenter size-hoverex-thumb-med wp-image-5391\" src=\"https://www.chainage.jp/wp-content/uploads/2018/11/画像１-270x208.jpg\" alt=\"\" width=\"270\" height=\"208\" /></p>\n<p>コンサルティングファーム２社でコンサルタントとして活躍し、テクノロジー領域のビジネスにいて様々なプロジェクトを成功に導いてきました。</p>\n<p>NinjaCoinプロジェクトには、コンサルタントの経験を活かして、アドバイザーとして参画しています。そんな経験豊富な石原氏に、仮想通貨市場におけるテクノロジーの動向と、100年後の未来について語っていただきました。</p>\n<div id=\"toc_container\" class=\"toc_black no_bullets\"><p class=\"toc_title\">目次</p><ul class=\"toc_list\"><li><a href=\"#i\"><span class=\"toc_number toc_depth_1\">1</span> コンサルタントとして活躍後、システム会社の取締役へ</a></li><li><a href=\"#i-2\"><span class=\"toc_number toc_depth_1\">2</span> 高木社長の持つビジョンと実体あるサービスに共感し、アドバイザーとして参画</a></li><li><a href=\"#i-3\"><span class=\"toc_number toc_depth_1\">3</span> 仮想通貨が世に浸透し、経済活動として確立される社会へ</a></li></ul></div>\n\n<h2><span id=\"i\">コンサルタントとして活躍後、システム会社の取締役へ</span></h2>\n<p><strong>――まず、石原さんのプロフィールを教えてください。</strong></p>\n<p>私は株式会社電縁という会社で取締役をやっています。</p>\n<p>弊社は社員とパートナー合わせて２４０人ほどの体制で、業務システムがメインの会社です。ブロックチェーン関連は３年ほど前から事業を始めており、売上全体の1～2%程度ですが、受託内容は開発から実証実験まで幅広いです。</p>\n<p>私は2000年に大学院修士課程を卒業し、その後デロイト トーマツコンサルティング(現：アビームコンサルティング）とスカイライトコンサルティングの２社でシステムやビジネスコンサルタントの仕事をしていました。</p>\n<p>その後、2007年に当時電縁の親会社<sup>※</sup>だったガイアックスにお声掛けいただき、現在所属している電縁のマネジメント業務を経て今に至ります。<br />\n<span style=\"font-size: 9pt;\">※電縁はガイアックスからクラウドワークスへ売却、現在はクラウドワークスの100%子会社</span></p>\n<p><strong>――NinjaCoinプロジェクトにおける役割や立ち位置を教えてください。</strong></p>\n<p>アドバイザーとして参画し、当初はブロックチェーンにおける技術的支援をさせて頂いていました。</p>\n<p>最近は技術面に加えて、プロモーションやビジネス面でも力になりたく、ビジネススキームや契約面などについてもアドバイスさせて頂いています。</p>\n<p><strong>――具体的にどのようなアドバイスをされていますか。</strong></p>\n<p>技術面では、ブロックチェーン適用の考え方や実装方法について助言、支援させて頂きました。</p>\n<p>また、契約などの取り決めを適切に管理する仕組みの必要性についてお話したことを受け、弊社が開発した契約情報をブロックチェーンに乗せ、後で改ざんできないようみんなが同じ契約書の文面を合意できる・記録できる契約管理ブロックチェーンをカスタマイズしたスマートコントラクトをご提供して、NinjaCoinの保有に関する覚書を保存・管理しております。</p>\n<p>また技術以外では、NinjaCoinの経済圏がどのように形成されると、よりコインを使っていただけるか、また既に（コインを）使っている人をいかにして巻き込めるかといった仕組み作りについてもアドバイスさせて頂いています。</p>\n<p>―<strong>―実際にアドバイスをする上で気をつけているポイントは何ですか。</strong></p>\n<p>仮想通貨の定石とされているような考え方にとらわれることがないよう、自然科学や市場経済といったレベルの観点を持ってお話するように心がけています。</p>\n<p>というのも、仮想通貨自体がまだ成熟しておらず動きが目まぐるしく変わるので、あまり仮想通貨としてのセオリーや今時点の定石に引っ張られすぎると翌週には違う方向になっていることがよくあり、仮想通貨の考えに偏らない観点が重要になります。</p>\n<h2><span id=\"i-2\">高木社長の持つビジョンと実体あるサービスに共感し、アドバイザーとして参画</span></h2>\n<p><strong>――NinjaCoinに関わったきっかけは何ですか。</strong></p>\n<p>NinjaCoinを立ち上げる以前に、代表の高木氏とシェアリングエコノミー協会のミートアップでお会いしまして、ブロックチェーンをやっていますという会話をしました。その後関わっていく中で、NinjaCoinのプロジェクトを開始されることを受け、現在のテクニカルアドバイザーという形でお手伝いすることになりました。</p>\n<p><strong>――高木社長とはいつから関わるようになったのですか？</strong></p>\n<p>2016年の8月頃なのでもう２年以上の付き合いです。</p>\n<p><strong>――NinjaCoinのどんなところに魅力を感じましたか？</strong></p>\n<p>弊社（電縁）はブロックチェーン事業を立ち上げたのが国内で早い方だったため、仮想通貨やICOについてのご相談をいただくことが多々ありました。</p>\n<p>しかし、会話する中で「とにかくICOすればお金が集まるんですよね？」という話をされる方が多く、結局は中身はどうでもいいけど”お金が集まればいい”という考え方が蔓延していました。</p>\n<p>一方でNinjaCoinはサービスが実体として存在し、コインによってその枠組みを広げて社会に貢献するという構想がありました。</p>\n<p>私はそのビジョンに共感し、お手伝いする価値があると考え現在も関わっております。</p>\n<p><strong>――NinjaCoinと他の仮想通貨との違いは何と考えていますか。</strong></p>\n<p>サービス実体がない仮想通貨もある中で、NinjaCoinは「旅行のベースになる通貨を作る」というビジョンの中で、それを実現する実際のサービスが存在していることです。これが一番の違いだと思います。</p>\n<h2><span id=\"i-3\">仮想通貨が世に浸透し、経済活動として確立される社会へ</span></h2>\n<p><strong>――今後の仮想通貨市場に期待すること、またこうなってほしいという願望はありますか？</strong></p>\n<p>様々なコインが乱立しているのが現状です。もっと統合されたり通貨間で行き来できるようになることで経済活動に定着してほしいと願っています。そうなることで、仮想通貨はすごいパワーを持つのではないかと思っています。通貨を交換するのではなく、変換するようになるイメージです。</p>\n<p>例えば、ある人が価値を100万持っているとして、日本円で100万円であると同時に1.5BTCでもあるという状態で7万円を支払ったらBTC建ての保有額も0.1減るというように、価値の保存と移動を分離できると良いと思います。</p>\n<p>このような仮想通貨同士が結合された状態になると両替というものがなくなり、ある人の金融資産の総額を容易に把握できるようになるとともに、世界のお金に対する考え方が大きく変わると思います。</p>\n<p><strong>――ご自身が仮想通貨市場において、これからの未来に向けてどのような存在になっていたいか。</strong></p>\n<p>ブロックチェーンが社会に浸透して活用されるための技術・サービスを提供できる会社を作っていきたいです。ただ、決済、為替取引など狭い意味での仮想通貨市場においては一歩引いた立ち位置になっていると思います。仮想通貨では、ユーザーサイドになっているのではないでしょうか。</p>\n<p>でも、次に取り組むテーマでも引き続きブロックチェーンや仮想通貨を絡めたものを提供していきたいと思います。</p>\n<p><strong>――（NinjaCoinや仮想通貨の概念を外して）100年後はどのような未来であったらいいでしょうか。</strong></p>\n<p>人間の経済活動においては、地球全体・人類全体が関税とか通貨の為替とか関係なく１つの経済になっているといいなと思います。そうすればいろいろなお金の回り方が最適化されているのではないかと考えます。</p>\n<p>テクノロジーにおいては、AIとロボットが人間の代わりに働き、人間は働かなくていい世の中になっているかもしれません。</p>\n<p>人間が仕事をしていると、何か事情があってお金がないのか？と怪しまれ、正社員になるほど働かなくてはならない人が底辺と言われるような世界になっていると面白そうです。</p>\n<p><strong>――最後にNinjaCoinコインホルダーに向けてメッセージをお願いします！</strong></p>\n<p>まだ始めたばかりのサービスですのでこれから知名度が上がり、発展する通貨であり、サービスであり、エコノミーです。このスタートから関われるというのは楽しいと思うので一緒に盛り上げていきましょう！</p>\n<p><strong>・NinjaCoinの公式サイトは<a href=\"https://www.google.com/url?q=https://tebura.ninja/ico/?lang%3Dja&amp;sa=D&amp;ust=1541671411123000&amp;usg=AFQjCNGLWEJEHclIglR2DV66kA4ed0bWlQ\" target=\"_blank\" rel=\"noopener\">こちら</a></strong></p>\n",
                "excerpt": "<p>※この記事は一般社団法人・手ぶら観光協会の提供記事です。 2018年11月3日、&hellip;</p>\n",
                "comment_status": "open",
                "ping_status": "publish",
                "sticky": false,
                "jetpack_featured_media_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0.png",
                "author": {
                    "id": 17,
                    "name": "ChainAge編集部",
                    "description": "",
                    "avatar_urls": {
                        "24": "https://secure.gravatar.com/avatar/b2a9d859103130237d1b8e3b1c7c14d1?s=24&d=mm&r=g",
                        "48": "https://secure.gravatar.com/avatar/b2a9d859103130237d1b8e3b1c7c14d1?s=48&d=mm&r=g",
                        "96": "https://secure.gravatar.com/avatar/b2a9d859103130237d1b8e3b1c7c14d1?s=96&d=mm&r=g"
                    }
                },
                "categories": [
                    {
                        "id": 100,
                        "count": 5,
                        "description": "",
                        "name": "インタビュー",
                        "slug": "interview",
                        "parent": 0
                    }
                ],
                "tags": [
                    {
                        "id": 123,
                        "count": 51,
                        "description": "",
                        "name": "ブロックチェーン",
                        "slug": "%e3%83%96%e3%83%ad%e3%83%83%e3%82%af%e3%83%81%e3%82%a7%e3%83%bc%e3%83%b3"
                    },
                    {
                        "id": 129,
                        "count": 95,
                        "description": "",
                        "name": "仮想通貨",
                        "slug": "%e4%bb%ae%e6%83%b3%e9%80%9a%e8%b2%a8"
                    }
                ],
                "featuredmedia": {
                    "id": 5390,
                    "media_type": "image",
                    "mime_type": "image/png",
                    "media_details": [
                        {
                            "name": "thumbnail",
                            "file": "d34013-21-786307-0-150x150.png",
                            "width": 150,
                            "height": 150,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-150x150.png"
                        },
                        {
                            "name": "medium",
                            "file": "d34013-21-786307-0-300x156.png",
                            "width": 300,
                            "height": 156,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-300x156.png"
                        },
                        {
                            "name": "post-thumbnail",
                            "file": "d34013-21-786307-0-370x193.png",
                            "width": 370,
                            "height": 193,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x193.png"
                        },
                        {
                            "name": "hoverex-thumb-med",
                            "file": "d34013-21-786307-0-370x208.png",
                            "width": 370,
                            "height": 208,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x208.png"
                        },
                        {
                            "name": "hoverex-thumb-med-small",
                            "file": "d34013-21-786307-0-370x274.png",
                            "width": 370,
                            "height": 274,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x274.png"
                        },
                        {
                            "name": "hoverex-thumb-med-avatar",
                            "file": "d34013-21-786307-0-370x339.png",
                            "width": 370,
                            "height": 339,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x339.png"
                        },
                        {
                            "name": "hoverex-thumb-tiny",
                            "file": "d34013-21-786307-0-90x90.png",
                            "width": 90,
                            "height": 90,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-90x90.png"
                        },
                        {
                            "name": "hoverex-thumb-masonry",
                            "file": "d34013-21-786307-0-370x193.png",
                            "width": 370,
                            "height": 193,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x193.png"
                        },
                        {
                            "name": "hoverex-thumb-magazine-extra",
                            "file": "d34013-21-786307-0-270x202.png",
                            "width": 270,
                            "height": 202,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-270x202.png"
                        },
                        {
                            "name": "hoverex-thumb-magazine-modern-big",
                            "file": "d34013-21-786307-0-370x339.png",
                            "width": 370,
                            "height": 339,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x339.png"
                        },
                        {
                            "name": "hoverex-thumb-magazine-modern-small",
                            "file": "d34013-21-786307-0-370x262.png",
                            "width": 370,
                            "height": 262,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x262.png"
                        },
                        {
                            "name": "hoverex-thumb-extra",
                            "file": "d34013-21-786307-0-247x203.png",
                            "width": 247,
                            "height": 203,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-247x203.png"
                        },
                        {
                            "name": "hoverex-thumb-extra-big",
                            "file": "d34013-21-786307-0-360x266.png",
                            "width": 360,
                            "height": 266,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-360x266.png"
                        },
                        {
                            "name": "trx_addons-thumb-small",
                            "file": "d34013-21-786307-0-270x152.png",
                            "width": 270,
                            "height": 152,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-270x152.png"
                        },
                        {
                            "name": "trx_addons-thumb-portrait",
                            "file": "d34013-21-786307-0-370x339.png",
                            "width": 370,
                            "height": 339,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x339.png"
                        },
                        {
                            "name": "trx_addons-thumb-avatar",
                            "file": "d34013-21-786307-0-370x339.png",
                            "width": 370,
                            "height": 339,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0-370x339.png"
                        },
                        {
                            "name": "full",
                            "file": "d34013-21-786307-0.png",
                            "width": 650,
                            "height": 339,
                            "mime_type": "image/png",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/11/d34013-21-786307-0.png"
                        }
                    ]
                },
                "index": "a:1:{s:10:\"vc_grid_id\";a:0:{}}",
                "loaction": 100,
                "authorId": 17,
                "categoryIds": [
                    100
                ],
                "tagIds": [
                    123,
                    129
                ]
            },
            {
                "id": 5225,
                "date": "2018-10-30T18:44:21",
                "status": "publish",
                "title": "{\"rendered\":\"イスラエル発の分散型取引所「Bancor（バンコール）」、日本で地域通貨発行へ｜Galia Benartzi氏にインタビュー\"}",
                "content": "<p>2017年に160億円規模の大型ICOを行ったことでも注目されるBancor（バンコール）。Bancorネットワーク・トークン（BNT）の仮想通貨をベースに、イスラエル、アメリカ、ケニアに続き、日本での地域通貨の発行も視野に入れるなど、今後も一層目が離せません。</p>\n<p>そこで、ChainAge編集部では、Bancor共同創設者のGalia Benartzi氏が来日するのに合わせてインタビューを実施。Bancorの目指すもの、ブロックチェーンを用いた地域通貨発行、日本に与えるインパクトなどについて伺いました。</p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancorの公式サイトは<a href=\"https://www.bancor.network/tokens\">こちら</a></strong></span></p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancorの公式ツイッターは<a href=\"https://twitter.com/Bancor?lang=ja\">こちら</a></strong></span></p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancor Japanの公式ツイッターは<a href=\"https://twitter.com/BancorJapan?lang=ja\">こちら</a></strong></span></p>\n<div id=\"toc_container\" class=\"toc_black no_bullets\"><p class=\"toc_title\">目次</p><ul class=\"toc_list\"><li><a href=\"#BancorBancor_X\"><span class=\"toc_number toc_depth_1\">1</span> BancorとBancor Xについて\n</a></li><li><a href=\"#i\"><span class=\"toc_number toc_depth_1\">2</span> 地域通貨の発行で目指すもの</a></li><li><a href=\"#i-2\"><span class=\"toc_number toc_depth_1\">3</span> 日本での地域通貨発行</a></li></ul></div>\n\n<h3><span id=\"BancorBancor_X\"><span style=\"text-decoration: underline;\">BancorとBancor Xについて<br />\n</span></span></h3>\n<p><strong><span style=\"font-size: 12pt;\">――まず、Bancorについて教えてください。</span></strong></p>\n<p>Bancorは、2017年6月に、Ethereum（イーサリアム）をベースとするBancorネットワーク・トークン（BNT）のICOを行い、1億5,300万ドル（約162億円）相当の資金調達を行いました。現在は、非中央集権型の自動流動化ネットワークの構築を進め、分散型取引所として、130種のトークンを扱い、これまでに15億ドル以上の取引が行われています。</p>\n<p>&nbsp;</p>\n<p><strong><span style=\"font-size: 12pt;\">――「Bancor X」とはどのようなプロジェクトですか？</span></strong></p>\n<p>Bancor Xは、複数のブロックチェーンを対象にした、初の自動流動化ネットワークです。EthereumからEos（イオス）トークンに自動で交換することが可能になりますが、これはBancor Xが初めてです。これまで、Tron（トロン）やMio（ミオ）など新しいブロックチェーンのエコシステムが登場してきましたが、Bancor Xの最終目標は、どのようなトークンも、自動的に、透明性を担保しながら、予測可能な方法で、あらゆる別のトークンに変換できるようにすることです。いわば、トークンエコシステムの橋渡しとなることですね。</p>\n<p>ちなみに、「X」は「交差」を表しており、仮想通貨の交換ができるプラットフォームらしいネーミングだと思っています。読み方は、iPhoneのような「テン」ではなく、バンコール「エックス」ですよ（笑）。</p>\n<p><img data-attachment-id=\"5233\" data-permalink=\"https://www.chainage.jp/interview_bancor_galia-benartzi.html/bancor-2\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2.jpeg\" data-orig-size=\"2997,2248\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone 7&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1539796107&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;3.99&quot;,&quot;iso&quot;:&quot;40&quot;,&quot;shutter_speed&quot;:&quot;0.05&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}\" data-image-title=\"Bancor 2\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-300x225.jpeg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-1024x768.jpeg\" class=\"aligncenter size-full wp-image-5233\" src=\"https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2.jpeg\" alt=\"\" width=\"2997\" height=\"2248\" srcset=\"https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2.jpeg 2997w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-300x225.jpeg 300w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-768x576.jpeg 768w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-1024x768.jpeg 1024w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-370x278.jpeg 370w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-760x570.jpeg 760w, https://www.chainage.jp/wp-content/uploads/2018/10/Bancor-2-270x202.jpeg 270w\" sizes=\"(max-width: 2997px) 100vw, 2997px\" /></p>\n<h3><span id=\"i\"><span style=\"text-decoration: underline;\">地域通貨の発行で目指すもの</span></span></h3>\n<p><strong><span style=\"font-size: 12pt;\">――これまでの地域通貨の発行状況について教えてください。</span></strong></p>\n<p>これまでに、アメリカとイスラエルで地域通貨を発行しており、信じられない程の成功を収めました。ひとつの問題は、コミュニティの外では通貨に価値がなく、別の通貨と取引できなかったことです。通常、取引するにはボリュームが必要ですが、多くのコミュニティは小さいのが現実です。</p>\n<p>そこで、Bancorネットワークでは、大きな取引量や上場手数料、為替の不均衡などを伴わずに、どのような地域通貨でも取引することを可能にしました。</p>\n<p>最初のパイロットプロジェクトは今年、ケニアで始まりました。コミュニティのリーダーが、地域通貨を管理できるようにし、首都ナイロビ以外のエリアにある6つのコミュニティで、それぞれに独自の地域通貨が誕生しました。</p>\n<p>前述のように、あるコミュニティの地域通貨は、他の地域通貨とトレードが可能です。あるコミュニティで通貨を手に入れ、他のコミュニティの市場で買い物をすることができるようになりました。多くの人が参画することで、地域通貨はより多くの場所で使えるようになるのです。</p>\n<p>そして、次のパイロットプロジェクトの計画は、日本です。いくつかの組織・団体と、どのように導入ができるか協議をしています。</p>\n<p>今後10年で、世界中でコミュニティに所属する数億人が地域通貨を導入すると私は考えています。ブログ、動画プラットフォーム、音楽サービスのように、ロングテールのサービスの出現は非常に早いのです。通貨にも、驚異的な変化が訪れるでしょう。</p>\n<p>今日、私たちは、信頼性があり、安全で、透明性のある通貨を、自ら発行できるようになりました。誰も使わなければ価値はありませんが、誰もが使うようになれば価値が生まれます。少なくとも挑戦することができるのです。まさに、誰もがYouTubeに動画をアップロードするようなものです。動画が良ければ見られます。良くなければ見られませんが、それは全く問題ありません（笑）。</p>\n<p>Bancorのアイデアは、技術的な参入障壁を減らすことです。すべての人々がツールを使い、通貨を作り、通貨を使い、その上で、実際に何が望まれているかを理解することができます。</p>\n<p>インターネットとブロックチェーンのインフラにより、加速度的に変化が起こっています。今後10年で、世界中に数十万の、多種多様な通貨が生まれ、まったく「通貨」の概念は、全く新しいものにになるでしょう。</p>\n<p>&nbsp;</p>\n<p><strong><span style=\"font-size: 12pt;\">――地域通貨は、コミュニティにどのようなインパクトがありますか？</span></strong></p>\n<p>地域通貨は、地域のためのものです。人々がより良い商品の取引ができ、より良い生活をコミュニティで送ることができれば、それが地域通貨によって創造された価値です。コミュニティの全ての人が、共に暮らすために必要な、衣食住、教育、娯楽を持っているような状態です。Bancorの流動化ネットワークによって、コミュニティは、コミュニティの中で価値を創造することができるようになります。</p>\n<p>投資家は、より多くの地域通貨が生まれ、ネットワーク全体が成長することに関心を持ちますが、それぞれのコミュニティは、私たちが通常考える「利益」に必ずしも関心を持っているわけではありません。コミュニティの関心は、よい暮らし、幸せ、健康です。</p>\n<p>地域通貨の価値が高くなればなるほど、より他の地域通貨との取引ができるようになります。従って、地域通貨への投資は、時間とエネルギーと資金を、コミュニティのより良い暮らしに投資することに他なりません。</p>\n<p>流動化ネットワークへの投資は、コミュニティとそのメンバーのより良い暮らしを創造するモデルを成長させるための投資です。私たちが測るのは、コミュニティに属する、人々の状態です。人々は健康か。幸せか。平和か。クリエイティブか。これらを問わなければいけません。</p>\n<p>これは通常とは異なる種類の投資です。より多くのお金を得るためにお金を投資する代わりに、私たちは、より多くの価値を得るために投資をします。とても興味深いと思いませんか？</p>\n<p>&nbsp;</p>\n<p><span style=\"font-size: 12pt;\"><strong>――どのように地域通貨のネットワークを拡大させていくつもりですか？</strong></span></p>\n<p>地域通貨はコミュニティメンバーのものです。例えば、私がある地域に住んでいれば、自分の商品やサービスに対して地域通貨を受け入れるなどして貢献します。誰もが参加できるのです。</p>\n<p>投資家は、準備金を預け、地域通貨を創造することができます。新しい通貨を創造し、ネットワークとつながり、コミュニティメンバーに新しい流動性をもたらします。</p>\n<p>地域通貨は、人々がそれを使用する場合にのみ機能します。通貨は、使用する人がいる場合にのみ価値を持つからです。従って、全ての人に果たす役割があります。投資家は、最初の資金を預け入れ、地域通貨を開始する創造者です。地域社会で地域通貨が普及するかは、コミュニティーメンバーが地域通貨を受け入れるかどうかにかかっています。行政は、地域通貨の使い方、地域通貨で納税する方法などを人々に周知させる役割があります。</p>\n<p>私たちは、よりオープンで、近代的な金融システムを作ることができる選択肢を、コミュニティに提供したいと思っています。既存の通貨で多くの資金を持たないコミュニティでも、より良い暮らしの実現に向けて、参加できるのです。</p>\n<p>&nbsp;</p>\n<p><strong><span style=\"font-size: 12pt;\">――投資家にとっての魅力は何でしょうか？</span></strong></p>\n<p>投資家は大きなリターンを期待することができます。それは、コミュニティが健全であることで、従来の金銭的な価値とは異なる、本当に意味のあるリターンです。</p>\n<p>Bancorネットワークに参加するすべての通貨は、その通貨の小額と、小額のBancorネットワーク・トークン（BNT）を預け入れる必要があります。両方のデポジットを行うと、ゲートウェイは、その通貨を他の通貨と交換できるようにします。以降、BNTが購入される度に、BNTの価値が上昇します。世の中のあらゆる資産と同じように、購入する人が多いほど、価格が上がるのです。つまり、より多くのコミュニティがBancorネットワークに参加すると、Bancorネットワーク全体の価値が高まります。</p>\n<p>従って、投資家は、ネットワークが成長して通貨がより価値あるものになること、及び、多くのコミュニティでより良い暮らしが実現されていくという両方の点で、投資対効果を期待できます。</p>\n<p>多くのコミュニティで生活が向上し、より健康的になり、より多くの自由が得られ、より多く仕事、芸術、音楽などが手に入れられれば、私たち全てが利益を享受することになります。</p>\n<p><img data-attachment-id=\"5236\" data-permalink=\"https://www.chainage.jp/interview_bancor_galia-benartzi.html/bancor3\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/bancor3.jpeg\" data-orig-size=\"2783,2087\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone 7&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1539793629&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;3.99&quot;,&quot;iso&quot;:&quot;40&quot;,&quot;shutter_speed&quot;:&quot;0.058823529411765&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}\" data-image-title=\"bancor3\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-300x225.jpeg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-1024x768.jpeg\" class=\"aligncenter size-full wp-image-5236\" src=\"https://www.chainage.jp/wp-content/uploads/2018/10/bancor3.jpeg\" alt=\"\" width=\"2783\" height=\"2087\" srcset=\"https://www.chainage.jp/wp-content/uploads/2018/10/bancor3.jpeg 2783w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-300x225.jpeg 300w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-768x576.jpeg 768w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-1024x768.jpeg 1024w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-370x277.jpeg 370w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-760x570.jpeg 760w, https://www.chainage.jp/wp-content/uploads/2018/10/bancor3-270x202.jpeg 270w\" sizes=\"(max-width: 2783px) 100vw, 2783px\" /></p>\n<h3><span id=\"i-2\"><span style=\"text-decoration: underline;\">日本での地域通貨発行</span></span></h3>\n<p><strong><span style=\"font-size: 12pt;\">――日本を次の地域通貨を行う場所として選んだ理由は何でしょうか？</span></strong></p>\n<p>日本には非常に興味深いエコシステムがあります。</p>\n<p>第一に、日本は地域通貨に関して長い歴史を持っています。過去数百年の間に、国内に何千種類もの地域通貨が存在しました。地域コミュニティが商売・貿易の舞台でした。</p>\n<p>次に、日本はスマートフォンとインターネットに関して、非常に高いコネクティビティを誇ります。携帯電話とネットワークを利用して、誰もが地域通貨にアクセスできるインフラが整っています。</p>\n<p>最後に、日本文化は、誠実なビジネス関係と、ローカルでの商取引を重視するように感じます。アマゾンで注文して玄関先で箱を受け取るというのでなく（笑）、知り合いの人と、地域の中で取引するように、実際のつながりを重視するように見受けられます。</p>\n<p>地域通貨は、通貨を人々の手に渡すことで、コミュニティが、コミュニティに合う方法で設計できる、最適なエコシステムです。</p>\n<p>教師をコミュニティの例に取ると、ある地域の先生方は、学生やその両親とのネットワークを持っており、このモデルに適したグループと言えます。農家の方々もまた別のコミュニティと言えるでしょう。様々なコミュニティグループが存在するため、様々な地域通貨の在り方が考えられます。</p>\n<p>私自身、品質へのこだわりなど日本文化について多くを学んでいるところですが、本当にローカルなレベルでの取引を活性化する地域通貨も馴染むのではないかと考えています。</p>\n<p>&nbsp;</p>\n<p><strong><span style=\"font-size: 12pt;\">――最後に、読者や日本の人々に向けてメッセージがあればお願いします。</span></strong></p>\n<p>日本の方々は、これから起こること、すべきことを既に分かっているのではないかと思います。それは、公正、倫理的、健全な金融システムを構築することです。Bancor Xは、コミュニティの誰もが価値を創造することを可能にするインフラで、そのコミュニティにいる人々こそが、最も必要とされていることを知っていると考えています。</p>\n<p>私たちは、地域通貨の発行は、正しいこと、するべきことだと信じていますし、日本の皆さんが私たちと一緒にこのプロジェクトを実現してくれることを願っています。</p>\n<figure id=\"attachment_5230\" style=\"width: 1253px\" class=\"wp-caption aligncenter\"><img data-attachment-id=\"5230\" data-permalink=\"https://www.chainage.jp/interview_bancor_galia-benartzi.html/%e3%82%b9%e3%83%aa%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%83%e3%83%88r\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr.jpg\" data-orig-size=\"1253,877\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1539858095&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}\" data-image-title=\"スリーショットr\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-300x210.jpg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-1024x717.jpg\" class=\"wp-image-5230 size-full\" src=\"https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr.jpg\" alt=\"\" width=\"1253\" height=\"877\" srcset=\"https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr.jpg 1253w, https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-300x210.jpg 300w, https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-768x538.jpg 768w, https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-1024x717.jpg 1024w, https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-370x259.jpg 370w, https://www.chainage.jp/wp-content/uploads/2018/10/スリーショットr-760x532.jpg 760w\" sizes=\"(max-width: 1253px) 100vw, 1253px\" /><figcaption class=\"wp-caption-text\">インタビュー当日、Galiaさん（中央）と</figcaption></figure>\n<p>&nbsp;</p>\n<hr />\n<p>いかがでしたでしょうか？地域通貨発行というプロジェクトに、日本の地方自治体はどのような反応を見せるのでしょうか。今後ますます注目ですね！Galiaさんをはじめ、取材に協力していただいた皆様、大変にありがとうございました！</p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancorの公式サイトは<a href=\"https://www.bancor.network/tokens\">こちら</a></strong></span></p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancorの公式ツイッターは<a href=\"https://twitter.com/Bancor?lang=ja\">こちら</a></strong></span></p>\n<p><span style=\"font-size: 12pt;\"><strong>・Bancor Japanの公式ツイッターは<a href=\"https://twitter.com/BancorJapan?lang=ja\">こちら</a></strong></span></p>\n<p style=\"text-align: right;\"><span style=\"color: #999999;\">©2018 Worldgo,kk. All Rights Reserved.</span></p>\n<p>&nbsp;</p>\n",
                "excerpt": "<p>2017年に160億円規模の大型ICOを行ったことでも注目されるBancor（バ&hellip;</p>\n",
                "comment_status": "open",
                "ping_status": "publish",
                "sticky": false,
                "jetpack_featured_media_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r.jpg",
                "author": {
                    "id": 11,
                    "name": "ChainAge編集部",
                    "description": "",
                    "avatar_urls": {
                        "24": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=24&d=mm&r=g",
                        "48": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=48&d=mm&r=g",
                        "96": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=96&d=mm&r=g"
                    }
                },
                "categories": [
                    {
                        "id": 100,
                        "count": 5,
                        "description": "",
                        "name": "インタビュー",
                        "slug": "interview",
                        "parent": 0
                    }
                ],
                "tags": [
                    {
                        "id": 123,
                        "count": 51,
                        "description": "",
                        "name": "ブロックチェーン",
                        "slug": "%e3%83%96%e3%83%ad%e3%83%83%e3%82%af%e3%83%81%e3%82%a7%e3%83%bc%e3%83%b3"
                    },
                    {
                        "id": 129,
                        "count": 95,
                        "description": "",
                        "name": "仮想通貨",
                        "slug": "%e4%bb%ae%e6%83%b3%e9%80%9a%e8%b2%a8"
                    },
                    {
                        "id": 145,
                        "count": 15,
                        "description": "",
                        "name": "取引所",
                        "slug": "%e5%8f%96%e5%bc%95%e6%89%80"
                    },
                    {
                        "id": 139,
                        "count": 39,
                        "description": "",
                        "name": "海外",
                        "slug": "%e6%b5%b7%e5%a4%96"
                    }
                ],
                "featuredmedia": {
                    "id": 5227,
                    "media_type": "image",
                    "mime_type": "image/jpeg",
                    "media_details": [
                        {
                            "name": "thumbnail",
                            "file": "TAI_0242r-150x150.jpg",
                            "width": 150,
                            "height": 150,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-150x150.jpg"
                        },
                        {
                            "name": "medium",
                            "file": "TAI_0242r-300x203.jpg",
                            "width": 300,
                            "height": 203,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-300x203.jpg"
                        },
                        {
                            "name": "medium_large",
                            "file": "TAI_0242r-768x519.jpg",
                            "width": 768,
                            "height": 519,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-768x519.jpg"
                        },
                        {
                            "name": "large",
                            "file": "TAI_0242r-1024x692.jpg",
                            "width": 1024,
                            "height": 692,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-1024x692.jpg"
                        },
                        {
                            "name": "post-thumbnail",
                            "file": "TAI_0242r-370x250.jpg",
                            "width": 370,
                            "height": 250,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x250.jpg"
                        },
                        {
                            "name": "hoverex-thumb-huge",
                            "file": "TAI_0242r-1278x719.jpg",
                            "width": 1278,
                            "height": 719,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-1278x719.jpg"
                        },
                        {
                            "name": "hoverex-thumb-big",
                            "file": "TAI_0242r-842x532.jpg",
                            "width": 842,
                            "height": 532,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-842x532.jpg"
                        },
                        {
                            "name": "hoverex-thumb-med",
                            "file": "TAI_0242r-370x208.jpg",
                            "width": 370,
                            "height": 208,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x208.jpg"
                        },
                        {
                            "name": "hoverex-thumb-med-small",
                            "file": "TAI_0242r-370x274.jpg",
                            "width": 370,
                            "height": 274,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x274.jpg"
                        },
                        {
                            "name": "hoverex-thumb-med-avatar",
                            "file": "TAI_0242r-370x370.jpg",
                            "width": 370,
                            "height": 370,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x370.jpg"
                        },
                        {
                            "name": "hoverex-thumb-tiny",
                            "file": "TAI_0242r-90x90.jpg",
                            "width": 90,
                            "height": 90,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-90x90.jpg"
                        },
                        {
                            "name": "hoverex-thumb-masonry-big",
                            "file": "TAI_0242r-760x514.jpg",
                            "width": 760,
                            "height": 514,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-760x514.jpg"
                        },
                        {
                            "name": "hoverex-thumb-masonry",
                            "file": "TAI_0242r-370x250.jpg",
                            "width": 370,
                            "height": 250,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x250.jpg"
                        },
                        {
                            "name": "hoverex-thumb-magazine-extra",
                            "file": "TAI_0242r-270x202.jpg",
                            "width": 270,
                            "height": 202,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-270x202.jpg"
                        },
                        {
                            "name": "hoverex-thumb-magazine-modern-big",
                            "file": "TAI_0242r-370x497.jpg",
                            "width": 370,
                            "height": 497,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x497.jpg"
                        },
                        {
                            "name": "hoverex-thumb-magazine-modern-small",
                            "file": "TAI_0242r-370x262.jpg",
                            "width": 370,
                            "height": 262,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x262.jpg"
                        },
                        {
                            "name": "hoverex-thumb-extra",
                            "file": "TAI_0242r-247x203.jpg",
                            "width": 247,
                            "height": 203,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-247x203.jpg"
                        },
                        {
                            "name": "hoverex-thumb-extra-big",
                            "file": "TAI_0242r-360x266.jpg",
                            "width": 360,
                            "height": 266,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-360x266.jpg"
                        },
                        {
                            "name": "trx_addons-thumb-small",
                            "file": "TAI_0242r-270x152.jpg",
                            "width": 270,
                            "height": 152,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-270x152.jpg"
                        },
                        {
                            "name": "trx_addons-thumb-portrait",
                            "file": "TAI_0242r-370x493.jpg",
                            "width": 370,
                            "height": 493,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x493.jpg"
                        },
                        {
                            "name": "trx_addons-thumb-avatar",
                            "file": "TAI_0242r-370x370.jpg",
                            "width": 370,
                            "height": 370,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r-370x370.jpg"
                        },
                        {
                            "name": "full",
                            "file": "TAI_0242r.jpg",
                            "width": 1875,
                            "height": 1268,
                            "mime_type": "image/jpeg",
                            "source_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0242r.jpg"
                        }
                    ]
                },
                "index": "a:1:{s:10:\"vc_grid_id\";a:0:{}}",
                "loaction": 100,
                "authorId": 11,
                "categoryIds": [
                    100
                ],
                "tagIds": [
                    123,
                    129,
                    145,
                    139
                ]
            },
            {
                "id": 5103,
                "date": "2018-10-26T14:08:36",
                "status": "publish",
                "title": "{\"rendered\":\"独自トークン発行でイベント企画！東工大の学生団体「CrypGeek」川さんにインタビュー\"}",
                "content": "<p>東京工業大学の大学祭「工大祭」（10月6、7日）で、仮想通貨をつかったユニークなイベントが行われました。</p>\n<p>その名も「QRcode Hunt」。同大学を中心にブロックチェーンなどを研究しているコミュニティ「CrypGeek」が主催したこのイベントは、学内に隠されたQRコードに、自前で開発したというウォレットから手持ちの仮想通貨TECを送金すると、隠された場所の難易度に応じて送金額の２～100倍が送り返されるというもの。さらに、獲得した仮想通貨は飲み物などとの交換も可能なほか、保有ランキングに応じて豪華景品も！</p>\n<p>「ウォレットまで作りこむなんてすごい！」ということで、ChainAge編集部は、イベントの狙いやブロックチェーンにかける熱意などについて、CrypGeek共同代表の川大揮さんにインタビューしてきました。</p>\n<p><strong>・ChainAge編集部による</strong><strong>イベントレポートは<a href=\"https://chainage.jp/event-report_tokodai_qrcode-hunt.html\">こちら</a></strong></p>\n<p><strong>・CrypGeekの公式ツイッターは<a href=\"https://twitter.com/CrypGeek?lang=ja\">こちら</a></strong></p>\n<p><strong>・インタビュー動画は<a href=\"https://www.youtube.com/watch?v=qOpjmo9V6xo\">こちら</a>（YouTube）</strong></p>\n<p style=\"text-align: center;\"><div id=\"toc_container\" class=\"toc_black no_bullets\"><p class=\"toc_title\">目次</p><ul class=\"toc_list\"><li><a href=\"#i\"><span class=\"toc_number toc_depth_1\">1</span> ――今回のイベントを企画したきっかけを教えてください。</a></li><li><a href=\"#i-2\"><span class=\"toc_number toc_depth_1\">2</span> ――システムについて教えてください。</a></li><li><a href=\"#i-3\"><span class=\"toc_number toc_depth_1\">3</span> ――卒業後はどういった道へ進むつもりですか？</a></li></ul></div>\n</p>\n<hr />\n<p><img data-attachment-id=\"5104\" data-permalink=\"https://www.chainage.jp/interview_tokodai_qrcode-hunt_taiki-kawa.html/tai_0195\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195.jpg\" data-orig-size=\"1024,678\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}\" data-image-title=\"TAI_0195\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-300x199.jpg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-1024x678.jpg\" class=\"size-large wp-image-5104 aligncenter\" src=\"http://d2c4hjbo3xmykl.cloudfront.net/wp-content/uploads/2018/10/TAI_0195-1024x678.jpg\" alt=\"\" width=\"1024\" height=\"678\" srcset=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195.jpg 1024w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-300x199.jpg 300w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-768x509.jpg 768w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-370x245.jpg 370w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0195-760x503.jpg 760w\" sizes=\"(max-width: 1024px) 100vw, 1024px\" /></p>\n<p><strong>川　大揮（かわ・たいき）</strong><br />\n東京工業大学理学院物理学系修士課程２年。24歳。同大学を中心にブロックチェーンなどを研究しているコミュニティ「CrypGeek」共同代表。ブロックチェーンコミュニティ「CRYPTO AGE」所属。</p>\n<hr />\n<h5><span id=\"i\">――今回のイベントを企画したきっかけを教えてください。</span></h5>\n<p>まず、仮想通貨やブロックチェーンに対して漠然とある「悪い印象」を少しでも変えたかったという気持ちがありました。仮想通貨は投機性が強く、周辺には詐欺のようなことも蔓延しているためか、一部のディープな人たちを除いて、一般の人たちはあまり良いイメージを抱いていないと思います。</p>\n<p><strong>――確かに、最近もハッキングによる仮想通貨の流出事件がありました。</strong></p>\n<p>そうですね。周囲と話していても、「今は持ちたくない」という人が多くいます。僕にはそれがちょっと分からないんです。「仮想通貨はよくない」という漠然とした意見も、「ボラティリティが激しいから通貨として使えない」という意見も耳にします。僕としては、そういう人たちを見返してやりたいなと思っているんです。</p>\n<p><strong>――そうした思いをイベントに込めたんですね。</strong></p>\n<p>はい。まず、多くの人に「仮想通貨を使う」とか「送金する」ということをリアルに体験してほしいと思いました。ちょうど東工大には「CrypGeek」があり、大学祭も数カ月後にあるというタイミングだったので、「大学祭の模擬店でイベントを企画しよう」ということになりました。また、参加者に、とにかくたくさんウォレットを触ってもらい、送金してほしかったので、「トークンをたくさん持っている人が優勝」というイベントスタイルにしました。</p>\n<p><strong>――ヒントが表示される地図アプリを使って、QRコードを探せるようになっていましたね。</strong></p>\n<p>地図アプリは株式会社ワールドゲームスさんに提供していただきました。地図アプリと連動してイベントに参加できるようになったことで、よりゲーム性が高まったと思います。</p>\n<figure id=\"attachment_5107\" style=\"width: 1024px\" class=\"wp-caption aligncenter\"><img data-attachment-id=\"5107\" data-permalink=\"https://www.chainage.jp/interview_tokodai_qrcode-hunt_taiki-kawa.html/tai_0087-2\" data-orig-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1.jpg\" data-orig-size=\"2048,1356\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;5.6&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;NIKON D7000&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1538927935&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;21&quot;,&quot;iso&quot;:&quot;1600&quot;,&quot;shutter_speed&quot;:&quot;0.00625&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}\" data-image-title=\"TAI_0087\" data-image-description=\"\" data-medium-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-300x199.jpg\" data-large-file=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-1024x678.jpg\" class=\"size-large wp-image-5107\" src=\"http://d2c4hjbo3xmykl.cloudfront.net/wp-content/uploads/2018/10/TAI_0087-1-1024x678.jpg\" alt=\"\" width=\"1024\" height=\"678\" srcset=\"https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-1024x678.jpg 1024w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-300x199.jpg 300w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-768x509.jpg 768w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-370x245.jpg 370w, https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0087-1-760x503.jpg 760w\" sizes=\"(max-width: 1024px) 100vw, 1024px\" /><figcaption class=\"wp-caption-text\">多くの人でにぎわった「QRcode Hunt」</figcaption></figure>\n<h5><span id=\"i-2\">――システムについて教えてください。</span></h5>\n<p>独自トークンの発行にあたっては、イーサリアムのブロックチェーンを活用しました。イーサリアムを採用したのは、①イーサリアムに詳しい人が周りに多かった②独自トークン発行がイーサリアムだと比較的簡単③周辺環境が整っているため、ウォレット開発にも便利だったーーといった理由からです。送金した金額が増えて返ってくる仕組みは、スマートコントラクトを書いています。ちなみに、独自トークンのTECは、Titech Electronic Currency（Titechは東工大Tokyo Institute of Technologyの略）の頭文字をとっています。</p>\n<p><strong>――イーサリアムのスマートコントラクトを使う場合、手数料（Gas）が発生すると思いますが、どのように処理したのでしょうか？</strong></p>\n<p>最初にウォレットをつくってもらうと、100TECがAirDropされたと思いますが、実は同じタイミングでETHも渡すような仕組みになっているんです。ユーザーからは見えないんですけどね。そのトークンのやり取りをした中で見えてないイーサリアム自体が使われているということですね。</p>\n<p><strong>――CrypGeekは普段どのような活動をしていますか？</strong></p>\n<p>主にブロックチェーン周りの技術的なことを研究しています。最近では、ライトニングネットワークがどのように作られているのかや、イーサリアムのコンセンサスアルゴリズムがCasperというPoSに移行する予定なのですが、それがどのように動いているのかというような勉強もしていました。メンバーは学部生のほかに修士のメンバーが数人、OBや他大学の学生も活動に参加してくれています。</p>\n<h5><span id=\"i-3\">――卒業後はどういった道へ進むつもりですか？</span></h5>\n<p>冒頭もお話しした通り、仮想通貨やブロックチェーンに対する評価をもっと高めていきたいと思っています。インターネットが登場した当初も、さまざまな問題点を指摘されていましたが、いわゆるGAFA（Google、Apple、Facebook、Amazon）をはじめとするベンチャー企業が、インターネットをより便利に、より使いやすく、より受け入れられやすいように作り変えてきました。僕も将来、仮想通貨やブロックチェーンの分野でこうした働きができればいいなと思っています。普及と改善の波に乗りつつ、アプリケーションやプロコトルなどの新しい商材を作っていきたいです。</p>\n<hr />\n<p>いかがでしたでしょうか？専門的な知識を生かしてイベントを企画し、夢に向かってひた走る川さんの姿はまぶしいものがありました！取材に協力していただいた川さん、大変にありがとうございました！</p>\n<p><strong>・イベントレポートは<a href=\"https://chainage.jp/event-report_tokodai_qrcode-hunt.html\">こちら</a></strong></p>\n<p><strong>・CrypGeekの公式ツイッターは<a href=\"https://twitter.com/CrypGeek?lang=ja\">こちら</a></strong></p>\n<p><strong>・インタビュー動画は<a href=\"https://www.youtube.com/watch?v=qOpjmo9V6xo\">こちら</a>（YouTube）</strong></p>\n<p>&lt;</p>\n<p>p style=&#8221;text-align: right;&#8221;><span style=\"color: #999999;\">©2018 Worldgo,kk. All Rights Reserved.</span></p>\n",
                "excerpt": "<p>東京工業大学の大学祭「工大祭」（10月6、7日）で、仮想通貨をつかったユニークな&hellip;</p>\n",
                "comment_status": "open",
                "ping_status": "publish",
                "sticky": false,
                "jetpack_featured_media_url": "https://www.chainage.jp/wp-content/uploads/2018/10/TAI_0176-e1540530337402.jpg",
                "author": {
                    "id": 11,
                    "name": "ChainAge編集部",
                    "description": "",
                    "avatar_urls": {
                        "24": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=24&d=mm&r=g",
                        "48": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=48&d=mm&r=g",
                        "96": "https://secure.gravatar.com/avatar/0e71cce127433bece5912dc9ce38183d?s=96&d=mm&r=g"
                    }
                },
                "categories": [
                    {
                        "id": 100,
                        "count": 5,
                        "description": "",
                        "name": "インタビュー",
                        "slug": "interview",
                        "parent": 0
                    }
                ],
                "tags": [
                    {
                        "id": 131,
                        "count": 10,
                        "description": "",
                        "name": "イベント",
                        "slug": "%e3%82%a4%e3%83%99%e3%83%b3%e3%83%88"
                    },
                    {
                        "id": 159,
                        "count": 1,
                        "description": "",
                        "name": "インタビュー",
                        "slug": "%e3%82%a4%e3%83%b3%e3%82%bf%e3%83%93%e3%83%a5%e3%83%bc"
                    },
                    {
                        "id": 123,
                        "count": 51,
                        "description": "",
                        "name": "ブロックチェーン",
                        "slug": "%e3%83%96%e3%83%ad%e3%83%83%e3%82%af%e3%83%81%e3%82%a7%e3%83%bc%e3%83%b3"
                    },
                    {
                        "id": 129,
                        "count": 95,
                        "description": "",
                        "name": "仮想通貨",
                        "slug": "%e4%bb%ae%e6%83%b3%e9%80%9a%e8%b2%a8"
                    },
                    {
                        "id": 164,
                        "count": 6,
                        "description": "",
                        "name": "大学",
                        "slug": "%e5%a4%a7%e5%ad%a6"
                    }
                ],
                "featuredmedia": null,
                "index": "a:1:{s:10:\"vc_grid_id\";a:0:{}}",
                "loaction": 100,
                "authorId": 11,
                "categoryIds": [
                    100
                ],
                "tagIds": [
                    131,
                    159,
                    123,
                    129,
                    164
                ]
            }
        ];
            for(var i=0;i<data.length;i++){
                var linkUrl='./newsContent.html?id=' + data[i].id;
               html+='<div class="col-sm-4 bd-card-mod">'
                   +'<a href=" '+linkUrl+' ">'
                   +'<div class="card-img lazy" style="background-image:url(./static/img/banner_l.png) " ></div>>'
                   +'</a>'
                   + '</div>';
           }
           $(".news_show .news_show_contain").html(html);
        // });
    },
    topNewsShow:function(json){
        var data=json.postMap["99"];
        $(".news_banner .banner_left img").attr("src", data[0].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_left a").attr("href", './newsContent.html?id=' + data[0].id);
        $(".news_banner .banner_left .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_left .time_fabu").text(Common.timeonverseFunc(new Date(data[0].date).getTime()));
        $(".news_banner .banner_r_top img").attr("src", data[1].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_top a").attr("href", './newsContent.html?id=' + data[1].id);
        $(".news_banner .banner_r_top .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_top .time_fabu").text(Common.timeonverseFunc(new Date(data[1].date).getTime()));
        $(".news_banner .banner_r_bot img").attr("src", data[2].featuredmedia.media_details[2].source_url);
        $(".news_banner .banner_r_bot a").attr("href", './newsContent.html?id=' + data[2].id);
        $(".news_banner .banner_r_bot .new_title").text(JSON.parse(data[0].title).rendered);
        $(".news_banner .banner_r_bot .time_fabu").text(Common.timeonverseFunc(new Date(data[2].date).getTime()));

        $(".news_banner .banner_left .new_catelage").text(data[0].categories[0].name);
        $(".news_banner .banner_r_top .new_catelage").text(data[1].categories[0].name);
        $(".news_banner .banner_r_bot .new_catelage").text(data[2].categories[0].name);

    },
    // 获取排行
    getRankingData: function getData(categories) {
        // var url = 'https://www.chainage.jp/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&categories=' + categories;
        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     async: true,
        //     error: function () {
        //     },
        //     success: function (data) {
        //         if (data) {
                    var data = [{persion: "20%"}, {persion: "20%"}, {persion: "-20%"}, {persion: "-20%"}, {persion: "20%"}, {persion: "20%"}];
                    // 注册关注 template方法
                    template.registerFunction('percent', function (valueText) {
                        var str = "up_color";
                        if (parseInt(valueText) >= 0) {
                            str = "up_color";
                        } else {
                            str = "down_color";
                        }
                        return str;
                    });
                    var newsFuc = template($("#message_show").html(), {data: data});
                    $(".message_show ul").html(newsFuc);
                // }
        //     }
        // });
    },
    getAdvertData:function(param,callback){
        var url = '';
        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            error: function () {
            },
            success: function (data) {
                if (data) {
                    if(callback){
                        callback(data);
                    }
                }
            }
        });
    },
    newsListShow:function(data,element){
        var htm = '';
        if (data.length > 0) {
            for (var i = 0; i < 6; i++) {
                var title=JSON.parse(data[i].title).rendered;
                var topicurl=data[i].author.avatar_urls["24"];
                var imgurl=data[i].featuredmedia.media_details[1].source_url;

                htm = '<div class="col-md-4 benefit_box"><a href="'+ './newsContent.html?id=' + data[i].id+'">'
                    + '<div class="benefit_box_con">'
                    + '<p class="p20 benefit_box_tit">'+data[i].categories[0].name+'</p>'
                    + '<p class="p20 benefit_box_hea">'+title+'</p>'
                    + '<p class="p20 benefit_box_from">'
                    +'<span class="new_list_icon"><img src="'+topicurl+'"></span>'
                    +'<span>'+data[i].author.name+'</span>'
                    +'<div class="time_right"><span class="new_list_time"></span>'
                    +'<span>'+Common.timeonverseFunc(new Date(data[1].date))+'</span></div>'
                    + '</p><div style="clear: both"></div>'
                    + '<div class="benefit_box_img" style="background-image:url('+imgurl+') "></div>'
                    + '<div class="p20 benefit_box_com news_dec">'+data[i].excerpt+'</div>'
                    + '</div>'
                    + '</a></div>';
                element.append(htm);
            }

        }
    }
}
homePage.init();