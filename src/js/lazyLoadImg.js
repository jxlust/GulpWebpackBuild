class LazyLoadImg {
    constructor(select) {
        this.select = select;
        this.bindEvent();
    }
    bindEvent() {
        window.onscroll = throttle(lazyload, this.select, 200, 500);
    }
}

function throttle(fun, imgClass, delay, time) {
    var timeout,
        startTime = new Date();

    return function () {
        var context = this,
            args = arguments,
            curTime = new Date();
        var imgs = document.getElementsByClassName(imgClass);

        
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            //fun.call(context, 1123213213123);
            fun.apply(context, [imgs]);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
}

function lazyload(imgs) {
    
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
    let innerHeght = window.innerHeight; //可视高度
    if (!imgs) {
        return;
    }
    Array.from(imgs).forEach(img => {
        let offsetTop = getOffsetTop(img);
        if (offsetTop <= (scrollTop + innerHeght)) {
            //进入可视区域
            // let image = new Image();
            img.src = img.getAttribute('data-src');
            img.className = img.className.replace('lazyloading', '');
        }
    })

}

function getOffsetTop(el) {
    return el.offsetTop;
}

export default LazyLoadImg;