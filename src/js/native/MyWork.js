//worker线程
// self.name： Worker 的名字。该属性只读，由构造函数指定。
// self.onmessage：指定message事件的监听函数。
// self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
// self.close()：关闭 Worker 线程。
// self.postMessage()：向产生这个 Worker 线程发送消息。
// self.importScripts()：加载 JS 脚本。

console.log('子线程1 name',self.name);
var load = importScripts('loadTest.js');
console.log('load',load);

// self.postMessage(abc);
self.addEventListener('message', function (e) {
    console.log('子线程1',e.data);
    setTimeout(() => {
        self.postMessage('You said: ' + e.data);    
    }, 5000);
}, false);

self.addEventListener('messageerror',function (e) {
    
},false);

function closeWorkThread() {
    self.close();
}