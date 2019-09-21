var test = '我是加载的数据';
console.log('test',test);
setTimeout(() => {
    self.postMessage(test);
}, 3000);