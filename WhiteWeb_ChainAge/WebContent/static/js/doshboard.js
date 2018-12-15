// var dataList = [];
// for (var i = 0; i < 32; i++) {
//     dataList.push('<div data-key="CSPA:BTC/AED" class="data_item">',
//         '<div class="code"><span>BTC/</span><span>AED</span></div>',
//         '<div class="price">23,0910.88</div>',
//         '</div>');
// }
// $(".currency_container").html(dataList.join(""));

// 烛台图
var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';

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

function getData(callback) {
    $.ajax({
        type: 'GET',
        url: 'http://data.chainage.jp/caweb/cc/currencyApiController.do?btcMonitorLineOHLCV',
        async: true,
        dataType: "text",
        error: function () {
            alert("请求有误");
        },
        success: function (data) {
            callback(data);
        }
    });
}

function createLine(result) {
    var line = new Object;
    line.values1 = []; //y轴数据点
    line.values2 = []; //y轴数据点
    line.values3 = []; //y轴数据点
    line.categoryData = []; //x轴数据点
    line.otherData = new Array(new Array(), new Array(), new Array(), new Array());
    $.each(result.line_his_queue, function (i, n) {
        line.otherData[0].push({value:parseFloat(n.priceUsd.toFixed(2)),label:{}});
        line.otherData[1].push({value:parseFloat(n.priceJpy.toFixed(2)),label:{}});
        line.otherData[2].push({value:parseFloat(n.priceEur.toFixed(2)),label:{}});
        line.otherData[3].push({value:parseFloat(n.priceCny.toFixed(2)),label:{}});
        line.categoryData.push(n.lastUpdated.replace('2018-', ''));
    });

    var max = line.otherData[0].max().value;
    var min = line.otherData[0].min().value;
    line.max = parseInt(max + max / 100);
    line.min = parseInt(min - min / 100);

    $.each(line.otherData[0], function (i, n) {
        line.values1.push(n);
    });
    $.each(line.otherData[1], function (i, n) {
        line.values2.push(n);
    });
    $.each(line.otherData[2], function (i, n) {
        line.values3.push(n);
    });
    // line.values1[line.values1.length-1].label.show= true;
    line.values1[line.values1.length-1].label.position= 'right';
    line.values1[line.values1.length-1].label.fontSize= 16;
    // line.values2[line.values1.length-1].label.show= true;
    line.values2[line.values1.length-1].label.position= 'right';
    line.values2[line.values1.length-1].label.fontSize= 16;
    // line.values3[line.values1.length-1].label.show= true;
    line.values3[line.values1.length-1].label.position= 'right';
    line.values3[line.values1.length-1].label.fontSize= 16;
    return line;
}
function createOhlcv(result) {
    var ohlcv = new Object;
    ohlcv.temp1 = [];
    $.each(result.ohlcv_his_queue, function(i, n) {
        var arr = [];
        arr.push(n.lastUpdated.replace('2018-', ''));
        arr.push(n.open);
        arr.push(n.close);
        arr.push(n.low);
        arr.push(n.high);
        ohlcv.temp1.push(arr);
    });

    ohlcv.data = splitData(ohlcv.temp1);
    return ohlcv;
}
function getLineData(data) {
    var lineData = createLine(JSON.parse(data));
    $(".usdData").html(lineData.otherData[0][lineData.otherData[0].length-1].value)
    $(".jpyData").html(lineData.otherData[1][lineData.otherData[0].length-1].value)
    $(".eurData").html(lineData.otherData[2][lineData.otherData[0].length-1].value)
    // 折线图
    var lineOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor:'#2C395F',
            padding:10,
            textStyle:{
                fontSize:12,
                lineHeight:40
            },
            formatter: function(params, ticket, callback) {
                var dix = params[0].dataIndex;
                var res = '<div style="color:#fff;">' + params[0].name + ' UTC</div>'
                    + '<ul style="padding:0"><li ><span style="display:inline-block;width:70px;padding-right:10px;">BTC/USD</span><span>'
                    + params[0].value + '</span></li><li ><span style="width:70px;display:inline-block;padding-right:10px;">BTC/JPY</span><span>'
                    + lineData.otherData[1][dix].value + '</span></li><li ><span style="display:inline-block;width:70px;padding-right:10px;">BTC/EUR</span><span>'
                    + lineData.otherData[2][dix].value + '</span></li><ul>';
                return res;
            }
        },
        color: ['#FFFFFF', '#b46496', '#d2c88c'],
        legend: {
            itemHeight: 0,//改变圆圈大小
            textStyle: {
                fontSize: 16,
            },
            left: "60px",
            top: "30px",
            data: [{
                name: 'BTC / USD',
                textStyle: {
                    color: '#FFFFFF'          // 图例文字颜色
                }
            }, {
                name: 'BTC / JPY',
                textStyle: {
                    color: '#b46496'          // 图例文字颜色
                }
            }, {
                name: 'BTC / EUR',
                textStyle: {
                    color: '#d2c88c'          // 图例文字颜色
                }
            }]
        },
        grid: {
            left: '-4%',
            right: '0%',
            bottom: '150px',
            top: "150px",
            containLabel: true
        },
        toolbox: {
            feature: {}
        },
        xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false,
            data: lineData.categoryData
        },
        yAxis: [{
            type: 'value',
            show: false,
            min: function () {

            }
        },
            {
                type: 'value',
                show: false,
                max:function () {

                }
            },
            {
                type: 'value',
                show: false,
                min: function () {

                },
                max:function () {
                }

            }
        ],
        series: [
            {
                name: 'BTC / USD',
                symbolSize: "0.1",
                type: 'line',
                stack: '总量',
                textStyle: {
                    color: 'red'          // 图例文字颜色
                },

                yAxisIndex: 0,
                //   data: [{
                //     value:120,
                // },{
                //     value:132,
                // },{
                //     value:101,
                // },{
                //     value:134,
                // },{
                //     value:90,
                // },{
                //     value:230,
                //   },{
                //     value:210,
                //     label:{
                //         show:true,
                //         position: 'right',
                //         fontSize:16,
                //         formatter:function () {
                //             var html='<div>啦啦啦</div>'
                //             return html;
                //         }
                //     }
                // }]
                data: lineData.values1
            },
            {
                name: 'BTC / JPY',
                symbolSize: "0.1",
                type: 'line',
                stack: '总量',

                yAxisIndex: 1,
                data: lineData.values2
                // data: [{
                //     value:220,
                // },{
                //     value:182,
                // },{
                //     value:191,
                // },{
                //     value:234,
                // },{
                //     value:190,
                // },{
                //     value:330,
                // },{
                //     value:110,
                //     label:{
                //         show:true,
                //         position: 'right',
                //         fontSize:16
                //     }
                // }]
            },
            {
                name: 'BTC / EUR',
                symbolSize: "0.1",
                type: 'line',
                stack: '总量',

                yAxisIndex: 2,
                data: lineData.values3
                // data: [{
                //     value:150,
                // },{
                //     value:182,
                // },{
                //     value:291,
                // },{
                //     value:224,
                // },{
                //     value:190,
                // },{
                //     value:230,
                // },{
                //     value:310,
                //     label:{
                //         show:true,
                //         position: 'right',
                //         fontSize:16
                //     }
                // }]

            }
        ]
    };
    var lineChart = echarts.init(document.getElementById("charts-line"));
    lineChart.setOption(lineOption);
}
function getOhlcvData(data) {
    var ohlcv = createOhlcv(JSON.parse(data));
    $(".titData").html(ohlcv.data.categoryData[ohlcv.data.categoryData.length-1]);

    $(".openData").html(ohlcv.data.values[ohlcv.data.values.length-1][0]);
    $(".highData").html(ohlcv.data.values[ohlcv.data.values.length-1][3]);
    $(".lowData").html(ohlcv.data.values[ohlcv.data.values.length-1][2]);
    $(".closeData").html(ohlcv.data.values[ohlcv.data.values.length-1][1]);
    var option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor:'#2C395F',
            padding:10,
            textStyle:{
                fontSize:12,
                lineHeight:40
            },
            formatter: function(params, ticket, callback) {
                var dix = params[0].dataIndex;
                var res = '<div style="color:#fff;">' + params[0].name + ' UTC</div>'
                    + '<ul style="padding:0"><li ><span style="width:50px;padding-right:10px;display:inline-block;">Open</span><span>'
                    + ohlcv.data.values[dix][0] + '</span></li><li ><span style="width:50px;display:inline-block;padding-right:10px;">High</span><span>'
                    + ohlcv.data.values[dix][3] + '</span></li><li ><span style="width:50px;display:inline-block;padding-right:10px;">Low</span><span>'
                    + ohlcv.data.values[dix][2] + '</span></li><li ><span style="width:50px;display:inline-block;padding-right:10px;">Close</span><span>'
                    +ohlcv.data.values[dix][1] + '</span></li><ul>';
                return res;
            }
        },
        legend: {},
        grid: {
            left: '-3%',
            right: '0%',
            bottom: '17%',
            top:'20%'
        },
        xAxis: {
            type: 'category',
            data: ohlcv.data.categoryData,
            scale: true,
            boundaryGap: false,
            show: false,
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'

        },
        yAxis: {
            scale:true,
            show: false,
            splitArea: {
                show: false
            },
            min:function(){}
        },
        dataZoom: [{
            type: 'inside',
            start: 70,
            end: 100}, {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100}],
        series: [
            {
                name: '',
                type: 'candlestick',
                data:ohlcv.data.values,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                }

            }


        ]
    };
    var lineChart = echarts.init(document.getElementById("charts-candlestick"));
    lineChart.setOption(option);
}

