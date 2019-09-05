//import $ from 'jquery';
//import 'regenerator-runtime/runtime';
// import './ts/typescript-test.ts';
// import * as obj from './js/es6.js';
// console.log('es6',obj.name);

import CircleDraw, {
    test as test1,
    obj,
    name
} from './js/circleDraw.js';
import TableLine from './js/tableLine';
import lazyImg from './js/lazyLoadImg';

console.log(new CircleDraw().showMsg('jssss'));
console.log('tttt', test1 + '-' + obj.a + '-' + name );
// let ld = new LuckDraw('lizi');
// console.log('打印',ld.getName());
let prizeData = {
    prizeId: 103
}
 
let options = {
    onStart: function () {
        console.log('开始了抽奖。。。。');
    },
    onStartClick: function (el) {
        console.log('start element', el);
        console.log('haha', this.getName('猪猪猪'));
        console.log('锁', this.getIsLocked());
        this.start(prizeData.prizeId);
    },
    calcAnimateDelay: function (aniDelay, curCircle, aniIndex) {
        // if(curCircle === 5){
        //     return 1000;
        // }

    }

}
let ld = new CircleDraw('#testId', prizeData, options);

new lazyImg('lazyloading');