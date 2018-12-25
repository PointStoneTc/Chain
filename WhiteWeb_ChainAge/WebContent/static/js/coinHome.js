//给数组增加自定义函数
function cacl(arr, callback) {
    var ret;
    for (var i = 0; i < arr.length; i++) {
        ret = callback(arr[i], ret);
    }
    return ret;
}

Array.prototype.max = function () {
    return cacl(this, function (item, max) {
        if (!(max > item)) {
            return item;
        } else {
            return max;
        }
    });
};
Array.prototype.min = function () {
    return cacl(this, function (item, min) {
        if (!(min < item)) {
            return item;
        } else {
            return min;
        }
    });
};
Array.prototype.sum = function () {
    return cacl(this, function (item, sum) {
        if (typeof (sum) == 'undefined') {
            return item;
        } else {
            return sum += item;
        }
    });
};
Array.prototype.avg = function () {
    if (this.length == 0) {
        return 0;
    }
    return this.sum(this) / this.length;
};

function init() {
    var htmlAppend = $('.cspas').html();
    $('#cspa_btc').remove();
    var t1 = $('.cspas');

    for (var i = 0; i < 16; i++) {
        t1.append(htmlAppend);
    }
}

function getData() {
    var url = 'http://data.chainage.jp/blockchain/coinapi/assetTrend';
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        dataType: "text",
        error: function () {
            alert("请求有误");
        },
        success: function (data) {
            xx(data);
        }
    });
}

// 整数部分>=7 位  ，只显示整数部分
// 整数部分<7 位，整数+小叔=6位
// 整数部分加千位分位符
function dataStr(data) {
    var priceNum = data.toString().split(".");
    var price = 0;
    if (priceNum[0].toString().length >= 6) {
        price = Number(priceNum[0]).toLocaleString();
    } else {
        var a,b,c;
        c=6 - priceNum[0].toString().length;
        price = data.toFixed(6 - priceNum[0].toString().length);
        if(priceNum[0].toString().length>3){
            a=Number(priceNum[0]).toLocaleString();
            b= priceNum[1].substring(0, c);
            price=a+'.'+b;
        }else{
            b= priceNum[1].substring(0, c);
            price=priceNum[0]+'.'+b;
        }
    }
    return price;
}

function xx(data) {
    var jsonObj = JSON.parse(data);// 转换为json对象
    //console.info(jsonObj);
    var card;
    $.each(jsonObj, function (i, n) {
        if (n.specificRate.percentChange24h < 0) {
            $(".n-mark:eq(" + i + ")").addClass("arrow-bottom");
            $(".numberPercent:eq(" + i + ")").addClass("numberColor");
        } else {
            $(".n-mark:eq(" + i + ")").addClass("arrow-top");
        }
        card = $('.cspas .cspa:eq(' + i + ')').attr('id', n.specificRate.baseId + '_' + n.specificRate.baseSymbol);
        card.find(' .code').text(n.specificRate.baseSymbol);
        card.find(' .name').text(n.specificRate.baseName);
        card.find(' .price .numberPrice').text(dataStr(n.specificRate.price));
        card.find(' .change .numberPercent').text(n.specificRate.percentChange24h + '%');
        card.find(' .volume .numberVolume').text(dataStr(n.specificRate.volume24h));
        card.find(' .volume .unit').text(n.specificRate.quoteSymbol);
        card.find(' .logo img').attr('src', 'static/img/coin/128/' + n.specificRate.baseId + '.png');
        card.find(' .chart').draw(xxxxxxx(n.series), '#EFEFEF','#EFEFEF');
    });
}

/**
 * 如果大于0,保留两位小数，否则保留4位小数
 */
function format(value) {
    return value;
    /*
    var result;
    var parts = (value + '').split('.');
    var intpart = parts[0];
    var floatpart = parts[1];
    if (parseInt(intpart) > 1) {
        intpart = intpart.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        floatpart = floatpart.substring(0, 2);
    } else {
        intpart = 0;
        floatpart = floatpart.substring(0, 4);
    }
    return result = intpart + '.' + floatpart;
     */
}

function xxxxxxx(data) {
    var values = [];
    var avg = data.avg();
    $.each(data, function (i, n) {
        values.push(parseInt(Math.abs(n - avg)) / 10);
    });
    return values;
}

