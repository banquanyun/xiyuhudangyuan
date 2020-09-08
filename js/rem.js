!function () {
    try {
        var MODEL_REM = "REM",
            MODEL_SCALE = "SCALE";
        var width =750,//设计稿尺寸
            defaultFontSize =100,//默认字体大小
            dpr = window.devicePixelRatio || 1,
            scale = 1 / dpr,
            viewportEl = document.querySelector('meta[name="viewport"]'),
            setView = function (model) {
                var _clientWidth = document.documentElement ? document.documentElement.clientWidth : document.getElementsByTagName("html")[0].clientWidth,
                    _font_size = 0;
                if (model == MODEL_REM) {
                    //此方法仅用于统一rem值，不改viewport content属性（缩放比例为1：1）。
                    //例：设计稿宽720px，则font-size为 1rem = 100px;
                    //如设计稿上有一个元素宽为200px，那么样式中宽度就应为200px/100px = 2rem；

                    var _p = _clientWidth / width;
                    _font_size = _p > 1 ? defaultFontSize : defaultFontSize * _p;
                } else {
                    //此方法会更改viewport content属性（根据dpr进行缩放）。
                    // 例：设计稿宽720px，设备物理像素宽为720px，则font-size为720px/10=72px；1rem = 72px；
                    // 如设计稿上有一个元素宽为200px，那么样式中宽度就应为200px/72px = 2.777777777777778rem；
                    // 注意：此方式修改meta viewport，会导致所有元素在屏幕上的比例变化，如使用已有自适应功能的框架，建议使用MODEL_REM
                    var _p = _clientWidth / width;
                    _font_size = _p > 1 ? width * dpr / 10 : _clientWidth * dpr / 10;
                    viewportEl.setAttribute("content", "initial-scale=" + scale + ", user-scalable=0, minimum-scale=" + scale + ", maximum-scale=" + scale);
                }
                document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _font_size + "px;width:100%;");
            };
        setView(MODEL_REM);
        window.addEventListener('resize',function(){
            setView(MODEL_REM);
        })
    } catch (e) {
        console.warn("rem初始化错误");
    }
}();

// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);