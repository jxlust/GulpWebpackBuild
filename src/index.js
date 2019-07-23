//import $ from 'jquery';
//import 'regenerator-runtime/runtime';
// import './ts/typescript-test.ts';
// import * as obj from './js/es6.js';
// console.log('es6',obj.name);

import {LuckDraw} from './js/luckDraw.js';

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
        this.start(prizeData.prizeId);
    }

}
let ld = new LuckDraw('#testId', prizeData, options);