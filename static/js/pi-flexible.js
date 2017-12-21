/**
 * @file JS 动态设置 html 根字体和 meta 标签
 */

(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = 0.32 + 'rem';
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }

    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        var rem = docEl.clientWidth * 10 / 75;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
}(window, document));
