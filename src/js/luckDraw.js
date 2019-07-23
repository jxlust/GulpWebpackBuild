import {console} from './log.js';
/**
 * jxl:转盘抽奖插件
 * 依赖jq
 */
class LuckDraw{
    constructor(select,prizeObj,options) {
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
            dataSorts: 'data-sort',//分类
            prizeIds: 'data-prize-id',//奖品id
            defaultAnimateDelay: 200,//动画延时200毫秒
            onStart(){},
            onEnd(prizeobj){},
            onStartClick($btn){},
            onLock(){},
            onUnlock(){}
        }
        //浅拷贝一层对象
        Object.assign(this.options,options);
        this.init(select);
        privateName.call(this,'调用私有方法');
    }
    init(select){
        var $select =  $(select),
            $lis = $select.find('.'+this.options.itemClass);
        this.$select = $select;
        //this.$lis = $lis;
        //排序抽奖列表
        this.sortLists($lis);
        //初始化数据
        this.initParams();
        //绑定事件
        this.bindEvent();
        
    }
    sortLists($lis){
        //箭头函数方便获取上下文
        $lis.each((index,el) => {
            this.prizeLists.push($lis.filter(`[${this.options.dataSorts} = ${(index + 1)}]`));
        })
    }
    initParams(){
        this.animateIndex = 0;
        this.currentCircle = 0;
        this.animateDelay = this.options.defaultAnimateDelay;


    }
    bindEvent(){
        this.$select.on('click',`.${this.options.startBtnClass}`,(event) => {
            console.log('currentTarget:',event.currentTarget); 
            console.log('target:',event.target); 
        });
    }
    getName(str){
        return `${str}--hello ${this.name}`;
    }

}

LuckDraw.prototype.showMsg = function (msg) {
    console.log('msg:',msg);
}
window.LuckDraw = LuckDraw;

function privateName(select) {
    console.log('select',select);
}

export{
    LuckDraw
}