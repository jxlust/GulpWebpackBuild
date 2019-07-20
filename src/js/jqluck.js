
$(function(){
    function luckdraw(selector, prizeObj, options){
        this.$selector = null;
        this.prizeObj = prizeObj;
        this.seqLis = [];

        //是否锁定
        this.locked = false;

        this.options = $.extend(true, {
            itemClass: 'js-item',         // 奖品
            startBtnClass: 'go-luckdraw', // 开始按钮
            selectedClass: 'active',      // 奖品选中添加类
            itemSortAttr: 'data-sort',    // 奖品排序1开始
            prizeIdAttr: 'data-prize-id', // 奖品ID
            defaultAnimateDelay: 200,     // 默认延迟
            turnAroundCount: 3,
            minAnimateDelay: 50,
            maxAnimateDelay: 500,
            calcAniDelay: false,
            onReady: function(){},
            onEnd: function(prizeId, prizeObj){},
            onClick: function($btn){},
            onLock: function(){},
            onUnlock: function(){}
        }, options);
        this._init(selector);
    }

    /**
     * 开始抽奖动画
     * @param  {String} prizeId 奖品ID
     */
    luckdraw.prototype.start = function(prizeId){
        var _this = this, 
            options, $li;
        if(this.isLocked() || this.seqLis.length == 0){
            return;
        }

        this.lock();

        this._initParams();

        options = this.options;

        // 要不要改为记录最后数据取消
        for(var i=0, len=this.seqLis.length; i<len; i++){
            $li = this.seqLis[i];
            if($li.hasClass(options.selectedClass)){
                $li.removeClass(options.selectedClass);
                break;
            }
        }

        this.seqLis[0].addClass(options.selectedClass);
        // 函数是否写到里面
        setTimeout(function(){
            _this._turning(prizeId);
        }, this.aniDelay);

        if(typeof options.onReady == 'function'){
            options.onReady.apply(this, []);
        }
    };

    /**
     * 初始化
     */
    luckdraw.prototype._init = function(selector){
        var $selector = $(selector), 
            options = this.options, 
            $lis = $selector.find('.' + options.itemClass);

        this.$selector = $selector;
        this.$lis = $lis;

        this._sortLis($lis);

        this._initParams();

        this._bindEvents();
    };

    luckdraw.prototype._initParams = function(){
        this.aniIndex = 0; //当前动画播放位置
        this.aniDelay = this.options.defaultAnimateDelay; //当前动画的延迟
        this.currCircle = 0; //当前第几圈
    };

    luckdraw.prototype._bindEvents = function(){
        var _this = this;

        this.$selector.on('click', '.' + this.options.startBtnClass, function(){
            var $this = $(this);

            if(typeof _this.options.onClick == 'function'){
                _this.options.onClick.apply(_this, [$this]);
            }
        });
    };

    /**
     * 奖品项排序
     * @param  {jQueryObject} $lis 奖品项
     */
    luckdraw.prototype._sortLis = function($lis){
        var _this = this, 
            options = this.options;
        $lis.each(function(i){
            _this.seqLis.push($lis.filter('[' + options.itemSortAttr + '="' + (i + 1) + '"]'));
        });
    };

    /**
     * 抽奖过程
     * @param  {String} prizeId 奖品ID
     */
    luckdraw.prototype._turning = function(prizeId){
        var _this = this, 
            options = this.options, 
            selectedClass = options.selectedClass, 
            seqLis = this.seqLis, 
            seqLen = seqLis.length;

        seqLis[this.aniIndex].removeClass(selectedClass);
        this.aniIndex++;
        if(this.aniIndex >= seqLen){
            this.aniIndex = 0;
            this.currCircle++;
        }
        seqLis[this.aniIndex].addClass(selectedClass);

        this._calcAniDelay();

        if(this.currCircle == options.turnAroundCount && seqLis[this.aniIndex].attr(options.prizeIdAttr) == prizeId){
            this._turnEnd(prizeId);
        }else{
            setTimeout(function(){
                _this._turning(prizeId);
            }, this.aniDelay); 
        }
    };

    /**
     * 抽奖结束
     * @param  {String} prizeId 奖品ID
     */
    luckdraw.prototype._turnEnd = function(prizeId){
        this._initParams();

        this.unlock();
        
        if(typeof this.options.onEnd == 'function'){
            this.options.onEnd.apply(this, [prizeId, this.prizeObj[prizeId]]);
        }
    };

    /**
     * 计算动画延迟, 计算方法使用calcAniDelay自己定制
     */
    luckdraw.prototype._calcAniDelay = function(){
        var options = this.options, 
            delay;
        if(typeof options.calcAniDelay == 'function'){
            delay = options.calcAniDelay.apply(this, [this.aniDelay, this.currCircle, this.aniIndex]);
        }
        if(delay){
            this.aniDelay = delay;
            return;
        }

        if(this.currCircle < Math.max(Math.floor(options.turnAroundCount * 4 / 5), options.turnAroundCount - 2)){
            this.aniDelay = Math.max(this.aniDelay - 5, options.minAnimateDelay);
        }else{
            this.aniDelay = Math.min(this.aniDelay + this.aniIndex * 5 * 3, options.maxAnimateDelay);
        }
    };

    /**
     * 锁定, 设置后不能抽奖
     */
    luckdraw.prototype.lock = function(){
        this.locked = true;

        if(typeof this.options.onLock == 'function'){
            this.options.onLock.apply(this, []);
        }
    };

    /**
     * 解锁
     */
    luckdraw.prototype.unlock = function(){
        this.locked = false;

        if(typeof this.options.onLock == 'function'){
            this.options.onUnlock.apply(this, []);
        }
    };

    /**
     * 获取锁定状态
     * @return {Boolean} flag
     */
    luckdraw.prototype.isLocked = function(){
        return this.locked;
    };

    window.luckdraw = luckdraw;
});