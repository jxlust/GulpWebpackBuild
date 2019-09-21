//主线程
// Worker.onerror：指定 error 事件的监听函数。
// Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
// Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
// Worker.postMessage()：向 Worker 线程发送消息。
// Worker.terminate()：立即终止 Worker 线程。


var myWorker = new Worker('js/native/MyWork.js',{
    name: 'myWorker'
});

// myWorker.addEventListener('message',function (e) {
// });
// myWorker.onmessage(function (e) {
// });

myWorker.onerror = function (e) {
    console.error([
        'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
      ].join(''));
}
myWorker.onmessage = function (event) {
    console.log('主线程获取到结果',event);
    console.log('主线程获取到结果',event.data);
    //do something
    // closeWork();
}
function closeWork() {
    myWorker.terminate();
}
var str = 'i love tree thousand years';
myWorker.postMessage(str);

var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
var ab  = uInt8Array.buffer;
myWorker.postMessage(ab,[ab]);


myWorker.onmessageerror = function (event) {
    
}