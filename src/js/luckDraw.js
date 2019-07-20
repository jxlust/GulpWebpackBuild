/**
 * jxl:转盘抽奖插件
 */
class LuckDraw{
    constructor(select,prizeObj,options) {
        this.select = select;
        this.prizeObj = prizeObj;
        this.options = {
            itemClass: 'js-item',
            activeClass: 'active',
            startBtnClass: 'js-start-draw',
            dataSorts: 'data-sort',
            prizeIds: 'data-prize-id',
            onStart(){},
            onEnd(prizeobj){},
            onStartClick($btn){},
            onLock(){},
            onUnlock(){}
        }
        //浅拷贝一层对象
        Object.assign(this.options,options);
        this.init(this.select);
        privateName.call(this,'调用私有方法');
    }
    init(select){
        console.log('hh');
    }
    getName(str){
        return `${str}--heloo ${this.name}`;
    }
}
window.LuckDraw = LuckDraw;

function privateName(select) {
    console.log('select',select);
}

export{
    LuckDraw
}