init();
getData();

var marketContent = [];
var scrollHtml = ['<div class="market">',
    '<div class="group group-l ">BTC / USD</div>',
    '<div class="group group-r">',
    '<div class="price number numberPrice">',
    '<span class="">价格</span>',
    '<span class="n-integer n-number">233333</span>',
    '</div>',
    '<div class="change">',
    '<span class="number numberChange numberUp"> 333444</span>',
    '<span class="n-mark glyphicon glyphicon-chevron-down"></span></div>',
    '</div>',
    '</div>'];
for (var i = 0; i < 4; i++) {
    marketContent.push(scrollHtml.join(""));
}
$(".trading-scroll").html(marketContent);

$(".trading-scroll .market").clone().appendTo(".trading-scroll");
dongyici();	//调用函数
function dongyici() {
    //开跑
    $(".trading-scroll").animate({"left": -900}, 5000, "linear", function () {
        $(this).css("left", 0);
        dongyici();	//迭代。自己调用自己。
    });
}



// 交易所排行
function getRankData() {
    var url = 'http://data.chainage.jp/blockchain/coinapi/topFloatingExchange';
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        dataType: "text",
        error: function () {
            alert("请求有误");
        },
        success: function (data) {
            rankShowFunc(data);
        }
    });
}

function rankShowFunc(data) {
    var data=JSON.parse(data);
    var rankLHtml = '';
    var rankRHtml = '';
    var numClass = '';
    for (var i = 0; i < 10; i++) {
        if (i == 0 || i == 1 || i == 2) {
            numClass = "numColor";
        } else {
            numClass = '';
        }
        var price=parseFloat(Number(data[i].bVolume24h).toFixed(2)).toLocaleString();
        rankLHtml += '<div class="ranking-list"><a href="./market.html?id='+data[i].exchangeId+'&p='+price+'&n='+data[i].name+'">'
            + '<div class="ranking-num ' + numClass + '">' + (i + 1) + '</div>'
            + '<div class="ranking-icon">'
            + '  <img src="static/img/coin/128/' + data[i].exchangeId + '.png" alt="" width="20px" height="20px">'
            + '</div>'
            + '<div class="ranking-name">' + data[i].name + '</div>'
            + '<div class="ranking-value">24h交易总值：JPY ' + parseFloat(Number(data[i].qVolume24h).toFixed(2)).toLocaleString() + '</div>'
            + '</a></div>';
    }
var j=0;
    for (var i = 19; i >= 10; i--) {
        j++;
        var price=parseFloat(Number(data[i].bVolume24h).toFixed(2)).toLocaleString();
        rankRHtml += '<div class="ranking-list"><a href="./market.html?id='+data[i].exchangeId+'&p='+price+'&n='+data[i].name+'">'
            + '<div class="ranking-num">' + j + '</div>'
            + '<div class="ranking-icon">'
            + '  <img src="static/img/coin/128/' + data[i].exchangeId + '.png" alt="" width="20px" height="20px">'
            + '</div>'
            + '<div class="ranking-name">' + data[i].name + '</div>'
            + '<div class="ranking-value">24h交易总值：JPY ' + parseFloat(Number(data[i].qVolume24h).toFixed(2)).toLocaleString() + '</div>'
            + '</a></div>';
    }
    $(".exchange-ranking .rankL").html(rankLHtml);
    $(".exchange-ranking .rankR").html(rankRHtml);
}

getRankData();

Common.getCategoreType();
// 广告
function getAddvertData() {
    var param = {
        categories: 191,
        per_page: 1,
        order: 'desc',
        orderby: 'date',
        status: 'publish'
    }
    Common.getNewsData(param,function(data){
        if(data){
            var arr=[];
            arr.push(data[0].id);
            Common.getImgData(arr,function(imgUrl){
                var picUrl="static/img/default_700.jpg";
                if( imgUrl && imgUrl[0] && imgUrl[0].media_details){
                    picUrl=Common.getSimilarImg(imgUrl[0].media_details.sizes,3.7);
                }
                var html='<a href="newsContent.html?id='+data[0].id+'&cat='+Common.categories[191]+'" ><img src="'+picUrl+'" width="100%" height="100%"></a>';
                $(".advert1").html(html);
            });

        }
    });

}
getAddvertData();