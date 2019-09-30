//import $ from 'jquery';
//import 'regenerator-runtime/runtime';
// import './ts/typescript-test.ts';
// import * as obj from './js/es6.js';
// console.log('es6',obj.name);
import 'babel-polyfill';
import CircleDraw, {
    test as test1,
    obj,
    name
} from './js/circleDraw.js';
import TableLine from './js/tableLine';
import lazyImg from './js/lazyLoadImg';
import Test from './js/Generator/test';

import co from './js/Generator/co';
Test('I');


function read(str) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let i = 100;
                resolve(`${str}-----${i}`);
            } catch (error) {
                reject('获取失败!');
            }
        }, 1000);
    })
}

function* gen() {
    let r1 = yield read('1.txt');
    console.log('r1', r1);
    let r2 = yield read('2.txt---' + r1);
    console.log('r2', r2);
    return 100;
}
//自动执行异步遍历器
 co(gen).then(data => {
     console.log(1,data);
 })

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

// new lazyImg('lazyloading');