function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

$(".view-tottle").on("click","li",function(){
    if($(this).children("img").attr("src").indexOf('candlestick')>0){
        $(".data-candlestick").show();
        $(".view-tottle .active img").attr("src","static/img/candlestick_active.png");
        $(".view-tottle li:eq(0) img").attr("src","static/img/line_icon.png");
        $(".view-tottle li:eq(2) img").attr("src","static/img/time_view_icon.png");
        $(".data-view").hide();
        $(".data-line").hide();
        getData(function (data) {
            getOhlcvData(data);
        });
    }else if($(this).children("img").attr("src").indexOf('line')>0){
        $(".data-line").show();
        $(".view-tottle .active img").attr("src","static/img/line_active_icon.png");
        $(".view-tottle li:eq(0) img").attr("src","static/img/candlestick.png");
        $(".view-tottle li:eq(2) img").attr("src","static/img/time_view_icon.png");
        $(".data-view").hide();
        $(".data-candlestick").hide();
        getData(function (data) {
            getLineData(data);
        });
    }else{
        $(".data-view").show();
        $(".view-tottle .active img").attr("src","static/img/time_active_icon.png");
        $(".view-tottle li:eq(0) img").attr("src","static/img/candlestick.png");
        $(".view-tottle li:eq(2) img").attr("src","static/img/line_icon.png");
        $(".data-line").hide();
        $(".data-candlestick").hide();
    }
})