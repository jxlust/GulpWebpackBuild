function createWoker(f) {
    var blob = new Blob(['(' + f.toString() + ')()']);
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    return worker;
}

const pollingWorker = createWoker(function () {
    var cache = 'none';
    self.addEventListener('message', function (e) {
        var getMsg = e.data;
        if (getMsg === 'init') {
            //开始轮询
            startPolling();
        }
    })

    function compare(newV, oldV) {
        return JSON.stringify(newV) === JSON.stringify(oldV);
    }
    // var p =
    var tIndex = 0;
    function getPromise() {
        return new Promise((resolve, reject) => {
            //模拟服务器发送ajax
            setTimeout(() => {
                console.log(tIndex);
                if (tIndex == 5) {
                    resolve('ok');
                } else {
                    resolve('none');
                }
                tIndex++;
            }, 500);
        })
    }

    function startPolling() {
        var interval = setInterval(function () {
            getPromise().then(data => {
                if (cache !== data) {
                    self.postMessage(data);
                    clearInterval(interval);
                }
                cache = data;
            }).catch(e => {
                clearInterval(interval);
            })
        }, 1000);
    }

});

pollingWorker.postMessage('init');
pollingWorker.onmessage = function (e) {
    //轮询 数据改变了得到结果
    console.log('主线程获取到了结果', e.data);
}