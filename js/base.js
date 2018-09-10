(function($) {
    $.fn.extend({
        sliod: function(option) {
            var _that = this, //当前上下文对象
                main = null,
                start = null,
                stop = null,
                init = null,
                timeout = null,
                next = null,
                prev = null,
                dian = null,
                elems = {},
                defaults = {
                    speed: 600,
                    delay: 3000
                };
            option = $.extend(defaults, option);
            init = function() {
                elems._index = 1;
                elems.baseDiv = _that.children('div');

                elems.box = _that.children('ul').children('li');
                elems.btn = _that.children('span');
                elems.baseDiv.append(elems.baseDiv.children('img').first().clone());
                _that.hover(function() {
                    stop();
                }, function() {
                    timeout = setInterval(function() {
                        start(1);
                    }, option.delay + option.speed);
                });
                elems.btn.on('click', function() {
                    if (elems.btn.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
                // elems.box.on('click', function() {
                //     // // console.log(1);
                //     // if (elems.box.index($(this))) {
                //     //     dian();
                //     // } else {
                //     //     right();
                //     // }


                // });
            }
            start = function(fx) {
                var t = "-=800px";
                if (!fx) {
                    t = "+=800px";
                    if (elems._index <= 1) {
                        var divLeft = _that.offset().left,
                            imgLeft = elems.baseDiv.children('img').last().offset().left;
                        elems._index = 5;
                        elems.baseDiv.css('left', '-' + (imgLeft - divLeft) + 'px');
                    }
                }
                elems.baseDiv.animate({
                    left: t
                }, option.speed, function() {
                    if (fx) elems._index++;
                    else elems._index--;

                    if (elems._index === 5) {
                        elems.baseDiv.css('left', 0);
                        elems._index = 1;
                    }
                });
            }
            main = function() {
                init();
                timeout = setInterval(function() {
                    start(1);
                }, option.delay + option.speed);
            }
            stop = function() {
                elems.baseDiv.stop(true, true);
                clearInterval(timeout);
            }
            next = function() {
                stop();
                start(1);
            }
            prev = function() {
                stop();
                start(0);
            }
            dian = function() {
                elems._index = 1;
                elems.silderDiv = _that.children('div');
                elems.dian = _that.children('ul').children('li');
                elems.dian.on('click', function() {
                    if (elems.dian.index(this) == 0) {
                        elems.silderDiv.animate({
                            left: 0
                        }, option.speed)
                    }
                    if (elems.dian.index(this) == 1) {
                        elems.silderDiv.animate({
                            left: -800
                        }, option.speed)
                    }
                    if (elems.dian.index(this) == 2) {
                        elems.silderDiv.animate({
                            left: -2 * 800
                        }, option.speed)
                    }
                    if (elems.dian.index(this) == 3) {
                        elems.silderDiv.animate({
                            left: -3 * 800
                        }, option.speed)
                    }
                    if (elems.dian.index(this) == 4) {
                        elems.silderDiv.animate({
                            left: -4 * 800
                        }, option.speed)
                    }
                })
            }

            main();
            dian();
        }

    });

})(jQuery);