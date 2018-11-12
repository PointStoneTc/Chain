!(function(t) {
    var Data = [];
    t.fn.draw = function(e,color,border) {
        var arr = e;
        var v = t(this);
        var settings = $.extend({
            'location': 'top',
            'background-color': 'blue'}, $(this), Data);
        return this.each(function() {
            Data.length = 0;
            for (var i = arr.length - 1; i >= 0; i--) {
                Data.push(arr[i]);
            }
            var canvas = v.find('canvas')[0];
            var context = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;
            var max = Math.max.apply(null, Data);
            var yStep = (height * 0.8) / max;

            context.strokeStyle = border?border:"#c8c8c8";
            context.textAlign = "center";
            context.textBaseline = "bottom";
            context.fillStyle = color?color:"#dcdcdc";
            context.lineWidth = 5;

            context.beginPath();
            context.lineTo(0, height);
            var xLen = 0;
            var x_space = width / (Data.length - 1);
            for (var i = 0; i < Data.length - 1; i++) {
                var yValue = Data[i];
                xLen += x_space;
                var yPont = height - yValue * yStep;
                if (i === 0) xLen = 0;
                context.lineTo(xLen, yPont);

            }
            context.lineTo(width, height);
            context.closePath();
            context.stroke();
            context.fill();
        });
    };
})(jQuery);
