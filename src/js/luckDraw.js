import {
    console
} from './log.js';

/**延迟偏差值 */
const DELY_OFFSET = 5;
/**最大加速的圈数百分比 */
const MAX_PERCENT = 0.8;
/**最大圈数的差 */
const MAX_DIFF = 2;
/**
 * jxl:转盘抽奖插件
 * 依赖jq
 */
class LuckDraw {
    constructor(select, prizeObj, options) {
        //this.select = select;
        this.$select = null;
        this.prizeObj = prizeObj;
        //是否锁定
        this.isLocked = false;
        this.prizeLists = [];

        this.options = {
            itemClass: 'js-item',
            activeClass: 'active',
            startBtnClass: 'js-start-draw',
            dataSorts: 'data-sort', //分类
            dataPrizeId: 'data-prize-id', //奖品id
            defaultAnimateDelay: 200, //动画延时200毫秒
            defCircleCount: 5, //默认圈数
            minAnimateDelay: 50,
            maxAnimateDelay: 500,
            calcAnimateDelay: false, //计算动画延迟时间
            onStart() {},
            onEnd(prizeobj) {},
            onStartClick(element) {},
            onLock() {},
            onUnlock() {}
        }
        //浅拷贝一层对象
        Object.assign(this.options, options);
        this.init(select);
        privateName.call(this, '调用私有方法');
    }
    init(select) {
        var $select = $(select),
            $lis = $select.find('.' + this.options.itemClass);
        this.$select = $select;
        //this.$lis = $lis;
        //排序抽奖列表
        this.sortLists($lis);
        //初始化数据
        this.initParams();
        //绑定事件
        this.bindEvent();

    }
    sortLists($lis) {
        //箭头函数方便获取上下文
        //dom元素存储方便使用，减少dom操作
        $lis.each((index, el) => {
            this.prizeLists.push($lis.filter(`[${this.options.dataSorts} = ${(index + 1)}]`));
        })
    }
    initParams() {
        this.animateIndex = 0;
        this.currentCircle = 0;
        this.animateDelay = this.options.defaultAnimateDelay;

    }
    bindEvent() {
        console.log('animateIndex', this);
        this.$select.on('click', `.${this.options.startBtnClass}`, (event) => {
            console.log('currentTarget:', event.currentTarget);
            console.log('target:', event.target);
            //暴露接口，暴露了所有方法和成员
            (typeof this.options.onStartClick === 'function') && this.options.onStartClick.call(this, event.currentTarget);
        });
    }
    start(prizeId) {
        var options = this.options;
        if (this.getIsLocked() || this.prizeLists.length === 0) {
            //已锁 不执行
            return;
        }
        this.lock();
        //初始化数据
        this.initParams();
        //移除掉选中样式
        this.prizeLists.forEach(($value) => {
            if ($value.hasClass(options.activeClass)) {
                $value.removeClass(options.activeClass);
                return false; //相当于break终止本次循环
                //throw new Error('end');//直接终止foreach
            }
        })
        //序列第一个添加上样式
        this.prizeLists[0].addClass(options.activeClass);
        setTimeout(() => {
            this.turning(prizeId);
        }, this.animateDelay);

        //开始了抽奖
        (typeof options.onStart === 'function') && options.onStart.apply(this);
    }
    /**
     * 抽奖过程方法
     * @param {number} prizeId 中奖的id
     */
    turning(prizeId) {
        let options = this.options;
        //this.prizeLists.length;
        //移除上一次样式
        this.prizeLists[this.animateIndex].removeClass(options.activeClass);
        this.animateIndex++;
        if (this.animateIndex === this.prizeLists.length) {
            this.animateIndex = 0;
            this.currentCircle += 1;
        }
        //添加选中本次
        this.prizeLists[this.animateIndex].addClass(options.activeClass);

        //计算执行下一次的延迟时间
        this.calcAnimateDelay();
        if (this.currentCircle === options.defCircleCount && this.prizeLists[this.animateIndex].attr(options.dataPrizeId) == prizeId) {
            //抽奖完成结束
            this.turnEnd(prizeId);
        } else {
            setTimeout(() => {
                this.turning(prizeId);
            }, this.animateDelay);
        }
    }
    calcAnimateDelay() {
        let options = this.options,
            delay;
        if (typeof options.calcAnimateDelay === 'function') {
            delay = options.calcAnimateDelay.apply(this, [this.animateDelay, this.currentCircle, this.animateIndex]);
        }
        if (delay) {
            //用户自定义了使用用户自定义的延迟时间
            this.animateDelay = delay;
            return;
        }
        //计算延迟时间
        //1.前面几圈速度较快或者普快
        //2.后面几圈速度较慢
        if (this.currentCircle < Math.max(options.defCircleCount * MAX_PERCENT, options.defCircleCount - MAX_DIFF)) {
            //越来越慢但是最小不小于最小值
            this.animateDelay = Math.max(this.animateDelay - DELY_OFFSET, options.minAnimateDelay);
        } else {
            //最大不会大于最大值
            this.animateDelay = Math.min(this.animateDelay + this.animateIndex * DELY_OFFSET * options.defCircleCount, options.maxAnimateDelay);
        }
    }
    turnEnd(prizeId) {
        this.initParams();
        this.unlock();
        //执行回调
        (typeof this.options.onEnd === 'function') && this.options.onEnd.apply(this, [prizeId, this.prizeObj]);
    }
    /**
     * 锁定，不能抽
     */
    lock() {
        this.isLocked = true;
        (typeof this.options.onLock === 'function') && this.options.onLock.apply(this);
    }
    /**
     * 解锁
     */
    unlock() {
        this.isLocked = false;
        (typeof this.options.onUnlock === 'function') && this.options.onUnlock.apply(this);
    }
    /**
     * @return {Boolean} 返回锁定状态
     */
    getIsLocked() {
        return this.isLocked;
    }

    getName(str) {
        return `${str}--hello ${this.name}`;
    }

}

LuckDraw.prototype.showMsg = function (msg) {
    console.log('msg:', msg);
}
window.LuckDraw = LuckDraw;
/**
 * 定义私有方法
 * @param {string} select 选择器
 */
function privateName(select) {
    console.log('select', select);
}

export {
    LuckDraw
}